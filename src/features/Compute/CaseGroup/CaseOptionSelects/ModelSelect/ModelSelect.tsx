/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { default as optionTypes } from '../../CaseGroup';

export const ModelSelect = ({
  label,
  type,
  options,
  selectedVariogramModels,
  setVariogramModels,
}: {
  label: string;
  type: string;
  options: optionTypes[];

  selectedVariogramModels?: optionTypes[] | undefined;
  setVariogramModels?: React.Dispatch<
    React.SetStateAction<optionTypes[] | undefined>
  >;
}) => {
  const onModelChange = (changes: AutocompleteChanges<optionTypes>) => {
    setVariogramModels && setVariogramModels(changes.selectedItems);
  };

  return (
    <Autocomplete
      label={label}
      options={options}
      optionLabel={(opt) => opt.name}
      onOptionsChange={onModelChange}
      selectedOptions={selectedVariogramModels}
      multiple
    ></Autocomplete>
  );
};
