/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { OutcropDto } from '../../../api/generated';
import { useFetchOutcropData } from '../../../hooks/useFetchOutcropData';
import { OutcropType } from '../OutcropAnalogueGroup/OutcropAnalogueGroup';

export const OutcropSelect = ({
  outcropObject,
  setOutcropObject,
}: {
  outcropObject: OutcropType;
  setOutcropObject: React.Dispatch<React.SetStateAction<OutcropType>>;
}) => {
  const OutcropData = useFetchOutcropData();
  if (OutcropData.isLoading || !OutcropData.data?.success)
    return <p>Loading .....</p>;

  return (
    <div>
      <Autocomplete
        label="Analogue"
        options={OutcropData.data.data}
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
        noOptionsText="No options"
      />

      <Autocomplete
        label="Region"
        selectedOptions={[outcropObject.region]}
        initialSelectedOptions={
          outcropObject.region ? [outcropObject.region] : ['']
        }
        options={
          outcropObject.region !== undefined ? [outcropObject.region] : ['']
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
    </div>
  );
};
