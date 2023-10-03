import { Button, Snackbar, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Table } from '../../components/Table'
import { AddModelDialog } from '../../features/AddModelDialog/AddModelDialog'
import { useAnalogueModels } from '../../hooks/useAnalogueModels'
import * as Styled from './Browse.styled'

enum UploadProcess {
  STARTED = 'We are uploading your new model. Please keep this browser tab open.',
  SUCCESS = 'Model successfully uploaded. You may close this browser tab now.',
  FAILED = 'File upload failed.',
}

export const Browse = () => {
  const { createModel, uploadNCFile } = useAnalogueModels('undefined')
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false)
  const [uploadStatus, setUploadStatus] = useState<string>()

  function clearStatus() {
    setUploadStatus(undefined)
  }

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog)
  }

  async function uploadModel(file: File) {
    setUploadStatus(UploadProcess.STARTED)
    const modelUpload = await createModel({
      // TODO
      body: {
        name: 'testModel',
        description: 'description',
        sourceType: 'Deltares',
      },
    })

    if (modelUpload?.success) {
      toggleDialog()
      const fileUpload = await uploadNCFile(
        modelUpload.data.analogueModelId ?? '',
        file
      )

      if (fileUpload.success) setUploadStatus(UploadProcess.SUCCESS)
      else if (!fileUpload.success) {
        setUploadStatus(UploadProcess.FAILED)
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
  )
}
