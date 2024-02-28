/* eslint-disable max-lines-per-function */
/* eslint-disable react/prop-types */

import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { MetadataDto } from '../../../../api/generated';

export const MetadataSelect = ({
  type,
  errors,
  data,
  metadata,
  isLoading,
  handleAddMetadata,
}: {
  type: string;
  errors: string | undefined;
  data: MetadataDto[];
  metadata: MetadataDto[] | undefined;
  isLoading: boolean;
  handleAddMetadata: (
    e: AutocompleteChanges<MetadataDto>,
    type: string,
  ) => void;
}) => {
  const emptyOption: MetadataDto[] = [
    {
      metadataId: type,
      metadataType: 'NoRelevant',
      value: 'Not relevant',
    },
  ];

  const props =
    metadata != undefined && metadata!.length > 0
      ? metadata.filter((m) => m.metadataType === type)
      : emptyOption;
  const filteredOptions = data.filter((d) => d.metadataType === type);
  const optionList: MetadataDto[] = filteredOptions
    ? emptyOption.concat(filteredOptions)
    : emptyOption;

  const intersection = optionList.filter((a) =>
    props.some((b) => JSON.stringify(a) === JSON.stringify(b)),
  );

  return (
    <Autocomplete
      variant={errors ? 'error' : undefined}
      label={type}
      options={optionList}
      optionLabel={(option) => option.value}
      multiple
      initialSelectedOptions={
        intersection.length === 0 ? emptyOption : intersection
      }
      onOptionsChange={(e: AutocompleteChanges<MetadataDto>) => {
        handleAddMetadata(e, type);
        console.log(e.selectedItems);
      }}
    />
  );
};
