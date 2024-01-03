/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ComputeCaseDto, ModelAreaDto } from '../../../../../api/generated';
import * as Styled from '../CaseOptionSelects.styled';

export const ModelAreaSelect = ({
  modelAreas,
  selectedModelArea,
  disableSelect,
  existingCases,
  setModelArea,
}: {
  modelAreas: ModelAreaDto[];
  selectedModelArea: ModelAreaDto[] | undefined;
  disableSelect?: boolean;
  existingCases: ComputeCaseDto[];
  setModelArea?: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
}) => {
  const filterDisabled = (option: ModelAreaDto) => {
    if (!existingCases || existingCases.length === 0 || !option.modelAreaId)
      return true;

    const caseExists = existingCases
      .filter((c) => c.modelArea !== null)
      .filter((c) => c.modelArea.modelAreaId === option.modelAreaId);

    return caseExists.length > 0;
  };

  return (
    <Styled.AutocompleteWrapper>
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
              selectedModelArea[0].modelAreaType === ''
            ? [
                {
                  modelAreaId: '',
                  modelAreaType: 'Whole Model',
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
        optionDisabled={filterDisabled}
      ></Autocomplete>
    </Styled.AutocompleteWrapper>
  );
};
