/* eslint-disable max-lines-per-function */

import {
  ComputeMethod,
  ListComputeSettingsModelDto,
} from '../../../../../../api/generated';

export const useGetParameterList = (
  computeMethod: ComputeMethod,
  indicatorSettings: ListComputeSettingsModelDto[] | undefined,
  netToGrossSettings: ListComputeSettingsModelDto[] | undefined,
  continiousParameterSettings: ListComputeSettingsModelDto[] | undefined,
  selectedIndicatorParameters: ListComputeSettingsModelDto[] | undefined,
  selectedArchelFilter: ListComputeSettingsModelDto[] | undefined,
  selectedGrainSize: ListComputeSettingsModelDto[] | undefined,
  selectedContiniousParameters: ListComputeSettingsModelDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined,
) => {
  const updateList = (
    setting: ListComputeSettingsModelDto[] | undefined,
    settingList: string[],
  ) => {
    let newList = [...settingList];
    if (setting && setting.length > 0) {
      setting.forEach((m) => {
        if (m.computeSettingId) newList = [...newList, m.computeSettingId];
      });
    }
    return newList;
  };

  let inputSettingsList: string[] = [];

  switch (computeMethod) {
    case ComputeMethod.INDICATOR: {
      const firstUpdate = updateList(
        selectedIndicatorParameters?.concat(selectedVariogramModels ?? []),
        inputSettingsList,
      );

      inputSettingsList = firstUpdate;
      break;
    }
    case ComputeMethod.NET_TO_GROSS: {
      const firstUpdate = updateList(
        selectedGrainSize?.concat(
          selectedArchelFilter ?? [],
          selectedVariogramModels ?? [],
        ),
        inputSettingsList,
      );
      inputSettingsList = firstUpdate;
      break;
    }

    case ComputeMethod.CONTINIOUS_PARAMETER: {
      const firstUpdate = updateList(
        selectedContiniousParameters?.concat(
          selectedArchelFilter ?? [],
          selectedVariogramModels ?? [],
        ),
        inputSettingsList,
      );
      inputSettingsList = firstUpdate;
      break;
    }
  }

  return { inputSettingsList };
};
