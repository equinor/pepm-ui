import {
  Autocomplete,
  AutocompleteChanges,
  Chip,
} from '@equinor/eds-core-react';
import { default as optionTypes } from '../../CaseCard';
import * as Styled from '../CaseCardParameters.styled';

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
  selectedGrainSize?: optionTypes;
  setGrainSize: React.Dispatch<React.SetStateAction<optionTypes | undefined>>;
}) => {
  const onGrainSizeChange = (changes: AutocompleteChanges<optionTypes>) => {
    setGrainSize && setGrainSize(changes.selectedItems[0]);
  };

  return (
    <Styled.Parameters>
      <Autocomplete
        label={label}
        options={options}
        optionLabel={(option) => option.name}
        onOptionsChange={onGrainSizeChange}
      ></Autocomplete>

      {selectedGrainSize && (
        <Chip key={selectedGrainSize.id}>{selectedGrainSize.size}</Chip>
      )}
    </Styled.Parameters>
  );
};
