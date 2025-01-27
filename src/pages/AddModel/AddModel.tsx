/* eslint-disable sort-imports */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Snackbar, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  AnalogueModelsService,
  ConvertAnalogueModelCommand,
  CreateAnalogueModelCommand,
  JobsService,
  UploadFileType,
  UploadsService,
} from '../../api/generated';
import { queryClient } from '../../auth/queryClient';
import { HandleModelComponent } from '../../features/HandleModel/HandleModelComponent/HandleModelComponent';
import { SidePane } from '../../features/HandleModel/SidePane/SidePane';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import * as Styled from './AddModel.styled';
import { postIniFile } from '../../api/custom/postIniFile';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../hooks/GlobalState';

enum UploadProcess {
  SUCCESS = 'Model successfully uploaded and is now beeing processed.',
  FAILED = 'File upload failed.',
}

export const AddModel = () => {
  const { analogueModel, setAnalogueModel } = usePepmContextStore();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);
  const [iniFile, setIniFile] = useState<File>();
  const [iniFileUploading, setIniFileUploading] = useState<boolean>(false);
  const [iniFileSucceeded, setIniFileSucceeded] = useState<boolean>(false);
  const [fileToBeUpload, setFileToBeUpload] = useState<File>();
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState<number>(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState<number>();
  const [fileSize, setFileSize] = useState(0);
  const [chunkSize, setChunkSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const [uploadId, setUploadId] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>();

  const createModel = useMutation({
    mutationFn: AnalogueModelsService.postApiAnalogueModels,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['analogue-models'] });
    },
  });

  const modelManifest = useMutation({
    mutationFn: UploadsService.postApiUploadsModelsManifest,
  });

  const chunkUpload = useMutation({
    mutationFn: UploadsService.postApiUploadsModelsChunks,
  });

  const uploadFinished = useMutation({
    mutationFn: UploadsService.postApiUploadsModelsComplete,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['analogue-models'] });
    },
  });

  const convertModelFile = useMutation({
    mutationFn: (requestBody: ConvertAnalogueModelCommand) => {
      return JobsService.postApiJobsComputeModelConversions(requestBody);
    },
  });

  const uploadIniFile = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: FormData;
    }) => {
      return postIniFile(id, requestBody);
    },
  });

  const deleteModel = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return AnalogueModelsService.deleteApiAnalogueModels(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  async function uploadModel(file: File, iniFile: File) {
    if (file === undefined && iniFile === undefined) return;
    setUploading(true);
    setProgress(1);

    const ModelBody: CreateAnalogueModelCommand = {
      name: analogueModel.name ? analogueModel.name : '',
      description: analogueModel.description,
      sourceType: 'Deltares',
    };

    const modelUpload = await createModel.mutateAsync(ModelBody);

    if (createModel.error === null && modelUpload.success) {
      setAnalogueModel({
        ...analogueModel,
        analogueModelId: modelUpload.data.analogueModelId,
      });
    }

    if (counter >= chunkCount) {
      setCounter(1);
      setBeginingOfTheChunk(0);
    }

    const fileType = UploadFileType.NET_CDF;
    const filenameExtention = file.name.split('.').pop();
    const fileExtention = '.' + filenameExtention;

    const data = {
      ModelId: modelUpload.data.analogueModelId,
      FileSize: file.size,
      FileName: file.name,
      FileExtension: fileExtention,
      FileType: fileType,
    };

    const createManifest = await modelManifest.mutateAsync(data);
    if (modelManifest.error === null && createManifest.success) {
      const uploadId = createManifest.data.uploadId;
      const recivedChunkSize = createManifest.data.fileSize;
      const numberOfChunks = createManifest.data.numChunks;
      setUploadId(uploadId);
      setChunkSize(recivedChunkSize);
      setEndOfTheChunk(recivedChunkSize);
      setChunkCount(numberOfChunks);
      setFileToBeUpload(file);
      setFileSize(file.size);
    }

    if (iniFile) {
      setIniFile(iniFile);
    }
  }

  const resetUpload = async () => {
    setUploadStatus(UploadProcess.FAILED);
    setProgress(-99);
    setUploading(false);

    if (analogueModel.analogueModelId !== '') {
      await deleteModel.mutateAsync({ id: analogueModel.analogueModelId });
      setAnalogueModel({
        ...analogueModelDefault,
        name: analogueModel.name,
        description: analogueModel.description,
      });
    }
  };

  const fileUpload = (counter: number) => {
    if (endOfTheChunk === undefined) return;
    setBeginingOfTheChunk(endOfTheChunk);
    setEndOfTheChunk(endOfTheChunk + chunkSize);

    setCounter(counter + 1);
    if (counter <= chunkCount) {
      if (fileToBeUpload === undefined) return;
      const chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      const Blob = { Blob: chunk };

      uploadChunk(Blob);
    }
  };

  const uploadChunk = async ({ Blob }: { Blob: Blob }) => {
    if (analogueModel.analogueModelId === '' && uploadId === '') return;
    const chunkData = {
      ModelId: analogueModel.analogueModelId,
      UploadId: uploadId,
      Blob: Blob,
      ChunkNumber: counter,
    };
    try {
      const uploadChunks = await chunkUpload.mutateAsync(chunkData);
      if (chunkUpload.error === null && uploadChunks.success) {
        if (counter === chunkCount) {
          const finishBody = {
            ModelId: analogueModel.analogueModelId,
            UploadId: uploadId,
          };
          const finishedUpload = await uploadFinished.mutateAsync(finishBody);
          if (uploadFinished.error === null && finishedUpload.success) {
            // eslint-disable-next-line max-depth
            try {
              const convert = await convertModelFile.mutateAsync({
                modelId: analogueModel.analogueModelId,
              });

              // eslint-disable-next-line max-depth
              if (convertModelFile.error === null && convert.success) {
                setProgress(100);
                setUploadStatus(UploadProcess.SUCCESS);
                setUploading(false);
              } else {
                resetUpload();
              }
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(error);
              resetUpload();
            }
          }
        } else {
          const percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      resetUpload();
    }
  };

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToBeUpload, progress]);

  useEffect(() => {
    const uploadIniFileAsync = async (file: File, id: string) => {
      const data = new FormData();
      data.append('file', file!);
      const response = await uploadIniFile.mutateAsync({
        id: id,
        requestBody: data,
      });
      return response;
    };

    if (
      !iniFileUploading &&
      !iniFileSucceeded &&
      iniFile &&
      analogueModel.analogueModelId
    ) {
      setIniFileUploading(true);
      const response = uploadIniFileAsync(
        iniFile,
        analogueModel.analogueModelId,
      );
      response.then(
        (res) => {
          setIniFileSucceeded(true);
        },
        () => {
          setIniFileUploading(false);
        },
      );
    }
  }, [
    analogueModel.analogueModelId,
    iniFile,
    iniFileUploading,
    iniFileSucceeded,
    uploadIniFile,
  ]);

  function clearStatus() {
    setUploadStatus(undefined);
  }

  return (
    <Styled.PageLayout>
      <SidePane uploading={uploading} />

      <Styled.Content>
        <Typography variant="h2" as="h1">
          New model
        </Typography>
        <HandleModelComponent
          confirm={uploadModel}
          uploading={uploading}
          progress={progress}
          isAddUploading={progress > 0}
          modelId={analogueModel.analogueModelId}
        />
        {analogueModel.analogueModelId !== '' && (
          <>
            <ModelMetadataView
              modelIdParent={analogueModel.analogueModelId}
              uploadingProgress={progress}
            />
          </>
        )}
      </Styled.Content>

      <Snackbar open={!!uploadStatus} onClose={clearStatus}>
        {uploadStatus}
      </Snackbar>
    </Styled.PageLayout>
  );
};
