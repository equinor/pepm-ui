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
  const setSelectedMetadataOptions = (type: string) => {
    if (!isLoading && data && metadata) {
      const dataProps = data.filter((z) => z.metadataType === type);

      const selectedProps = metadata.filter((m) => m.metadataType === type);

      return dataProps.filter(
        (c) =>
          selectedProps.findIndex((x: MetadataDto) => x.value === c.value) > -1,
      );
    }
  };

  return (
    <Autocomplete
      variant={errors ? 'error' : undefined}
      label={type}
      options={data.filter((d) => d.metadataType === type)}
      optionLabel={(option) => option.value}
      selectedOptions={setSelectedMetadataOptions(type)}
      multiple
      onOptionsChange={(e: AutocompleteChanges<MetadataDto>) =>
        handleAddMetadata(e, type)
      }
    ></Autocomplete>
  );
};
