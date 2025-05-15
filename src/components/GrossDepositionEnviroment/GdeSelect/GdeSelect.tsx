/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { GeologicalStandardDto } from '../../../api/generated';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { sortList } from '../../../utils/SortList';
import {
  GDEErrorType,
  GdeType,
} from '../GrossDepositionEnviromentGroup/GrossDepositionEnviromentGroup';
import { usePepmContextStore } from '../../../stores/GlobalStore';

export const GdeSelect = ({
  gdeObject,
  setGdeObject,
  error,
  setErrors,
}: {
  gdeObject: GdeType;
  setGdeObject: React.Dispatch<React.SetStateAction<GdeType>>;
  error: GDEErrorType;
  setErrors: React.Dispatch<React.SetStateAction<GDEErrorType>>;
}) => {
  const { geologyStandards } = usePepmContextStore();
  if (geologyStandards.length === 0) return <p>Loading .....</p>;

  const Gde = geologyStandards.filter(
    (g) => g.geologyGroup === 'GrossDepositionalEnvironment',
  );

  const De = geologyStandards.filter(
    (g) =>
      g.geologyGroup === 'DepositionalEnvironment' &&
      g.geologicalStandardParentId ===
        gdeObject.grossDepEnv?.geologicalStandardId,
  );

  const SubEnvironment = geologyStandards.filter(
    (g) =>
      g.geologyGroup === 'Subenvironment' &&
      g.geologicalStandardParentId ===
        gdeObject.grossDepEnv?.geologicalStandardId,
  );

  const setDisplayName = (option: GeologicalStandardDto) => {
    return option.equinorCode + ' ' + option.identifier;
  };

  const intToArray = (number: number) => {
    return Array.from(number.toString()).map(Number);
  };

  const filterByCode = (data: GeologicalStandardDto[]) => {
    if (gdeObject.depEnv === undefined) return [];

    const equinorCodeString = gdeObject.depEnv.equinorCode.toString();
    const firstTwoNumbersArray = intToArray(
      parseInt(equinorCodeString.slice(0, 2)),
    );
    const filteredList = data.filter(
      (d) =>
        intToArray(d.equinorCode)[0] === firstTwoNumbersArray[0] &&
        intToArray(d.equinorCode)[1] === firstTwoNumbersArray[1],
    );

    return filteredList;
  };

  return (
    <StyledDialog.AutocompleteList>
      <Autocomplete
        label="Gross Depositional Environment (GDE)"
        options={sortList(Gde, true)}
        optionLabel={(option) => setDisplayName(option)}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            grossDepEnv: e.selectedItems[0],
            depEnv: undefined,
            subenv: undefined,
          });
          setErrors({});
        }}
        noOptionsText="No options"
        variant={error.GDE ? 'error' : undefined}
        helperText={error.GDE ? error.GDE : undefined}
      />

      <Autocomplete
        label="Depositional Environment"
        disabled={gdeObject.grossDepEnv?.geologicalStandardId === undefined}
        options={sortList(De, true)}
        optionLabel={(option) => setDisplayName(option)}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            depEnv: e.selectedItems[0],
            subenv: undefined,
          });
        }}
        selectedOptions={gdeObject.depEnv ? [gdeObject.depEnv] : []}
        noOptionsText="No options"
        variant={
          error.DEnv && gdeObject.grossDepEnv !== undefined
            ? 'error'
            : undefined
        }
        helperText={
          error.DEnv && gdeObject.grossDepEnv !== undefined
            ? error.DEnv
            : undefined
        }
      />

      <Autocomplete
        label="Subenvironment"
        disabled={gdeObject.grossDepEnv?.geologicalStandardId === undefined}
        options={filterByCode(sortList(SubEnvironment, true))}
        optionLabel={(option) => setDisplayName(option)}
        onOptionsChange={(e: AutocompleteChanges<GeologicalStandardDto>) => {
          setGdeObject({
            ...gdeObject,
            subenv: e.selectedItems[0],
          });
        }}
        selectedOptions={gdeObject.subenv ? [gdeObject.subenv] : []}
        noOptionsText="No options"
        variant={
          error.subEnv && gdeObject.grossDepEnv !== undefined
            ? 'error'
            : undefined
        }
        helperText={
          error.subEnv && gdeObject.grossDepEnv !== undefined
            ? error.subEnv
            : undefined
        }
      />
    </StyledDialog.AutocompleteList>
  );
};
