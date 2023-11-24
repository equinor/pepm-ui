/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Label,
  Typography,
} from '@equinor/eds-core-react';
import MetadataProps, { ErrorType } from '../AddModelDialog/AddModelDialog';

import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import {
  AnalogueList,
  AnaloguesService,
  MetadataDto,
  MetadataService,
  OpenAPI,
} from '../../../api/generated';
import { useAccessToken } from '../../../hooks/useAccessToken';
import * as Styled from './ModelMetadata.styled';

export const ModelMetadata = ({
  errors,
  metadata,
  setMetadata,
}: {
  errors: ErrorType;
  metadata: MetadataProps;
  setMetadata: (metadata: MetadataProps) => void;
}) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  if (token) OpenAPI.TOKEN = token;

  const { isLoading, data } = useQuery({
    queryKey: ['metadata'],
    queryFn: () => MetadataService.getApiMetadata(),
    enabled: !!token,
  });

  const analougeData = useQuery({
    queryKey: ['apiParameters'],
    queryFn: () => AnaloguesService.getApiAnalogues(),
    enabled: !!token,
  });

  if (isLoading || !data?.success) return <p>Loading ...</p>;
  if (analougeData.isLoading || !analougeData?.data?.success)
    return <p>Loading ...</p>;

  return (
    <Styled.ModelMetadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <Styled.Form>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            className={`${errors.name && 'model-required'}`}
            id="model-name"
            label="Model Name"
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
            label="Model description"
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
                options={data.data.filter((d) => d.metadataType === 'Field')}
                optionLabel={(option) => option.value}
                selectedOptions={metadata?.field}
                onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
                  setMetadata({ ...metadata, field: e.selectedItems })
                }
              ></Autocomplete>
              {errors.field && <Label label="This field is required"></Label>}
            </Styled.Required>
            <Styled.Required>
              <Autocomplete
                className={`${errors.formation && 'model-required'}`}
                label="Formation"
                options={data.data.filter(
                  (d) => d.metadataType === 'Formation',
                )}
                optionLabel={(option) => option.value}
                selectedOptions={metadata?.formation}
                multiple
                onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
                  setMetadata({ ...metadata, formation: e.selectedItems })
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
              options={analougeData.data.data}
              optionLabel={(option) => option.name}
              selectedOptions={metadata?.analogue}
              multiple
              onOptionsChange={(e: AutocompleteChanges<AnalogueList>) =>
                setMetadata({ ...metadata, analogue: e.selectedItems })
              }
            ></Autocomplete>
            <Autocomplete
              label="Zone (optional)"
              options={data.data.filter((d) => d.metadataType === 'Zone')}
              optionLabel={(option) => option.value}
              selectedOptions={metadata?.zone}
              onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
                setMetadata({ ...metadata, zone: e.selectedItems })
              }
            ></Autocomplete>
          </Styled.AutocompleteRow>
        </Styled.AutocompleteWrapper>
      </Styled.Form>
    </Styled.ModelMetadata>
  );
};
