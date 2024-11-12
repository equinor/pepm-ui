/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { OutcropDto } from '../../../api/generated';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { sortList } from '../../../utils/SortList';
import {
  OutcropErrorType,
  OutcropType,
} from '../OutcropAnalogueGroup/OutcropAnalogueGroup';
import { usePepmContextStore } from '../../../hooks/GlobalState';

export const OutcropSelect = ({
  outcropObject,
  error,
  setOutcropObject,
}: {
  outcropObject: OutcropType;
  error: OutcropErrorType;
  setOutcropObject: React.Dispatch<React.SetStateAction<OutcropType>>;
}) => {
  const { outcrops, analogueModel } = usePepmContextStore();
  const oc: OutcropDto[] = [...outcrops];

  if (outcrops.length === 0) return <p>Loading .....</p>;

  const filterDisabled = (option: OutcropDto) => {
    const caseExists = analogueModel.outcrops.filter(
      (outcrop) => outcrop.outcropId === option.outcropId,
    );
    return caseExists.length > 0;
  };
  return (
    <StyledDialog.AutocompleteList>
      <Autocomplete
        label="Analogue"
        options={sortList(oc)}
        optionLabel={(option) => option.name}
        onOptionsChange={(e: AutocompleteChanges<OutcropDto>) => {
          const copyObject: OutcropType = {
            name: e.selectedItems[0] ? e.selectedItems[0].name : undefined,
            outcropCategory: e.selectedItems[0]
              ? e.selectedItems[0].outcropCategory
              : undefined,
            outcropId: e.selectedItems[0]
              ? e.selectedItems[0].outcropId
              : undefined,
            region: e.selectedItems[0] ? e.selectedItems[0].region : undefined,
            basins: [],
          };
          copyObject.basins = [];
          e.selectedItems[0] &&
            e.selectedItems[0].basins.map(
              (item) =>
                copyObject.basins !== undefined && copyObject.basins.push(item),
            );

          setOutcropObject(copyObject);
        }}
        optionDisabled={filterDisabled}
        noOptionsText="No options"
        variant={error.Analogue ? 'error' : undefined}
        helperText={error.Analogue ? error.Analogue : undefined}
      />
      {outcropObject.region?.locations &&
      outcropObject.region?.locations?.length !== 0 ? (
        <>
          <Autocomplete
            label="Country"
            selectedOptions={[outcropObject.region?.locations[0].country]}
            initialSelectedOptions={
              outcropObject.region
                ? [outcropObject.region.locations[0].country]
                : ['']
            }
            options={
              outcropObject.region !== undefined
                ? [outcropObject.region.locations[0].country]
                : ['']
            }
            noOptionsText="No options"
            readOnly
          />

          <Autocomplete
            label="Location"
            selectedOptions={[outcropObject.region?.locations[0].locationName]}
            initialSelectedOptions={
              outcropObject.region
                ? [outcropObject.region?.locations[0].locationName]
                : ['']
            }
            options={
              outcropObject.region !== undefined
                ? [outcropObject.region?.locations[0].locationName]
                : ['']
            }
            noOptionsText="No options"
            readOnly
          />
        </>
      ) : (
        <></>
      )}

      <Autocomplete
        label="Region"
        selectedOptions={[outcropObject.region?.name]}
        initialSelectedOptions={
          outcropObject.region ? [outcropObject.region.name] : ['']
        }
        options={
          outcropObject.region !== undefined
            ? [outcropObject.region.name]
            : ['']
        }
        noOptionsText="No options"
        readOnly
      />

      <Autocomplete
        label="Basin"
        selectedOptions={outcropObject.basins}
        initialSelectedOptions={
          outcropObject.basins ? outcropObject.basins : ['']
        }
        options={
          outcropObject.basins !== undefined ? outcropObject.basins : ['']
        }
        noOptionsText="No options"
        readOnly
      />

      <Autocomplete
        label="Area"
        selectedOptions={[outcropObject.outcropCategory]}
        initialSelectedOptions={
          outcropObject.outcropCategory ? [outcropObject.outcropCategory] : ['']
        }
        options={
          outcropObject.outcropCategory !== undefined
            ? [outcropObject.outcropCategory]
            : ['']
        }
        noOptionsText="No options"
        readOnly
      />
    </StyledDialog.AutocompleteList>
  );
};
