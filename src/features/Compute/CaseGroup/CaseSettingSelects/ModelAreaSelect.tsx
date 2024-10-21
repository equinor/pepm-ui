/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Label,
} from '@equinor/eds-core-react';
import { ComputeCaseDto, ModelAreaDto } from '../../../../api/generated';
import * as Styled from './SettingSelect.styled';

export const ModelAreaSelect = ({
  modelAreas,
  selectedModelArea,
  disableSelect,
  existingCases,
  caseError,
  caseType,
  setModelArea,
  isOwner,
}: {
  modelAreas: ModelAreaDto[];
  selectedModelArea: ModelAreaDto[] | undefined;
  disableSelect?: boolean;
  existingCases: ComputeCaseDto[];
  caseError: string;
  caseType?: string;
  setModelArea?: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
  isOwner: () => boolean;
}) => {
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
          variant={caseError.length > 0 ? 'error' : undefined}
          disabled={!isOwner()}
        />
        {caseError.length > 0 && <Label label={caseError}></Label>}
      </Styled.Required>
    </Styled.AutocompleteRow>
  );
};
