/* eslint-disable max-lines-per-function */
import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { OutcropDto } from '../../../api/generated';
import { useFetchOutcropData } from '../../../hooks/useFetchOutcropData';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { sortList } from '../../../utils/SortList';
import { OutcropType } from '../OutcropAnalogueGroup/OutcropAnalogueGroup';

export const OutcropSelect = ({
  outcropObject,
  outcropGroup,
  setOutcropObject,
}: {
  outcropObject: OutcropType;
  outcropGroup: OutcropDto[];
  setOutcropObject: React.Dispatch<React.SetStateAction<OutcropType>>;
}) => {
  const OutcropData = useFetchOutcropData();
  if (OutcropData.isLoading || !OutcropData.data?.success)
    return <p>Loading .....</p>;

  const filterDisabled = (option: OutcropDto) => {
    const caseExists = outcropGroup.filter(
      (outcrop) => outcrop.outcropId === option.outcropId,
    );
    return caseExists.length > 0;
  };

  return (
    <StyledDialog.AutocompleteList>
      <Autocomplete
        label="Analogue"
        options={sortList(OutcropData.data.data)}
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
    </StyledDialog.AutocompleteList>
  );
};
