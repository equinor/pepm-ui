import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { default as optionTypes } from '../CaseCard';
import * as Styled from './CaseCardInputs.styled';

export const CaseCardInputs = ({
  modelAreas,
  computeMethods,
  setModelArea,
  setComputeMethod,
}: {
  modelAreas: optionTypes[];
  computeMethods: optionTypes[];
  setModelArea: React.Dispatch<React.SetStateAction<optionTypes | undefined>>;
  setComputeMethod: React.Dispatch<
    React.SetStateAction<optionTypes | undefined>
  >;
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
      <Autocomplete
        label="Compute method"
        options={computeMethods}
        optionLabel={(computeMethod) => computeMethod.name}
        onOptionsChange={(changes: AutocompleteChanges<optionTypes>) =>
          setComputeMethod(changes.selectedItems[0])
        }
      ></Autocomplete>
    </Styled.AutocompleteWrapper>
  );
};
