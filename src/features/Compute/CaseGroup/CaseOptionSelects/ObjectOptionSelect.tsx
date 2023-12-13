import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ModelAreaDto } from '../../../../api/generated';
import * as Styled from './CaseOptionSelects.styled';

export const ObjectOptionSelect = ({
  modelAreas,
  setModelArea,
}: {
  modelAreas?: ModelAreaDto[];
  setModelArea: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
}) => {
  return (
    <Styled.AutocompleteWrapper>
      <Autocomplete
        label="Model area"
        options={
          modelAreas && modelAreas.length > 0
            ? modelAreas
            : [
                {
                  modelAreaId: '123',
                  modelAreaType: 'Model areas not set',
                  coordinates: [],
                },
              ]
        }
        optionLabel={(modelArea) => modelArea.modelAreaType}
        onOptionsChange={(changes: AutocompleteChanges<ModelAreaDto>) =>
          setModelArea(changes.selectedItems)
        }
      ></Autocomplete>
    </Styled.AutocompleteWrapper>
  );
};
