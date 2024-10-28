/* eslint-disable max-lines-per-function */
import { useCallback, useState } from 'react';
import { ComputeCaseDto, ModelAreaDto } from '../../../../../api/generated';
import { usePepmContextStore } from '../../../../../hooks/GlobalState';

export const useModelArea = (allCasesList: ComputeCaseDto[]) => {
  const [selectedModelArea, setModelArea] = useState<ModelAreaDto[]>();
  const { analogueModel } = usePepmContextStore();

  const wholeModelObject: ModelAreaDto[] = [
    {
      modelAreaId: '',
      modelAreaType: 'Whole model',
      coordinates: [],
    },
  ];
  const areaList: ModelAreaDto[] =
    analogueModel && analogueModel.modelAreas
      ? analogueModel.modelAreas.concat(wholeModelObject)
      : wholeModelObject;

  const selectedRowArea = useCallback(
    (rowId: string) => {
      const rowCase = allCasesList.filter((c) => c.computeCaseId === rowId);

      // Set default selected area to empty
      let defaultArea: ModelAreaDto[] = [
        {
          modelAreaId: '',
          modelAreaType: '',
          coordinates: [],
        },
      ];

      // 1. Check if the case exists and if the case model area is 'Whole model'
      // 2. Check if the selected area is defined, returns selected model area
      // 3. Check if the case exists, if the case model area is NOT 'Whole model', if selected model area is undefined,
      // and if the existing case model area has an empty string as id. Returns the selected area.
      // 4. Returns the set area. If all 3 above checks is fails the default empty area is returned.

      if (
        rowCase.length > 0 &&
        rowCase[0].modelArea === null &&
        selectedModelArea === undefined
      ) {
        defaultArea = [
          {
            modelAreaId: '',
            modelAreaType: 'Whole model',
            coordinates: [],
          },
        ];
      } else if (selectedModelArea !== undefined) {
        defaultArea = selectedModelArea;
      } else if (
        rowCase.length > 0 &&
        rowCase[0].modelArea !== null &&
        selectedModelArea === undefined &&
        rowCase[0].modelArea.modelAreaId !== ''
      ) {
        defaultArea = areaList.filter(
          (area) => area.modelAreaId === rowCase[0].modelArea.modelAreaId,
        );
        setModelArea(defaultArea);
      }
      return defaultArea;
    },
    [allCasesList, areaList, selectedModelArea],
  );

  return {
    areaList,
    selectedModelArea,
    setModelArea,
    selectedRowArea,
  };
};
