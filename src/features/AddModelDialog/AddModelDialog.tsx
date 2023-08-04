import {
  Autocomplete,
  Button,
  TextField,
  Typography,
} from '@equinor/eds-core-react'
import { useState } from 'react'
import * as Styled from './AddModelDialog.styled'
import { InputFilesTable } from './InputFilesTable/InputFilesTable'

interface AddModelDialogProps {
  isOpen: boolean
  confirm: () => void
  cancel: () => void
}

const DescriptionAndMetadata = () => {
  const fields = [{ name: 'Tor' }]
  return (
    <Styled.Metadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <TextField
        id="model-description"
        className="model-description"
        label="Model description (optional)"
        multiline
      />
      <Autocomplete label="Field" options={fields}></Autocomplete>
      <Autocomplete label="Formation" options={fields}></Autocomplete>
      <Autocomplete label="Analogue (optional)" options={fields}></Autocomplete>
      <Autocomplete label="Zone (optional)" options={fields}></Autocomplete>
    </Styled.Metadata>
  )
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
            isFileDisplay: isFileDisplay,
            toggleFileDisplay: toggleINIFileContent,
          }}
        />
        {isFileDisplay && <INIFileContent />}
        <DescriptionAndMetadata />
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
