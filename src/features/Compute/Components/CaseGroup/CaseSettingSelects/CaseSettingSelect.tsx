import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import * as Styled from './SettingSelect.styled';
import { useIsOwnerOrAdmin } from '../../../../../hooks/useIsOwnerOrAdmin';
import {
  ComputeMethod,
  InputValueType,
  ListComputeSettingsModelDto,
} from '../../../../../api/generated';

export const CaseSettingSelect = ({
  label,
  settingType,
  caseMethod,
  options,
  selectedValue,
  setValue,
}: {
  label: string;
  settingType?: InputValueType;
  caseMethod?: ComputeMethod;
  options?: ListComputeSettingsModelDto[];
  selectedValue?: ListComputeSettingsModelDto[];
  setValue?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const onSelectChange = (
    changes: AutocompleteChanges<ListComputeSettingsModelDto>,
  ) => {
    setValue && setValue(changes.selectedItems);
  };

  const disabled =
    (caseMethod === ComputeMethod.NET_TO_GROSS &&
      settingType === InputValueType.ATTRIBUTE_NAME) ||
    (caseMethod === ComputeMethod.INDICATOR &&
      (settingType === InputValueType.ATTRIBUTE_NAME ||
        settingType === InputValueType.NET_TO_GROSS ||
        label === 'Architectural elements filter')) ||
    !isOwnerOrAdmin;

  return (
    <Styled.MetadataWrapper>
      <Autocomplete
        label={label}
        disabled={disabled}
        options={options && options.length > 0 ? options : []}
        optionLabel={(option) => option.name!}
        selectedOptions={selectedValue}
        onOptionsChange={onSelectChange}
        multiple={settingType !== InputValueType.NET_TO_GROSS}
      ></Autocomplete>
    </Styled.MetadataWrapper>
  );
};
