import { Button } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Table } from '../components/Table'
import { AddModelDialog } from '../features/AddModelDialog/AddModelDialog'

export const Browse = () => {
  const [isAddModelDialog, setAddModelDialog] = useState<boolean>(false)

  function closeDialog() {
    setAddModelDialog(false)
  }

  // Temporary ignore because not implemented yet
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function uploadModel() {}

  return (
    <>
      <Button onClick={() => setAddModelDialog(true)}>Add new model</Button>
      <Table />
      <AddModelDialog
        isOpen={isAddModelDialog}
        confirm={uploadModel}
        cancel={closeDialog}
      />
    </>
  )
}
