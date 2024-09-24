/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Snackbar, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  AddAnalogueModelMetadataCommandForm,
  AddMetadataDto,
  AnalogueModelDetail,
  AnalogueModelMetadataService,
  AnalogueModelSourceType,
  AnalogueModelsService,
  ConvertAnalogueModelCommand,
  CreateAnalogueModelCommand,
  JobsService,
  JobStatus,
  MetadataDto,
  UploadFileType,
  UploadsService,
} from '../../api/generated';
import { queryClient } from '../../auth/queryClient';
import { HandleModelComponent } from '../../features/HandleModel/HandleModelComponent/HandleModelComponent';
import { SidePane } from '../../features/HandleModel/SidePane/SidePane';
import { ModelMetadataView } from '../../features/ModelView/ModelMetadataView/ModelMetadataView';
import * as Styled from './AddModel.styled';

enum UploadProcess {
  STARTED = 'We are uploading your new model. Please keep this browser tab open.',
  SUCCESS = 'Model successfully uploaded and is now beeing processed.',
  FAILED = 'File upload failed.',
}

const defaultCounterValue = 1;
const defaultBeginningOfchunk = 0;
export const AddModel = () => {
  const [progress, setProgress] = useState(0);
  const [modelId, setModelId] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  // Hard coded states for ease of development

  // const [progress, setProgress] = useState(12);
  // const [modelId, setModelId] = useState<string>(
  //   'fa725ca1-ca33-4b7c-e742-08dc7b2938d0',
  // );
  // const [uploading, setUploading] = useState<boolean>(true);

  const [counter, setCounter] = useState<number>(defaultCounterValue);
  const [fileToBeUpload, setFileToBeUpload] = useState<File>();
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState<number>(
    defaultBeginningOfchunk,
  );
  const [endOfTheChunk, setEndOfTheChunk] = useState<number>();
  const [fileSize, setFileSize] = useState(0);
  const [chunkSize, setChunkSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const [uploadId, setUploadId] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>();

  const defaultMetadata: AnalogueModelDetail = {
    analogueModelId: '',
    name: '',
    description: '',
    isProcessed: false,
    sourceType: AnalogueModelSourceType.DELTARES,
    outcrops: [],
    fileUploads: [],
    parameters: [],
    metadata: [],
    modelAreas: [],
    stratigraphicGroups: [],
    geologicalGroups: [],
    processingStatus: JobStatus.UNKNOWN,
  };

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

  const uploadModelMetadata = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelMetadataCommandForm;
    }) => {
      return AnalogueModelMetadataService.putApiAnalogueModelsMetadata(
        id,
        requestBody,
      );
    },
  });

  // const uploadModelAnalouges = useMutation({
  //   mutationFn: ({
  //     id,
  //     requestBody,
  //   }: {
  //     id: string;
  //     requestBody: AddAnalogueModelAnalogueCommandForm;
  //   }) => {
  //     return AnalogueModelAnaloguesService.putApiAnalogueModelsAnalogues(
  //       id,
  //       requestBody,
  //     );
  //   },
  // });

  const metadataList: AddMetadataDto[] = [];
  // const analougueList: AddAnalogueDto[] = [];

  function addMetadataFields(metadata?: MetadataDto[]) {
    if (!metadata) return;
    const obj = metadata.map((x) => ({ metadataId: x.metadataId }));
    metadataList.push(...obj);
  }

  // function addAnalogueFields(metadata?: AnalogueList[]) {
  //   if (!metadata) return;
  //   const obj = metadata.map((x) => ({ analogueId: x.analogueId }));
  //   analougueList.push(...obj);
  // }

  async function uploadMetadata(
    modelId: string,
    metadata: AnalogueModelDetail,
  ) {
    addMetadataFields(metadata.metadata);
    // addAnalogueFields(metadata.analogues);

    const readyMetadata: AddAnalogueModelMetadataCommandForm = {
      metadata: metadataList,
    };

    // const readyAnalogue: AddAnalogueModelAnalogueCommandForm = {
    //   analogues: analougueList,
    // };

    await uploadModelMetadata.mutateAsync({
      id: modelId,
      requestBody: readyMetadata,
    });

    // await uploadModelAnalouges.mutateAsync({
    //   id: modelId,
    //   requestBody: readyAnalogue,
    // });
  }

  async function uploadModel(file: File, metadata: AnalogueModelDetail) {
    setUploadStatus(UploadProcess.STARTED);
    setUploading(true);
    const ModelBody: CreateAnalogueModelCommand = {
      name: metadata.name ? metadata.name : '',
      description: metadata.description,
      sourceType: 'Deltares',
    };

    const modelUpload = await createModel.mutateAsync(ModelBody);

    if (createModel.error === null && modelUpload.success) {
      const id = modelUpload.data.analogueModelId;
      setModelId(id);
      setProgress(1);
      uploadMetadata(id, metadata);

      if (counter >= chunkCount) {
        setCounter(defaultCounterValue);
        setBeginingOfTheChunk(defaultBeginningOfchunk);
      }

      if (file === undefined) return;

      const fileType = UploadFileType.NET_CDF;
      const filenameExtention = file.name.split('.').pop();
      const fileExtention = '.' + filenameExtention;

      const data = {
        ModelId: id,
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
    }
  }

  const fileUpload = (counter: number) => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      if (fileToBeUpload === undefined) return;
      const chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      const Blob = { Blob: chunk };

      uploadChunk(Blob);
    }
  };

  const uploadChunk = async ({ Blob }: { Blob: Blob }) => {
    if (modelId === '' && uploadId === '') return;
    const chunkData = {
      ModelId: modelId,
      UploadId: uploadId,
      Blob: Blob,
      ChunkNumber: counter,
    };
    try {
      const uploadChunks = await chunkUpload.mutateAsync(chunkData);

      if (chunkUpload.error === null && uploadChunks.success) {
        if (endOfTheChunk === undefined) return;
        setBeginingOfTheChunk(endOfTheChunk);
        setEndOfTheChunk(endOfTheChunk + chunkSize);
        if (counter === chunkCount) {
          const finishBody = {
            ModelId: modelId,
            UploadId: uploadId,
          };
          const finishedUpload = await uploadFinished.mutateAsync(finishBody);
          if (uploadFinished.error === null && finishedUpload.success) {
            setProgress(100);

            const convert = await convertModelFile.mutateAsync({
              modelId: modelId,
            });

            // eslint-disable-next-line max-depth
            if (convertModelFile.error === null && convert.success) {
              setUploadStatus(UploadProcess.SUCCESS);
              setUploading(false);
            } else {
              setUploadStatus(UploadProcess.FAILED);
              setProgress(-99);
              setUploading(false);
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
    }
  };

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToBeUpload, progress]);

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
          defaultMetadata={defaultMetadata}
          progress={progress}
          isAddUploading={progress > 0}
          modelId={modelId}
        />
        {modelId !== '' && (
          <>
            <ModelMetadataView
              modelIdParent={modelId}
              isAddUploading={progress > 0}
            />
          </>
        )}
      </Styled.Content>

      <Snackbar
        open={!!uploadStatus}
        autoHideDuration={15000}
        onClose={clearStatus}
      >
        {uploadStatus}
      </Snackbar>
    </Styled.PageLayout>
  );
};
