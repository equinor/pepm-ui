/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Label,
  TextField,
  Typography,
} from '@equinor/eds-core-react'
import MetadataProps from '../AddModelDialog/AddModelDialog'
import * as Styled from './ModelMetadata.styled'

export const ModelMetadata = ({
  onValidate,
  validationError,
  metadata,
  setMetadata,
}: {
  onValidate: (values: string[], target: string) => void
  validationError: { field: boolean; formation: boolean }
  metadata: Partial<MetadataProps> | undefined
  setMetadata: (metadata: Partial<MetadataProps>) => void
}) => {
  const fields = {
    description: 'Description string',
    field: ['Tor', 'Pål'],
    zone: ['Zone 1', 'Zone 2', 'Zone 3'],
    formation: ['Rocky', 'Hilly', 'Flat'],
    analogue: ['Analouge1', 'Analouge2'],
  }

  const handleInput = (e: AutocompleteChanges<string>, target: string) => {
    onValidate(e.selectedItems, target)
    setMetadata({ ...metadata, [target]: e.selectedItems })
  }

  return (
    <Styled.ModelMetadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <TextField
        id="model-description"
        className="model-description"
        label="Model description (optional)"
        value={metadata?.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setMetadata({ ...metadata, description: e.currentTarget.value })
        }
        multiline
      />
      <div className="required-div">
        <Autocomplete
          id="field-select"
          className={`${
            validationError.field && 'model-required model-required2'
          }`}
          label="Field"
          options={fields.field}
          onOptionsChange={(e: AutocompleteChanges<string>) =>
            handleInput(e, 'field')
          }
        ></Autocomplete>
        {validationError.field && (
          <Label
            label="This field is required"
            className="required-lable"
          ></Label>
        )}
      </div>

      <div className="required-div">
        <Autocomplete
          className={`${validationError.formation && 'model-required2'}`}
          label="Formation"
          options={fields.formation}
          multiple
          onOptionsChange={(e: AutocompleteChanges<string>) =>
            handleInput(e, 'formation')
          }
        ></Autocomplete>
        {validationError.formation && (
          <Label
            label="This field is required"
            className="required-lable"
          ></Label>
        )}
      </div>

      <Autocomplete
        label="Analogue (optional)"
        options={fields.analogue}
        multiple
        onOptionsChange={(e: AutocompleteChanges<string>) =>
          setMetadata({ ...metadata, analogue: e.selectedItems })
        }
      ></Autocomplete>
      <Autocomplete
        label="Zone (optional)"
        options={fields.zone}
        onOptionsChange={(e: AutocompleteChanges<string>) =>
          setMetadata({ ...metadata, zone: e.selectedItems })
        }
      ></Autocomplete>
    </Styled.ModelMetadata>
  )
}
