import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { default as optionTypes } from '../CaseGroup';
import * as Styled from './CaseOptionSelects.styled';

export const ObjectOptionSelect = ({
  modelAreas,
  setModelArea,
}: {
  modelAreas: optionTypes[];
  setModelArea: React.Dispatch<React.SetStateAction<optionTypes | undefined>>;
}) => {
  return (
    <Styled.AutocompleteWrapper>
      <Autocomplete
        label="Model area"
        options={modelAreas}
        optionLabel={(modelArea) => modelArea.name}
        onOptionsChange={(changes: AutocompleteChanges<optionTypes>) =>
          setModelArea(changes.selectedItems[0])
        }
      ></Autocomplete>
    </Styled.AutocompleteWrapper>
  );
};
