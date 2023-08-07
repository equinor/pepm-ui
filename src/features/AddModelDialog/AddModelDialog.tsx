import { Button } from '@equinor/eds-core-react'
import { useState } from 'react'
import * as Styled from './AddModelDialog.styled'
import { InputFilesTable } from './InputFilesTable/InputFilesTable'
import { Metadata } from './Metadata/Metadata'

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
  const [isFileDisplay, setFileDisplay] = useState<boolean>(false)
  const files = {
    NC: {
      name: 'CoarseSand_LargerFlow_1.nc',
      size: 1.43,
      onDelete: deleteInputFile,
    },
  }

  // Temporary ignore because not implemented yet
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function deleteInputFile() {}

  function toggleINIFileContent() {
    setFileDisplay(!isFileDisplay)
  }

  const INIFileContent = () => <p>Not implemented yet...</p>

  return (
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>Add new model</Styled.Dialog.Title>
      </Styled.Dialog.Header>
      <Styled.DialogCustomContent scrollable>
        <InputFilesTable
          files={files}
          fileDisplay={{
            isVisible: isFileDisplay,
            toggle: toggleINIFileContent,
          }}
        />
        {isFileDisplay && <INIFileContent />}
        <Metadata />
      </Styled.DialogCustomContent>
      <Styled.DialogActions>
        <Button onClick={confirm}>Confirm and start uploading</Button>
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
      </Styled.DialogActions>
    </Styled.Dialog>
  )
}
