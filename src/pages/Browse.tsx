import { Button, Snackbar } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Table } from '../components/Table'
import { AddModelDialog } from '../features/AddModelDialog/AddModelDialog'

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

  function closeDialog() {
    setAddModelDialog(false)
  }

  function uploadModel() {
    closeDialog()
    setUploadStatus(uploadProcess.started)
    // TODO: upload model
    // setUploadStatus(uploadProcess.success)
  }

  return (
    <>
      <Button onClick={() => setAddModelDialog(true)}>Add new model</Button>
      <Table />
      <AddModelDialog
        isOpen={isAddModelDialog}
        confirm={uploadModel}
        cancel={closeDialog}
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
