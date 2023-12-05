import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { default as optionTypes } from '../../CaseGroup';

export const GrainSizeSelect = ({
  label,
  type,
  options,
  selectedGrainSize,
  setGrainSize,
}: {
  label: string;
  type: string;
  options: optionTypes[];
  selectedGrainSize?: optionTypes[];
  setGrainSize: React.Dispatch<React.SetStateAction<optionTypes[] | undefined>>;
}) => {
  const onGrainSizeChange = (changes: AutocompleteChanges<optionTypes>) => {
    setGrainSize && setGrainSize(changes.selectedItems);
  };

  return (
    <Autocomplete
      label={label}
      options={options}
      optionLabel={(option) => option.name}
      onOptionsChange={onGrainSizeChange}
      selectedOptions={selectedGrainSize}
    ></Autocomplete>
  );
};
