import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ListComputeSettingsInputValueDto } from '../../../../../api/generated';

export const CaseSettingSelect = ({
  label,
  settingType,
  caseType,
  options,
  selectedValue,
  setValue,
}: {
  label: string;
  settingType?: string;
  caseType?: string;
  options?: ListComputeSettingsInputValueDto[];
  selectedValue?: ListComputeSettingsInputValueDto[];
  setValue?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
}) => {
  const onSelectChange = (
    changes: AutocompleteChanges<ListComputeSettingsInputValueDto>,
  ) => {
    setValue && setValue(changes.selectedItems);
  };

  return (
    <Autocomplete
      label={label}
      disabled={
        (caseType === 'Net-To-Gross' || caseType === 'Indicator') &&
        settingType !== 'ContiniousParameter'
      }
      options={options && options.length > 0 ? options : []}
      optionLabel={(option) => option.name}
      selectedOptions={selectedValue}
      onOptionsChange={onSelectChange}
      multiple
    ></Autocomplete>
  );
};
