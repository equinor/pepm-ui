import { Button, Snackbar } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Table } from '../../components/Table'
import { AddModelDialog } from '../../features/AddModelDialog/AddModelDialog'
import { useAnalogueModels } from '../../hooks/useAnalogueModels'

enum UploadProcess {
  STARTED = 'We are uploading your new model. Please keep this browser tab open.',
  SUCCESS = 'Model successfully uploaded. You may close this browser tab now.',
}

export const Browse = () => {
  const { createModel, NC } = useAnalogueModels()
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false)
  const [uploadStatus, setUploadStatus] = useState<string>()
  const testModel = {
    name: 'hei',
    description: 'beste modell',
    sourceType: 'Deltares',
  }

  function clearStatus() {
    setUploadStatus(undefined)
  }

  function toggleDialog() {
    setAddModelDialog(!isAddModelDialog)
  }

  async function uploadModel(file: File | string) {
    setUploadStatus(UploadProcess.STARTED)
    await createModel({ body: testModel })
      .then((model) => model?.data.analogueModelId)
      .then((id) => {
        NC({
          params: { path: { id: id ?? '' } },
          body: { File: file, FileType: 'NetCDF' },
        })
      })
    // toggleDialog()
    // setUploadStatus(UploadProcess.SUCCESS)
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
