/* eslint-disable max-lines-per-function */
import {
  Button,
  LinearProgress,
  Snackbar,
  Typography,
} from '@equinor/eds-core-react';
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
import { Table } from '../../components/Table';
import MetadataProps, {
  AddModelDialog,
} from '../../features/AddModel/AddModelDialog/AddModelDialog';
import * as Styled from './Browse.styled';

enum UploadProcess {
  STARTED = 'We are uploading your new model. Please keep this browser tab open.',
  SUCCESS = 'Model successfully uploaded. You may close this browser tab now.',
  FAILED = 'File upload failed.',
}

export const Browse = () => {
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState<File>();
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState<number>();
  const [fileSize, setFileSize] = useState(0);
  const [chunkSize, setChunkSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [modelId, setModelId] = useState<string>('');
  const [uploadId, setUploadId] = useState<string>('');
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>();

  const createModel = useMutation({
    mutationFn: AnalogueModelsService.postApiAnalogueModels,
  });

  const modelManifest = useMutation({
    mutationFn: UploadsService.postApiUploadsModelsManifest,
  });

  const chunkUpload = useMutation({
    mutationFn: UploadsService.postApiUploadsModelsChunks,
  });

  const uploadFinished = useMutation({
    mutationFn: UploadsService.postApiUploadsModelsComplete,
  });

  const convertModelFile = useMutation({
    mutationFn: (requestBody: ConvertAnalogueModelCommand) => {
      return JobsService.postApiJobsComputeModelConversions(requestBody);
    },
  });

  function clearStatus() {
    setUploadStatus(undefined);
  }

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog);
  }

  async function uploadModel(file: File, metadata: Partial<MetadataProps>) {
    setUploadStatus(UploadProcess.STARTED);
    const ModelBody: CreateAnalogueModelCommand = {
      name: metadata.name ? metadata.name : '',
      description: metadata.description,
      sourceType: 'Deltares',
    };

    const modelUpload = await createModel.mutateAsync(ModelBody);

    if (createModel.error === null && modelUpload.success) {
      const id = modelUpload.data.analogueModelId;
      setModelId(id);

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

        toggleDialog();
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
            console.log('Start Converting');

            const convert = await convertModelFile.mutateAsync({
              modelId: modelId,
            });

            // eslint-disable-next-line max-depth
            if (convertModelFile.error === null && convert.success) {
              console.log('CONVERT FINISHED');
              setUploadStatus(UploadProcess.SUCCESS);
            } else {
              console.log('CONVERT FAILED');
              setUploadStatus(UploadProcess.FAILED);
            }
          }
        } else {
          const percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      } else {
        console.log('Error Occurred:', uploadChunks.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToBeUpload, progress]);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  return (
    <>
      <Styled.BrowseWrapper>
        <Typography variant="h1">Browse all models</Typography>
        <div className="btn-div">
          <Button onClick={toggleDialog}>Add new model</Button>
        </div>
        <Table />
      </Styled.BrowseWrapper>
      <AddModelDialog
        isOpen={isAddModelDialog}
        confirm={uploadModel}
        cancel={toggleDialog}
      />

      <Typography variant="h2">File Upload Progress</Typography>
      <LinearProgress variant="determinate" value={progress}></LinearProgress>

      <Snackbar
        open={!!uploadStatus}
        autoHideDuration={15000}
        onClose={clearStatus}
      >
        {uploadStatus}
      </Snackbar>
    </>
  );
};
