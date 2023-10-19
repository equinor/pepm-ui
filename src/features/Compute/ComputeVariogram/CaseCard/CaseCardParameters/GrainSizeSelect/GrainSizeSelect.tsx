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
  selectedGrainSize?: optionTypes[];
  setGrainSize: React.Dispatch<React.SetStateAction<optionTypes[] | undefined>>;
}) => {
  const onGrainSizeChange = (changes: AutocompleteChanges<optionTypes>) => {
    setGrainSize && setGrainSize(changes.selectedItems);
  };

  return (
    <Styled.Parameters>
      <Autocomplete
        label={label}
        options={options}
        optionLabel={(option) => option.name}
        onOptionsChange={onGrainSizeChange}
        selectedOptions={selectedGrainSize}
      ></Autocomplete>

      {/* {selectedGrainSize && (
        <Chip key={selectedGrainSize[0].id}>{selectedGrainSize[0].size}</Chip>
      )} */}
      {selectedGrainSize &&
        selectedGrainSize.map((s) => <Chip key={s.id}>{s.name}</Chip>)}
    </Styled.Parameters>
  );
};
