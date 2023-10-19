/* eslint-disable max-lines-per-function */
import { Button, Snackbar, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  AnalogueModelsService,
  ConvertAnalogueModelCommand,
  CreateAnalogueModelCommand,
  JobsService,
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

type MutationContract = {
  id: string;
  file: Blob;
};

export const Browse = () => {
  const createModel = useMutation({
    mutationFn: AnalogueModelsService.postApiAnalogueModels,
  });

  const uploadNCFile = useMutation({
    mutationFn: (mutationContract: MutationContract) => {
      return AnalogueModelsService.postApiAnalogueModelsNetcdfModels(
        mutationContract.id,
        { file: mutationContract.file },
      );
    },
  });

  const convertModelFile = useMutation({
    mutationFn: (modelId: ConvertAnalogueModelCommand) => {
      return JobsService.postApiJobsComputeModelConversions(modelId);
    },
  });

  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>();

  function clearStatus() {
    setUploadStatus(undefined);
  }

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog);
  }

  async function uploadModel(file: File, metadata: Partial<MetadataProps>) {
    setUploadStatus(UploadProcess.STARTED);
    const ModelBody: CreateAnalogueModelCommand = {
      name: metadata.name,
      description: metadata.description,
      sourceType: 'ResQML',
    };

    const modelUpload = await createModel.mutateAsync(ModelBody);

    if (createModel.error === null && modelUpload.success) {
      toggleDialog();
      const FileUploadBody: MutationContract = {
        id: modelUpload.data.analogueModelId ?? '',
        file: file,
      };
      const fileUpload = await uploadNCFile.mutateAsync(FileUploadBody);

      if (uploadNCFile.error === null && fileUpload.success) {
        setUploadStatus(UploadProcess.SUCCESS);

        const id = modelUpload.data.analogueModelId;
        const convert = await convertModelFile.mutateAsync({
          modelId: id,
        });

        // eslint-disable-next-line no-console
        console.log(convert);
      } else if (uploadNCFile.error) {
        setUploadStatus(UploadProcess.FAILED);

        // TODO: show validation message
      }
    }
  }

  return (
    <>
      <Styled.BrowseWrapper>
        <Typography variant="h1">Browse all models</Typography>
        <div className="btn-div">
          <Button onClick={toggleDialog}>Add new model</Button>
          <Button href="/model/4e999a96-34a3-4121-998d-08dbb2a7609c/details">
            Model view - Hardkodet
          </Button>
        </div>
        <Table />
      </Styled.BrowseWrapper>
      <AddModelDialog
        isOpen={isAddModelDialog}
        confirm={uploadModel}
        cancel={toggleDialog}
      />
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
