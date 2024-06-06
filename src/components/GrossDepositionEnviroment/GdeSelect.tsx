/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { useState } from 'react';
import { GeologicalStandardDto } from '../../api/generated';
import { useFetchGrossDepData } from '../../hooks/useFetchGrossDepData';

export const GdeSelect = () => {
  const [SelectedGde, setSelectedGde] = useState<string>();

  const GdeData = useFetchGrossDepData();

  if (GdeData.isLoading || !GdeData.data?.success) return <p>Loading .....</p>;

  const Gde = GdeData.data.data.filter(
    (g) => g.geologyGroup === 'GrossDepositionalEnvironment',
  );

  const De = GdeData.data.data.filter(
    (g) =>
      g.geologyGroup === 'DepositionalEnvironment' &&
      g.geologicalStandardParentId === SelectedGde,
  );

  const SubEnvironment = GdeData.data.data.filter(
    (g) =>
      g.geologyGroup === 'Subenvironment' &&
      g.geologicalStandardParentId === SelectedGde,
  );

  const ArchitecturalElement = GdeData.data.data.filter(
    (g) =>
      g.geologyGroup === 'Subenvironment' &&
      g.geologicalStandardParentId === SelectedGde,
  );

  return (
    <div>
      <Autocomplete
        label="Gross Depositional Environment (GDE)"
        options={Gde}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setSelectedGde(e.selectedItems[0].geologicalStandardId);
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        label="Depositional Environment"
        disabled={SelectedGde === undefined}
        options={De}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          console.log(e.selectedItems[0].geologicalStandardId);
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        label="Subenvironment"
        disabled={SelectedGde === undefined}
        options={SubEnvironment}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          console.log(e.selectedItems[0].geologicalStandardId);
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        label="ArchitecturalElement"
        options={ArchitecturalElement}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          console.log(e.selectedItems[0].geologicalStandardId);
        }}
        noOptionsText="No options"
      />
    </div>
  );
};
