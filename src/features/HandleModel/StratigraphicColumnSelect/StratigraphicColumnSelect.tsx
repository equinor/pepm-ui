/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import {
  CountryDto,
  FieldDto,
  StratColumnDto,
  StratUnitDto,
} from '../../../api/generated';
import {
  useFetchSmdaCountries,
  useFetchSmdaFields,
  useFetchSmdaMetadataStratigraphicUnits,
  useFetchSmdaStratigraphicColumns,
} from '../../../hooks/useFetchStratColData';
import {
  ErrorType,
  StratColumnType,
} from '../HandleModelComponent/HandleModelComponent';
import * as Styled from './StratigraphicColumnSelect.styled';

export const StratigraphicColumnSelect = ({
  errors,
  stratColumnObject,
  setStratColumnObject,
}: {
  errors: ErrorType;
  stratColumnObject: StratColumnType;
  setStratColumnObject: React.Dispatch<React.SetStateAction<StratColumnType>>;
}) => {
  const countryData = useFetchSmdaCountries();
  const fieldData = useFetchSmdaFields();
  const stratColumnData = useFetchSmdaStratigraphicColumns();
  const stratUnitData = useFetchSmdaMetadataStratigraphicUnits();

  if (
    countryData.isLoading ||
    !countryData?.data?.success ||
    fieldData.isLoading ||
    !fieldData?.data?.success ||
    stratColumnData.isLoading ||
    !stratColumnData?.data?.success ||
    stratUnitData.isLoading ||
    !stratUnitData?.data?.success
  )
    return <p>Loading ...</p>;

  return (
    <Styled.AutocompleteList>
      <Autocomplete
        variant={errors.country ? 'error' : undefined}
        label="Country"
        options={countryData.data.data}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<CountryDto>) => {
          setStratColumnObject({
            ...stratColumnObject,
            country: e.selectedItems[0],
            field: undefined,
            stratColumn: undefined,
            level1: undefined,
            level2: undefined,
            level3: undefined,
          });
        }}
        noOptionsText="No options"
      />

      <Autocomplete
        disabled={stratColumnObject.country === undefined}
        variant={errors.field ? 'error' : undefined}
        label="Field"
        options={fieldData.data.data.filter(
          (field) => field.countryId === stratColumnObject.country?.countryId,
        )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<FieldDto>) => {
          setStratColumnObject({
            ...stratColumnObject,
            field: e.selectedItems[0],
          });
        }}
        selectedOptions={
          stratColumnObject.field ? [stratColumnObject.field] : []
        }
        noOptionsText="No options"
      />

      <Autocomplete
        disabled={stratColumnObject.country === undefined}
        variant={errors.stratColumn ? 'error' : undefined}
        label="Stratigraphic column"
        options={stratColumnData.data.data.filter(
          (c) =>
            stratColumnObject.country !== undefined &&
            c.countries.filter(
              (country) =>
                country.countryId === stratColumnObject.country?.countryId,
            ).length !== 0,
        )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<StratColumnDto>) => {
          setStratColumnObject({
            ...stratColumnObject,
            stratColumn: e.selectedItems[0],
            level1: undefined,
            level2: undefined,
            level3: undefined,
          });
        }}
        selectedOptions={
          stratColumnObject.stratColumn ? [stratColumnObject.stratColumn] : []
        }
        noOptionsText="No options"
      />

      <Autocomplete
        disabled={stratColumnObject.stratColumn === undefined}
        variant={errors.level1 ? 'error' : undefined}
        label="Level 1 (group)"
        options={stratUnitData.data.data
          .filter((s) => s.level === 1)
          .filter(
            (c) =>
              c.stratColumnId === stratColumnObject.stratColumn?.stratColumnId,
          )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<StratUnitDto>) =>
          setStratColumnObject({
            ...stratColumnObject,
            level1: e.selectedItems[0],
            level2: undefined,
            level3: undefined,
          })
        }
        selectedOptions={
          stratColumnObject.level1 ? [stratColumnObject.level1] : []
        }
        noOptionsText="No options"
      />

      <Autocomplete
        disabled={stratColumnObject.level1 === undefined}
        variant={errors.level2 ? 'error' : undefined}
        label="Level 2 (formation)"
        options={stratUnitData.data.data
          .filter((s) => s.level === 2)
          .filter(
            (c) =>
              c.stratColumnId === stratColumnObject.stratColumn?.stratColumnId,
          )
          .filter(
            (x) =>
              x.stratUnitParentId === stratColumnObject.level1?.stratUnitId,
          )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<StratUnitDto>) =>
          setStratColumnObject({
            ...stratColumnObject,
            level2: e.selectedItems[0],
            level3: undefined,
          })
        }
        selectedOptions={
          stratColumnObject.level2 ? [stratColumnObject.level2] : []
        }
        noOptionsText="No options"
      />

      <Autocomplete
        disabled={stratColumnObject.level2 === undefined}
        variant={errors.level3 ? 'error' : undefined}
        label="Level 3 (formation/subzone)"
        options={stratUnitData.data.data
          .filter((s) => s.level === 3)
          .filter(
            (c) =>
              c.stratColumnId === stratColumnObject.stratColumn?.stratColumnId,
          )
          .filter(
            (x) =>
              x.stratUnitParentId === stratColumnObject.level2?.stratUnitId,
          )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<StratUnitDto>) =>
          setStratColumnObject({
            ...stratColumnObject,
            level3: e.selectedItems[0],
          })
        }
        selectedOptions={
          stratColumnObject.level3 ? [stratColumnObject.level3] : []
        }
        noOptionsText="No options"
      />
    </Styled.AutocompleteList>
  );
};
