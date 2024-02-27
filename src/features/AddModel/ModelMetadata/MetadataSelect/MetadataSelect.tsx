/* eslint-disable max-lines-per-function */
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
  const filteredOptions = data.filter((d) => d.metadataType === type);
  const optionList: MetadataDto[] = filteredOptions
    ? emptyOption.concat(filteredOptions)
    : emptyOption;

  const setSelectedMetadataOptions = (type: string) => {
    let selectedOptions: MetadataDto[] = [];

    if (!isLoading && data && metadata) {
      const selectedProps = metadata.filter((m) => m.metadataType === type);

      const noRelevantSelected = metadata
        .filter((m) => m.metadataType === 'NoRelevant')
        .filter((t) => t.metadataId === type);

      const loadedProps = optionList.filter(
        (c) =>
          selectedProps.findIndex((x: MetadataDto) => x.value === c.value) > -1,
      );

      if (
        metadata.length > 0 &&
        selectedProps.length > 0 &&
        noRelevantSelected.length === 0
      ) {
        selectedOptions = loadedProps;
      } else if (
        selectedProps.length === 0 &&
        noRelevantSelected.length === 0
      ) {
        selectedOptions = emptyOption;
      } else if (
        selectedProps.length === 0 &&
        noRelevantSelected.length !== 0
      ) {
        selectedOptions = [];
      }
    }
    return selectedOptions;
  };
  const resLitstLength = setSelectedMetadataOptions(type)?.length;

  return (
    <Autocomplete
      variant={errors ? 'error' : undefined}
      label={type}
      options={optionList}
      optionLabel={(option) => option.value}
      selectedOptions={
        setSelectedMetadataOptions(type) &&
        setSelectedMetadataOptions(type) !== undefined &&
        resLitstLength &&
        resLitstLength > 0
          ? setSelectedMetadataOptions(type)
          : resLitstLength && resLitstLength === 0
          ? [
              {
                metadataId: type,
                metadataType: 'NoRelevant',
                value: 'Not relevant',
              },
            ]
          : []
      }
      multiple
      onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
        handleAddMetadata(e, type)
      }
    ></Autocomplete>
  );
};
