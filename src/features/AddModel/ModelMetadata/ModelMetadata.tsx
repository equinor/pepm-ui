/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Label,
  Typography,
} from '@equinor/eds-core-react';
import MetadataProps, { ErrorType } from '../AddModelDialog/AddModelDialog';

import { useQuery } from '@tanstack/react-query';
import { AnalogueList, AnaloguesService } from '../../../api/generated';
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
    field: ['Tor', 'Pål'],
    zone: ['Zone 1', 'Zone 2', 'Zone 3'],
    formation: ['Rocky', 'Hilly', 'Flat'],
    analogue: ['Analouge1', 'Analouge2'],
  };

  const { isLoading, data } = useQuery({
    queryKey: ['apiParameters'],
    queryFn: () => AnaloguesService.getApiAnalogues(),
  });

  if (isLoading || !data?.success) return <p>Loading ...</p>;

  const handleInput = (e: AutocompleteChanges<string>, target: string) => {
    setMetadata({ ...metadata, [target]: e.selectedItems });
  };

  return (
    <Styled.ModelMetadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <Styled.Form>
        <Styled.TextInput
          id="model-name"
          label="Model Name (optional)"
          value={metadata?.name}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMetadata({ ...metadata, name: e.currentTarget.value })
          }
        />
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
                selectedOptions={metadata?.field}
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
                selectedOptions={metadata?.formation}
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
              options={data.data}
              optionLabel={(option) => option.name}
              selectedOptions={metadata?.analogue}
              multiple
              onOptionsChange={(e: AutocompleteChanges<AnalogueList>) =>
                setMetadata({ ...metadata, analogue: e.selectedItems })
              }
            ></Autocomplete>
            <Autocomplete
              label="Zone (optional)"
              options={fields.zone}
              selectedOptions={metadata?.zone}
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
