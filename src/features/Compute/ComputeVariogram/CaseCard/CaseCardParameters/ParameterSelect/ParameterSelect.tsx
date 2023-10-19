import {
  Autocomplete,
  AutocompleteChanges,
  Chip,
} from '@equinor/eds-core-react';
import { ParameterList } from '../../../../../../api/generated/models/ParameterList';
import * as Styled from '../CaseCardParameters.styled';

export const ParameterSelect = ({
  label,
  type,
  options,
  selectedParameters,
  setParameters,
}: {
  label: string;
  type: string;
  options: ParameterList[];
  selectedParameters?: ParameterList[];
  setParameters: React.Dispatch<
    React.SetStateAction<ParameterList[] | undefined>
  >;
}) => {
  const onParameterChange = (changes: AutocompleteChanges<ParameterList>) => {
    setParameters(changes.selectedItems);
  };

  return (
    <Styled.Parameters>
      <Autocomplete
        label={label}
        options={options}
        optionLabel={(option) => option.name}
        onOptionsChange={onParameterChange}
        selectedOptions={selectedParameters}
        multiple
      ></Autocomplete>
      {selectedParameters &&
        selectedParameters.map((s) => (
          <Chip key={s.parameterId}>{s.name}</Chip>
        ))}
    </Styled.Parameters>
  );
};
