/* eslint-disable max-lines-per-function */
import {
  AutocompleteChanges,
  Label,
  Typography,
} from '@equinor/eds-core-react';
import { ErrorType } from '../AddModelDialog/AddModelDialog';

import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import {
  AnalogueModelDetail,
  AnaloguesService,
  MetadataDto,
  MetadataService,
  OpenAPI,
} from '../../../api/generated';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { AnalogueSelect } from './AnalogueSelect/AnalogueSelect';
import { MetadataSelect } from './MetadataSelect/MetadataSelect';
import * as Styled from './ModelMetadata.styled';

export const ModelMetadata = ({
  errors,
  metadata,
  setMetadata,
}: {
  errors: ErrorType;
  metadata: AnalogueModelDetail;
  setMetadata: (metadata: AnalogueModelDetail) => void;
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

  function handleAddMetadata(
    e: AutocompleteChanges<MetadataDto>,
    propType: string,
  ) {
    if (!metadata.metadata) return;

    // Filert out metadata of the same type as dropdown props type
    const metadataList: MetadataDto[] = metadata.metadata
      .filter((i) => i.metadataType !== propType)
      .filter((n) => n.metadataId !== propType);

    const removeNotSelected = e.selectedItems.filter(
      (i) => i.metadataType === propType,
    );

    const newList = [...metadataList, ...removeNotSelected];

    setMetadata({
      ...metadata,
      metadata: [...newList],
    });
  }

  if (
    isLoading ||
    !data?.success ||
    analougeData.isLoading ||
    !analougeData?.data?.success
  )
    return <p>Loading ...</p>;

  return (
    <Styled.ModelMetadata className="model-metadata">
      <Typography variant="h4">Description and metadata</Typography>
      <Styled.Form>
        <Styled.InputfieldRequired>
          <Styled.TextInput
            variant={errors.name ? 'error' : undefined}
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
            variant={errors.description ? 'error' : undefined}
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
              <MetadataSelect
                errors={errors.field}
                type="Field"
                data={data.data}
                metadata={metadata.metadata}
                isLoading={isLoading}
                handleAddMetadata={handleAddMetadata}
              />
              {errors.field && <Label label="This field is required"></Label>}
            </Styled.Required>
            <Styled.Required>
              <MetadataSelect
                type="Formation"
                errors={errors.formation}
                data={data.data}
                metadata={metadata.metadata}
                isLoading={isLoading}
                handleAddMetadata={handleAddMetadata}
              />
              {errors.formation && (
                <Label label="This field is required"></Label>
              )}
            </Styled.Required>
          </Styled.AutocompleteRow>
          <Styled.AutocompleteRow>
            <Styled.Required>
              <AnalogueSelect
                errors={errors.analogues}
                data={analougeData.data.data}
                analogue={analougeData.data.data}
                metadata={metadata}
                setMetadata={setMetadata}
              />
              {errors.analogues && (
                <Label label="This field is required"></Label>
              )}
            </Styled.Required>
            <Styled.Required>
              <MetadataSelect
                type="Zone"
                errors={errors.zone}
                data={data.data}
                metadata={metadata.metadata}
                isLoading={isLoading}
                handleAddMetadata={handleAddMetadata}
              />
              {errors.zone && <Label label="This field is required"></Label>}
            </Styled.Required>
          </Styled.AutocompleteRow>
        </Styled.AutocompleteWrapper>
      </Styled.Form>
    </Styled.ModelMetadata>
  );
};
