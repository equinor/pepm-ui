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
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { sortList } from '../../../utils/SortList';
import {
  StratColumnErrorType,
  StratColumnType,
} from '../StratigrapicGroups/StratigrapicGroups';

export const StratigraphicColumnSelect = ({
  stratColumnObject,
  setStratColumnObject,
  error,
  setErrors,
}: {
  stratColumnObject: StratColumnType;
  setStratColumnObject: React.Dispatch<React.SetStateAction<StratColumnType>>;
  error: StratColumnErrorType;
  setErrors: React.Dispatch<React.SetStateAction<StratColumnErrorType>>;
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

  const hasFields = (id: string) => {
    const res = fieldData.data.data.filter((f) => f.countryId === id);
    return res;
  };

  const hasStratCol = (id: string) => {
    const StratColContryList = stratColumnData.data.data.map((col) =>
      col.countries.filter((c) => c.countryId === id),
    );
    const res = StratColContryList.filter((col) => col.length > 0);
    return res;
  };

  const filterCountries = countryData.data.data.filter(
    (c) =>
      hasStratCol(c.countryId).length > 0 || hasFields(c.countryId).length > 0,
  );

  return (
    <StyledDialog.AutocompleteList>
      <Autocomplete
        label="Country"
        options={sortList(filterCountries)}
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
          setErrors({});
        }}
        noOptionsText="No options"
        variant={error.country ? 'error' : undefined}
        helperText={error.country ? error.country : undefined}
      />

      <Autocomplete
        disabled={stratColumnObject.country === undefined}
        label="Field"
        options={sortList(
          fieldData.data.data.filter(
            (field) => field.countryId === stratColumnObject.country?.countryId,
          ),
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
        variant={
          error.field && stratColumnObject.country !== undefined
            ? 'error'
            : undefined
        }
        helperText={
          error.field && stratColumnObject.country !== undefined
            ? error.field
            : undefined
        }
      />

      <Autocomplete
        disabled={stratColumnObject.country === undefined}
        label="Stratigraphic column"
        options={sortList(
          stratColumnData.data.data.filter(
            (c) =>
              stratColumnObject.country !== undefined &&
              c.countries.filter(
                (country) =>
                  country.countryId === stratColumnObject.country?.countryId,
              ).length !== 0,
          ),
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
          setErrors({});
        }}
        selectedOptions={
          stratColumnObject.stratColumn ? [stratColumnObject.stratColumn] : []
        }
        noOptionsText="No options"
        variant={
          error.stratColumn && stratColumnObject.country !== undefined
            ? 'error'
            : undefined
        }
        helperText={
          error.stratColumn && stratColumnObject.country !== undefined
            ? error.stratColumn
            : undefined
        }
      />

      <Autocomplete
        disabled={stratColumnObject.stratColumn === undefined}
        label="Level 1 (group)"
        options={sortList(
          stratUnitData.data.data
            .filter((s) => s.level === 1)
            .filter(
              (c) =>
                c.stratColumnId ===
                stratColumnObject.stratColumn?.stratColumnId,
            ),
        )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<StratUnitDto>) => {
          setStratColumnObject({
            ...stratColumnObject,
            level1: e.selectedItems[0],
            level2: undefined,
            level3: undefined,
          });
          setErrors({});
        }}
        selectedOptions={
          stratColumnObject.level1 ? [stratColumnObject.level1] : []
        }
        noOptionsText="No options"
        variant={
          error.level1 && stratColumnObject.stratColumn !== undefined
            ? 'error'
            : undefined
        }
        helperText={
          error.level1 && stratColumnObject.stratColumn !== undefined
            ? error.level1
            : undefined
        }
      />

      <Autocomplete
        disabled={stratColumnObject.level1 === undefined}
        label="Level 2 (formation)"
        options={sortList(
          stratUnitData.data.data
            .filter((s) => s.level === 2)
            .filter(
              (c) =>
                c.stratColumnId ===
                stratColumnObject.stratColumn?.stratColumnId,
            )
            .filter(
              (x) =>
                x.stratUnitParentId === stratColumnObject.level1?.stratUnitId,
            ),
        )}
        optionLabel={(option) => option.identifier}
        onOptionsChange={(e: AutocompleteChanges<StratUnitDto>) => {
          setStratColumnObject({
            ...stratColumnObject,
            level2: e.selectedItems[0],
            level3: undefined,
          });
          setErrors({});
        }}
        selectedOptions={
          stratColumnObject.level2 ? [stratColumnObject.level2] : []
        }
        noOptionsText="No options"
        variant={
          error.level2 && stratColumnObject.level1 !== undefined
            ? 'error'
            : undefined
        }
        helperText={
          error.level2 && stratColumnObject.level1 !== undefined
            ? error.level2
            : undefined
        }
      />

      <Autocomplete
        disabled={stratColumnObject.level2 === undefined}
        label="Level 3 (formation/subzone)"
        options={sortList(
          stratUnitData.data.data
            .filter((s) => s.level === 3)
            .filter(
              (c) =>
                c.stratColumnId ===
                stratColumnObject.stratColumn?.stratColumnId,
            )
            .filter(
              (x) =>
                x.stratUnitParentId === stratColumnObject.level2?.stratUnitId,
            ),
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
    </StyledDialog.AutocompleteList>
  );
};
