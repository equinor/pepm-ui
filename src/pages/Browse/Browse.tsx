import { Button, Snackbar } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Table } from '../../components/Table'
import { AddModelDialog } from '../../features/AddModelDialog/AddModelDialog'

export const Browse = () => {
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false)
  const [uploadStatus, setUploadStatus] = useState<string>()

  const uploadProcess = {
    started:
      'We are uploading your new model. Please keep this browser tab open.',
    success: 'Model successfully uploaded. You may close this browser tab now.',
  }

  function clearStatus() {
    setUploadStatus(undefined)
  }

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog)
  }

  function uploadModel() {
    toggleDialog()
    setUploadStatus(uploadProcess.started)
    // TODO: upload model
    // setUploadStatus(uploadProcess.success)
  }

  return (
    <>
      <Button onClick={toggleDialog}>Add new model</Button>
      <Table />
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
