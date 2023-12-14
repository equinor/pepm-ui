import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import { ModelAreaDto } from '../../../../../api/generated';

export const ModelAreaSelect = ({
  modelAreas,
  selectedModelArea,
  setModelArea,
}: {
  modelAreas: ModelAreaDto[];
  selectedModelArea?: ModelAreaDto[] | undefined;
  setModelArea: React.Dispatch<React.SetStateAction<ModelAreaDto[]>>;
}) => {
  const wholeModelObject: ModelAreaDto = {
    modelAreaId: '',
    modelAreaType: 'Whole Model',
    coordinates: [],
  };

  const areaList: ModelAreaDto[] = modelAreas.concat(wholeModelObject);
  return (
    <Autocomplete
      label="Model area"
      options={
        modelAreas && modelAreas.length > 0
          ? areaList
          : [
              {
                modelAreaId: '',
                modelAreaType: 'Whole Model',
                coordinates: [],
              },
            ]
      }
      selectedOptions={selectedModelArea}
      optionLabel={(modelArea) => modelArea.modelAreaType}
      onOptionsChange={(changes: AutocompleteChanges<ModelAreaDto>) =>
        setModelArea(changes.selectedItems)
      }
    ></Autocomplete>
  );
};
