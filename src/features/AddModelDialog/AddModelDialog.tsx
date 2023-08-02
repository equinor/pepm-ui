import { Button } from '@equinor/eds-core-react'
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
  return (
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>Add new model</Styled.Dialog.Title>
      </Styled.Dialog.Header>
      <Styled.Dialog.CustomContent>
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
