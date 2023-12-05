import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ParameterList } from '../../../../../api/generated/models/ParameterList';

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
    <Autocomplete
      label={label}
      options={options}
      optionLabel={(option) => option.name}
      onOptionsChange={onParameterChange}
      selectedOptions={selectedParameters}
      multiple
    ></Autocomplete>
  );
};
