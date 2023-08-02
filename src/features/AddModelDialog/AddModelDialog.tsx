import { Button } from '@equinor/eds-core-react'
import { ModelInputFilesTable } from '../ModelInputFiles/ModelInputFiles'
import * as Styled from './AddModelDialog.styled'

interface AddModelDialogProps {
  isOpen: boolean
  confirm: () => void
  cancel: () => void
}

export const AddModelDialog = ({
  isOpen,
  confirm,
  cancel,
}: AddModelDialogProps) => {
  // Temporary ignore because not implemented yet
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function deleteInputFile() {}

  return (
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>Add new model</Styled.Dialog.Title>
      </Styled.Dialog.Header>
      <Styled.Dialog.CustomContent>
        <ModelInputFilesTable
          inputFiles={[{ name: 'CoarseSand_LargerFlow_1.nc', size: 1.43 }]}
          onDeleteFile={deleteInputFile}
        />
        <Styled.DialogActions>
          <Button onClick={confirm}>Confirm and start uploading</Button>
          <Button variant="outlined" onClick={cancel}>
            Cancel
          </Button>
        </Styled.DialogActions>
      </Styled.Dialog.CustomContent>
    </Styled.Dialog>
  )
}
