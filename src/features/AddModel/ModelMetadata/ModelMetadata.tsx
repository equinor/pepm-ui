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
    field: [
      'Breidablikk',
      'Gullfaks',
      'Heidrun',
      'Johan Sverdrup',
      'Oseberg',
      'Tordis',
    ],
    zone: ['Norwegian sea', 'North sea', 'Barents sea'],
    formation: ['Formation1', 'Formation2', 'Formation3', 'Formation4'],
    analogue: ['Analouge1', 'Analouge2', 'Analouge3', 'Analouge4'],
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
        <Styled.InputfieldRequired>
          <Styled.TextInput
            className={`${errors.name && 'model-required'}`}
            id="model-name"
            label="Model Name (optional)"
            value={metadata?.name}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMetadata({ ...metadata, name: e.currentTarget.value })
            }
          />
          {errors.name && <Label label="This field is required"></Label>}
        </Styled.InputfieldRequired>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            className={`${errors.description && 'model-required'}`}
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
          {errors.description && <Label label="This field is required"></Label>}
        </Styled.InputfieldRequired>

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
