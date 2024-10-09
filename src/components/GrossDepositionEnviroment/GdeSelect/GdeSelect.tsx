/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { GeologicalStandardDto } from '../../../api/generated';
import { useFetchGrossDepData } from '../../../hooks/useFetchGrossDepData';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { sortList } from '../../../utils/SortList';
import {
  GDEErrorType,
  GdeType,
} from '../GrossDepositionEnviromentGroup/GrossDepositionEnviromentGroup';

export const GdeSelect = ({
  gdeObject,
  setGdeObject,
  error,
}: {
  gdeObject: GdeType;
  setGdeObject: React.Dispatch<React.SetStateAction<GdeType>>;
  error: GDEErrorType;
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
        options={sortList(Gde)}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            grossDepEnv: e.selectedItems[0],
          });
        }}
        noOptionsText="No options"
        variant={error.GDE ? 'error' : undefined}
        helperText={error.GDE ? error.GDE : undefined}
      />

      <Autocomplete
        label="Depositional Environment"
        disabled={gdeObject.grossDepEnv?.geologicalStandardId === undefined}
        options={sortList(De)}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            depEnv: e.selectedItems[0],
          });
        }}
        noOptionsText="No options"
        variant={error.DEnv ? 'error' : undefined}
        helperText={error.DEnv ? error.DEnv : undefined}
      />

      <Autocomplete
        label="Subenvironment"
        disabled={gdeObject.grossDepEnv?.geologicalStandardId === undefined}
        options={sortList(SubEnvironment)}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            subenv: e.selectedItems[0],
          });
        }}
        noOptionsText="No options"
        variant={error.subEnv ? 'error' : undefined}
        helperText={error.subEnv ? error.subEnv : undefined}
      />

      <Autocomplete
        label="Architectural Element"
        multiple
        options={sortList(ArchitecturalElement)}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            architecturalElements: e.selectedItems,
          });
        }}
        noOptionsText="No options"
        variant={error.AEl ? 'error' : undefined}
        helperText={error.subEnv ? error.AEl : undefined}
      />
    </StyledDialog.AutocompleteList>
  );
};
