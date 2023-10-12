import { Button, Snackbar, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { Table } from '../../components/Table';
import * as Styled from './Browse.styled';
import { useMutation } from '@tanstack/react-query';
import {
  AnalogueModelsService,
  CreateAnalogueModelCommand,
} from '../../api/generated';
import { AddModelDialog } from '../../features/AddModel/AddModelDialog/AddModelDialog';

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

  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>();

  function clearStatus() {
    setUploadStatus(undefined);
  }

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog);
  }

  async function uploadModel(file: File) {
    setUploadStatus(UploadProcess.STARTED);
    const modelUpload = await createModel.mutateAsync(
      // TODO
      {
        name: 'testModel',
        description: 'description',
        sourceType: 'Deltares',
      } as CreateAnalogueModelCommand,
    );

    if (createModel?.isSuccess) {
      toggleDialog();
      const fileUpload = await uploadNCFile.mutateAsync({
        id: modelUpload.data.analogueModelId ?? '',
        file: file,
      } as MutationContract);

      if (fileUpload && uploadNCFile.isSuccess)
        setUploadStatus(UploadProcess.SUCCESS);
      else if (!uploadNCFile.isSuccess) {
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
          <Button href="/model/bf2171bc-2f5e-44a1-f6e0-08dbb5ed15e2/details">
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
        autoHideDuration={5000}
        onClose={clearStatus}
      >
        {uploadStatus}
      </Snackbar>
    </>
  );
};
