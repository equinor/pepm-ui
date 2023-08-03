import {
  Autocomplete,
  Button,
  TextField,
  Typography,
} from '@equinor/eds-core-react'
import { ModelInputFilesTable } from '../ModelInputFiles/ModelInputFiles'
import * as Styled from './AddModelDialog.styled'

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
  // Temporary ignore because not implemented yet
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function deleteInputFile() {}

  return (
    <Styled.Dialog open={isOpen}>
      <Styled.Dialog.Header>
        <Styled.Dialog.Title>Add new model</Styled.Dialog.Title>
      </Styled.Dialog.Header>
      <Styled.DialogCustomContent>
        <ModelInputFilesTable
          inputFiles={[{ name: 'CoarseSand_LargerFlow_1.nc', size: 1.43 }]}
          onDeleteFile={deleteInputFile}
        />
        <DescriptionAndMetadata />
        <Styled.DialogActions>
          <Button onClick={confirm}>Confirm and start uploading</Button>
          <Button variant="outlined" onClick={cancel}>
            Cancel
          </Button>
        </Styled.DialogActions>
      </Styled.DialogCustomContent>
    </Styled.Dialog>
  )
}
