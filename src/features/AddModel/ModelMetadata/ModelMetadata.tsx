/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Label,
  Typography,
} from '@equinor/eds-core-react';
import MetadataProps, { ErrorType } from '../AddModelDialog/AddModelDialog';

import * as Styled from './ModelMetadata.styled';

export const ModelMetadata = ({
  errors,
  metadata,
  setMetadata,
}: {
  errors: ErrorType;
  metadata: Partial<MetadataProps> | undefined;
  setMetadata: (metadata: Partial<MetadataProps>) => void;
}) => {
  const fields = {
    description: 'Description string',
    field: ['Tor', 'Pål'],
    zone: ['Zone 1', 'Zone 2', 'Zone 3'],
    formation: ['Rocky', 'Hilly', 'Flat'],
    analogue: ['Analouge1', 'Analouge2'],
  };

  const handleInput = (e: AutocompleteChanges<string>, target: string) => {
    setMetadata({ ...metadata, [target]: e.selectedItems });
  };

  return (
    <Styled.ModelMetadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <Styled.Form>
        <Styled.TextInput
          id="model-description"
          label="Model description (optional)"
          value={metadata?.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMetadata({ ...metadata, description: e.currentTarget.value })
          }
          multiline
          rows={4}
          rowsMax={8}
        />
        <Styled.AutocompleteWrapper>
          <Styled.AutocompleteRow>
            <Styled.Required>
              <Autocomplete
                className={`${errors.field && 'model-required'}`}
                label="Field"
                options={fields.field}
                onOptionsChange={(e: AutocompleteChanges<string>) =>
                  handleInput(e, 'field')
                }
              ></Autocomplete>
              {errors.field && <Label label="This field is required"></Label>}
            </Styled.Required>
            <Styled.Required>
              <Autocomplete
                className={`${errors.formation && 'model-required'}`}
                label="Formation"
                options={fields.formation}
                multiple
                onOptionsChange={(e: AutocompleteChanges<string>) =>
                  handleInput(e, 'formation')
                }
              ></Autocomplete>
              {errors.formation && (
                <Label label="This field is required"></Label>
              )}
            </Styled.Required>
          </Styled.AutocompleteRow>
          <Styled.AutocompleteRow>
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
          </Styled.AutocompleteRow>
        </Styled.AutocompleteWrapper>
      </Styled.Form>
    </Styled.ModelMetadata>
  );
};
