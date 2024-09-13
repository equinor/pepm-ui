/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { GeologicalStandardDto } from '../../../api/generated';
import { useFetchGrossDepData } from '../../../hooks/useFetchGrossDepData';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { GdeType } from '../GrossDepositionEnviromentGroup/GrossDepositionEnviromentGroup';

export const GdeSelect = ({
  gdeObject,
  setGdeObject,
}: {
  gdeObject: GdeType;
  setGdeObject: React.Dispatch<React.SetStateAction<GdeType>>;
}) => {
  const GdeData = useFetchGrossDepData();

  if (GdeData.isLoading || !GdeData.data?.success) return <p>Loading .....</p>;

  const Gde = GdeData.data.data.filter(
    (g) => g.geologyGroup === 'GrossDepositionalEnvironment',
  );

  const De = GdeData.data.data.filter(
    (g) =>
      g.geologyGroup === 'DepositionalEnvironment' &&
      g.geologicalStandardParentId ===
        gdeObject.grossDepEnv?.geologicalStandardId,
  );

  const SubEnvironment = GdeData.data.data.filter(
    (g) =>
      g.geologyGroup === 'Subenvironment' &&
      g.geologicalStandardParentId ===
        gdeObject.grossDepEnv?.geologicalStandardId,
  );

  const ArchitecturalElement = GdeData.data.data.filter(
    (g) => g.geologyGroup === 'ArchitecturalElement',
  );

  return (
    <StyledDialog.AutocompleteList>
      <Autocomplete
        label="Gross Depositional Environment (GDE)"
        options={Gde}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            grossDepEnv: e.selectedItems[0],
          });
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        label="Depositional Environment"
        disabled={gdeObject.grossDepEnv?.geologicalStandardId === undefined}
        options={De}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            depEnv: e.selectedItems[0],
          });
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        label="Subenvironment"
        disabled={gdeObject.grossDepEnv?.geologicalStandardId === undefined}
        options={SubEnvironment}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            subenv: e.selectedItems[0],
          });
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        label="Architectural Element"
        multiple
        options={ArchitecturalElement}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            architecturalElements: e.selectedItems,
          });
        }}
        noOptionsText="No options"
      />
    </StyledDialog.AutocompleteList>
  );
};
