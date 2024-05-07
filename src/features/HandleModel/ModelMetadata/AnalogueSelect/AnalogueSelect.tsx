/* eslint-disable max-lines-per-function */
/* eslint-disable react/prop-types */

import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { AnalogueList, AnalogueModelDetail } from '../../../../api/generated';

export const AnalogueSelect = ({
  errors,
  data,
  metadata,
  setMetadata,
}: {
  errors: string | undefined;
  data: AnalogueList[];
  metadata: AnalogueModelDetail;
  setMetadata: (metadata: AnalogueModelDetail) => void;
}) => {
  const emptyOption: AnalogueList[] = [
    {
      analogueId: 'Analogue',
      name: 'NoRelevant',
      description: 'Not relevant',
    },
  ];

  const selectedOptions =
    metadata.analogues.length > 0 ? metadata.analogues : emptyOption;

  const optionList: AnalogueList[] =
    data.length > 0 ? emptyOption.concat(data) : emptyOption;

  const intersection = optionList.filter(
    (a) =>
      selectedOptions &&
      selectedOptions.some((b) => JSON.stringify(a) === JSON.stringify(b)),
  );

  function handleAddMetadata(e: AutocompleteChanges<AnalogueList>) {
    const removeNotSelected = e.selectedItems.filter(
      (i) => i.analogueId !== 'Analogue',
    );
    const newList = [...removeNotSelected];

    setMetadata({
      ...metadata,
      analogues: [...newList],
    });
  }

  return (
    <Autocomplete
      variant={errors ? 'error' : undefined}
      label="Analogue"
      options={optionList}
      optionLabel={(option) => option.name}
      multiple
      initialSelectedOptions={
        intersection.length === 0 ? emptyOption : intersection
      }
      onOptionsChange={(e: AutocompleteChanges<AnalogueList>) =>
        handleAddMetadata(e)
      }
    />
  );
};
