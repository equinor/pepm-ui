/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { GetOutcropsDto } from '../../../api/generated';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { sortList } from '../../../utils/SortList';
import {
  OutcropErrorType,
  OutcropType,
} from '../OutcropAnalogueGroup/OutcropAnalogueGroup';
import { usePepmContextStore } from '../../../stores/GlobalStore';

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
  const oc: GetOutcropsDto[] = [...outcrops];

  if (outcrops.length === 0) return <p>Loading .....</p>;

  const filterDisabled = (option: GetOutcropsDto) => {
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
        onOptionsChange={(e: AutocompleteChanges<GetOutcropsDto>) => {
          const copyObject: OutcropType = {
            name: e.selectedItems[0] ? e.selectedItems[0].name : undefined,
            outcropCategory: e.selectedItems[0]
              ? e.selectedItems[0].outcropCategory
              : undefined,
            outcropId: e.selectedItems[0]
              ? e.selectedItems[0].outcropId
              : undefined,
            region: e.selectedItems[0] ? e.selectedItems[0].region : undefined,
            basin: e.selectedItems[0] ? e.selectedItems[0].basin : undefined,
          };

          setOutcropObject(copyObject);
        }}
        optionDisabled={filterDisabled}
        noOptionsText="No options"
        variant={error.Analogue ? 'error' : undefined}
        helperText={error.Analogue ? error.Analogue : undefined}
      />
      {outcropObject.region?.location ? (
        <>
          {console.log(typeof outcropObject)}
          {console.log(outcropObject)}
          <Autocomplete
            label="Country"
            selectedOptions={[outcropObject.region?.location?.country]}
            initialSelectedOptions={
              outcropObject.region
                ? [outcropObject.region.location?.country]
                : ['']
            }
            options={
              outcropObject.region
                ? [outcropObject.region.location?.country]
                : ['']
            }
            noOptionsText="No options"
            readOnly
          />

          <Autocomplete
            label="Location"
            selectedOptions={[outcropObject.region?.location?.locationName]}
            initialSelectedOptions={
              outcropObject.region
                ? [outcropObject.region?.location?.locationName]
                : ['']
            }
            options={
              outcropObject.region
                ? [outcropObject.region?.location?.locationName]
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
        selectedOptions={
          outcropObject.region?.name ? [outcropObject.region.name] : []
        }
        initialSelectedOptions={
          outcropObject.region?.name ? [outcropObject.region.name] : ['']
        }
        options={
          outcropObject.region?.name ? [outcropObject.region.name] : ['']
        }
        noOptionsText="No options"
        readOnly
      />

      <Autocomplete
        label="Basin"
        selectedOptions={[outcropObject?.basin]}
        initialSelectedOptions={
          outcropObject.basin ? [outcropObject.basin] : ['']
        }
        options={outcropObject.basin ? [outcropObject.basin] : ['']}
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
