import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ModelAreaDto } from '../../../../../api/generated';
import * as Styled from '../CaseOptionSelects.styled';

export const ModelAreaSelect = ({
  modelAreas,
  selectedModelArea,
  disableSelect,
  setModelArea,
}: {
  modelAreas: ModelAreaDto[];
  selectedModelArea: ModelAreaDto[] | undefined;
  disableSelect?: boolean;
  setModelArea?: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
}) => {
  return (
    <Styled.AutocompleteWrapper>
      <Autocomplete
        label="Model area"
        readOnly={disableSelect}
        options={
          modelAreas && modelAreas.length > 0
            ? modelAreas
            : [
                {
                  modelAreaId: '',
                  modelAreaType: 'Whole Model',
                  coordinates: [],
                },
              ]
        }
        selectedOptions={
          selectedModelArea &&
          selectedModelArea.length > 0 &&
          selectedModelArea[0].modelAreaId !== ''
            ? selectedModelArea
            : [
                {
                  modelAreaId: '',
                  modelAreaType: 'Whole Model',
                  coordinates: [],
                },
              ]
        }
        optionLabel={(modelArea) => modelArea.modelAreaType}
        onOptionsChange={(changes: AutocompleteChanges<ModelAreaDto>) =>
          setModelArea && setModelArea(changes.selectedItems)
        }
      ></Autocomplete>
    </Styled.AutocompleteWrapper>
  );
};
