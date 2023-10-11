/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Chip,
} from '@equinor/eds-core-react';
import { default as optionTypes } from '../CaseCard';
import * as Styled from './CaseCardParameters.styled';

export const CaseCardParameters = ({
  label,
  type,
  options,
  selectedGrainSize,
  selectedVariogramModels,
  selectedParameters,
  setGrainSize,
  setVariogramModels,
  setParameters,
}: {
  label: string;
  type: string;
  options: optionTypes[];
  selectedGrainSize?: optionTypes | undefined;
  selectedVariogramModels?: optionTypes[] | undefined;
  selectedParameters?: optionTypes[] | undefined;
  setGrainSize?: React.Dispatch<React.SetStateAction<optionTypes | undefined>>;
  setVariogramModels?: React.Dispatch<
    React.SetStateAction<optionTypes[] | undefined>
  >;
  setParameters?: React.Dispatch<
    React.SetStateAction<optionTypes[] | undefined>
  >;
}) => {
  const onGrainSizeChange = (changes: AutocompleteChanges<optionTypes>) => {
    setGrainSize && setGrainSize(changes.selectedItems[0]);
  };
  const onModelChange = (changes: AutocompleteChanges<optionTypes>) => {
    setVariogramModels && setVariogramModels(changes.selectedItems);
  };
  const onParameterChange = (changes: AutocompleteChanges<optionTypes>) => {
    setParameters && setParameters(changes.selectedItems);
  };

  return (
    <Styled.Parameters>
      {type === 'grainSize' && (
        <Autocomplete
          label={label}
          options={options}
          optionLabel={(option) => option.name}
          onOptionsChange={onGrainSizeChange}
        ></Autocomplete>
      )}
      {type === 'variogramModels' && (
        <Autocomplete
          label={label}
          options={options}
          optionLabel={(opt) => opt.name}
          onOptionsChange={onModelChange}
          multiple
        ></Autocomplete>
      )}
      {type === 'parameters' && (
        <Autocomplete
          label={label}
          options={options}
          optionLabel={(opt) => opt.name}
          onOptionsChange={onParameterChange}
          multiple
        ></Autocomplete>
      )}

      {selectedGrainSize && type === 'grainSize' && (
        <Chip key={selectedGrainSize.id}>{selectedGrainSize.size}</Chip>
      )}
      {selectedVariogramModels &&
        type === 'variogramModels' &&
        selectedVariogramModels.map((s) => <Chip key={s.id}>{s.name}</Chip>)}
      {selectedParameters &&
        type === 'parameters' &&
        selectedParameters.map((s) => <Chip key={s.id}>{s.name}</Chip>)}
    </Styled.Parameters>
  );
};
