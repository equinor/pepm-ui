/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ComputeCaseDto, ModelAreaDto } from '../../../../../api/generated';
import * as Styled from './SettingSelect.styled';
import { useIsOwnerOrAdmin } from '../../../../../hooks/useIsOwnerOrAdmin';
import { Variants } from '@equinor/eds-core-react/dist/types/components/types';

export const ModelAreaSelect = ({
  modelAreas,
  selectedModelArea,
  disableSelect,
  existingCases,
  caseType,
  setModelArea,
  variant,
}: {
  modelAreas: ModelAreaDto[];
  selectedModelArea: ModelAreaDto[] | undefined;
  disableSelect?: boolean;
  existingCases: ComputeCaseDto[];
  caseType?: string;
  setModelArea?: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
  variant?: Variants;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();

  const filterDisabled = (option: ModelAreaDto) => {
    if (existingCases.length === 0) {
      return false;
    } else if (
      !option.modelAreaId &&
      existingCases.find((c) => c.modelArea === null)
    ) {
      return true;
    }

    const caseExists = existingCases
      .filter((c) => c.modelArea !== null)
      .filter((c) => c.modelArea.modelAreaId === option.modelAreaId);

    return caseExists.length > 0;
  };

  return (
    <Styled.AutocompleteRow>
      <Styled.Required>
        <Autocomplete
          label="Model area"
          readOnly={disableSelect}
          options={modelAreas && modelAreas.length > 0 ? modelAreas : []}
          selectedOptions={
            selectedModelArea &&
            selectedModelArea.length > 0 &&
            selectedModelArea[0].modelAreaId !== ''
              ? selectedModelArea
              : selectedModelArea &&
                selectedModelArea.length > 0 &&
                selectedModelArea[0].modelAreaType === 'Whole model'
              ? [
                  {
                    modelAreaId: '',
                    modelAreaType: 'Whole model',
                    coordinates: [],
                  },
                ]
              : [
                  {
                    modelAreaId: '',
                    modelAreaType: '',
                    coordinates: [],
                  },
                ]
          }
          optionLabel={(modelArea) => modelArea.modelAreaType}
          onOptionsChange={(changes: AutocompleteChanges<ModelAreaDto>) =>
            setModelArea && setModelArea(changes.selectedItems)
          }
          optionDisabled={!caseType ? filterDisabled : undefined}
          disabled={!isOwnerOrAdmin}
          variant={variant}
        />
      </Styled.Required>
    </Styled.AutocompleteRow>
  );
};
