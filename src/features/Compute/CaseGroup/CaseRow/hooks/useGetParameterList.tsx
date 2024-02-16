/* eslint-disable max-lines-per-function */

import {
  CreateComputeCaseInputSettingsForm,
  ListComputeSettingsInputValueDto,
  ListComputeSettingsMethodDto,
} from '../../../../../api/generated';

export const useGetParameterList = (
  settingType: string,
  indicatorSettings: ListComputeSettingsMethodDto[] | undefined,
  netToGrossSettings: ListComputeSettingsMethodDto[] | undefined,
  continiousParameterSettings: ListComputeSettingsMethodDto[] | undefined,
  selectedIndicatorParameters: ListComputeSettingsInputValueDto[] | undefined,
  selectedArchelFilter: ListComputeSettingsInputValueDto[] | undefined,
  selectedGrainSize: ListComputeSettingsInputValueDto[] | undefined,
  selectedParameters: ListComputeSettingsInputValueDto[] | undefined,
  selectedVariogramModels: ListComputeSettingsInputValueDto[] | undefined,
) => {
  const addSelectedSettings = (
    setting: ListComputeSettingsInputValueDto[] | undefined,
    settingType: string,
    methodType: string,
  ) => {
    if (setting) {
      let selectedId = undefined;
      switch (settingType) {
        case 'Indicator':
          if (indicatorSettings)
            selectedId = indicatorSettings[0].inputSettings.filter(
              (i) => i.name === methodType,
            )[0].inputSettingTypeId;
          return selectedId;

        case 'Net-To-Gross':
          if (netToGrossSettings)
            selectedId = netToGrossSettings[0].inputSettings.filter(
              (i) => i.name === methodType,
            )[0].inputSettingTypeId;
          return selectedId;

        case 'ContiniousParameter':
          if (continiousParameterSettings)
            selectedId =
              continiousParameterSettings &&
              continiousParameterSettings[0].inputSettings.filter(
                (i) => (i.inputSettingTypeId = setting[0].inputSettingValueId),
              )[0].inputSettingTypeId;
          return selectedId;
      }
    }
  };

  const updateList = (
    setting: ListComputeSettingsInputValueDto[] | undefined,
    settingList: CreateComputeCaseInputSettingsForm[],
    settingType: string,
    methodType: string,
  ) => {
    let newList = [...settingList];
    if (setting) {
      const inputSettingTypeId = addSelectedSettings(
        setting,
        settingType,
        methodType,
      );

      if (inputSettingTypeId)
        setting.forEach((m) => {
          const temp = {
            inputSettingValueId: m.inputSettingValueId,
            inputSettingTypeId: inputSettingTypeId,
          };
          newList = [...newList, temp];
        });
    }
    return newList;
  };

  let inputSettingsList: CreateComputeCaseInputSettingsForm[] = [];

  switch (settingType) {
    case 'Indicator': {
      const firstUpdate = updateList(
        selectedIndicatorParameters,
        inputSettingsList,
        'Indicator',
        'Indicator',
      );

      inputSettingsList = firstUpdate;

      const secondUpdate = updateList(
        selectedVariogramModels,
        inputSettingsList,
        'Indicator',
        'Variogram Family Filter',
      );
      inputSettingsList = secondUpdate;

      break;
    }
    case 'Net-To-Gross': {
      const firstUpdate = updateList(
        selectedGrainSize,
        inputSettingsList,
        'Net-To-Gross',
        'Net-To-Gross',
      );
      inputSettingsList = firstUpdate;

      const secondUpdate = updateList(
        selectedVariogramModels,
        inputSettingsList,
        'Net-To-Gross',
        'Variogram Family Filter',
      );
      inputSettingsList = secondUpdate;

      break;
    }

    case 'ContiniousParameter': {
      const firstUpdate = updateList(
        selectedParameters,
        inputSettingsList,
        'ContiniousParameter',
        'ContiniousParameter',
      );
      inputSettingsList = firstUpdate;

      const secondUpdate = updateList(
        selectedArchelFilter,
        inputSettingsList,
        'ContiniousParameter',
        'Archel',
      );
      inputSettingsList = secondUpdate;

      const thirdUpdate = updateList(
        selectedVariogramModels,
        inputSettingsList,
        'ContiniousParameter',
        'Variogram Family Filter',
      );
      inputSettingsList = thirdUpdate;

      break;
    }
  }

  return { inputSettingsList };
};
