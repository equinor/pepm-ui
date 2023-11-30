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

  const setSelectedMetadataOptions = (type: string) => {
    if (!isLoading && data?.data) {
      const dataProps = data.data.filter((z) => z.metadataType === type);

      const selectedProps = metadata?.metadata.filter(
        (m) => m.metadataType === type,
      );

      return dataProps.filter(
        (c) =>
          selectedProps.findIndex((x: MetadataDto) => x.value === c.value) > -1,
      );
    }
  };

  const setSelectedAnalogueOptions = () => {
    if (analougeData.data?.success && metadata.analogue) {
      const analogue = metadata?.analogue;

      return analougeData.data?.data.filter(
        (c) => analogue.findIndex((x: AnalogueList) => x.name === c.name) > -1,
      );
    }
  };

  function handleAddMetadata(
    e: AutocompleteChanges<MetadataDto>,
    propType: string,
  ) {
    const metadataList: MetadataDto[] = metadata.metadata.filter(
      (i) => i.metadataType !== propType,
    );

    const newList = [...metadataList, ...e.selectedItems];
    setMetadata({
      ...metadata,
      metadata: [...newList],
    });
  }

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
                selectedOptions={setSelectedMetadataOptions('Field')}
                multiple
                onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
                  handleAddMetadata(e, 'Field')
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
                selectedOptions={setSelectedMetadataOptions('Formation')}
                multiple
                onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
                  handleAddMetadata(e, 'Formation')
                }
              ></Autocomplete>
              {errors.formation && (
                <Label label="This field is required"></Label>
              )}
            </Styled.Required>
          </Styled.AutocompleteRow>
          <Styled.AutocompleteRow>
            <Styled.Required>
              <Autocomplete
                className={`${errors.analogue && 'model-required'}`}
                label="Analogue"
                options={analougeData.data.data}
                optionLabel={(option) => option.name}
                selectedOptions={setSelectedAnalogueOptions()}
                multiple
                onOptionsChange={(e: AutocompleteChanges<AnalogueList>) =>
                  setMetadata({
                    ...metadata,
                    analogue: e.selectedItems,
                  })
                }
              ></Autocomplete>
              {errors.analogue && (
                <Label label="This field is required"></Label>
              )}
            </Styled.Required>
            <Styled.Required>
              <Autocomplete
                className={`${errors.zone && 'model-required'}`}
                label="Zone"
                options={data.data.filter((d) => d.metadataType === 'Zone')}
                optionLabel={(option) => option.value}
                selectedOptions={setSelectedMetadataOptions('Zone')}
                multiple
                onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
                  handleAddMetadata(e, 'Zone')
                }
              ></Autocomplete>
              {errors.zone && <Label label="This field is required"></Label>}
            </Styled.Required>
          </Styled.AutocompleteRow>
        </Styled.AutocompleteWrapper>
      </Styled.Form>
    </Styled.ModelMetadata>
  );
};
