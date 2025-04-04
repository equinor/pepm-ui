import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import * as Styled from './SettingSelect.styled';
import { useIsOwnerOrAdmin } from '../../../../../hooks/useIsOwnerOrAdmin';
import {
  ComputeMethod,
  InputValueType,
  ListComputeSettingsModelDto,
} from '../../../../../api/generated';
import { Variants } from '@equinor/eds-core-react/dist/types/components/types';

export const CaseSettingSelect = ({
  label,
  settingType,
  caseMethod,
  options,
  selectedValue,
  setValue,
  variant,
}: {
  label: string;
  settingType?: InputValueType;
  caseMethod?: ComputeMethod;
  options?: ListComputeSettingsModelDto[];
  selectedValue?: ListComputeSettingsModelDto[];
  setValue?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
  variant: Variants | undefined;
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        optionLabel={(option) =>
          option.equinorName !== null && option.equinorName !== undefined
            ? option.equinorName!
            : option.name!
        }
        selectedOptions={selectedValue}
        onOptionsChange={onSelectChange}
        multiple={settingType !== InputValueType.NET_TO_GROSS}
        variant={variant}
      ></Autocomplete>
    </Styled.MetadataWrapper>
  );
};
