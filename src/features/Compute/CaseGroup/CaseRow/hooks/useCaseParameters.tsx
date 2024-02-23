/* eslint-disable max-lines-per-function */

import { useCallback, useEffect, useState } from 'react';
import {
  ComputeCaseDto,
  ListComputeSettingsInputDto,
  ListComputeSettingsInputValueDto,
  ListComputeSettingsMethodDto,
} from '../../../../../api/generated';

export const useCaseParameters = (
  rowCase: ComputeCaseDto,
  indicatorSettings: ListComputeSettingsMethodDto[] | undefined,
  netToGrossSettings: ListComputeSettingsMethodDto[] | undefined,
  continiousParameterSettings: ListComputeSettingsMethodDto[] | undefined,
) => {
  const [selectedIndicatorParameters, setIndicatorParameters] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedGrainSize, setGrainSize] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedContiniousParameters, setContiniousParameters] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedArchelFilter, setArchelFilter] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedVariogramModels, setVariogramModels] =
    useState<ListComputeSettingsInputValueDto[]>();

  const IndicatorSettings =
    indicatorSettings && indicatorSettings[0].inputSettings;
  const NetToGrossSettings =
    netToGrossSettings && netToGrossSettings[0].inputSettings;
  const ContiniusParameterSettings =
    continiousParameterSettings && continiousParameterSettings[0].inputSettings;

  const filterSettings = (
    setting: ListComputeSettingsInputDto[] | undefined,
    method: string,
  ) => {
    return setting?.filter((value) => value.name === method);
  };

  const indicatorFamilySettings = filterSettings(
    IndicatorSettings,
    'Variogram Family Filter',
  );

  const indicatorIndicatorSettings = filterSettings(
    IndicatorSettings,
    'Indicator',
  );
  const NetGrossGrainSizeSettings = filterSettings(
    NetToGrossSettings,
    'Net-To-Gross',
  );

  const NetGrossVariogramFamilySettings = filterSettings(
    NetToGrossSettings,
    'Variogram Family Filter',
  );

  const contParamsVariogramFamilySettings = filterSettings(
    ContiniusParameterSettings,
    'Variogram Family Filter',
  );

  const contParamsParamsSettings = filterSettings(
    ContiniusParameterSettings,
    'ContiniousParameter',
  );

  const contParamsArchelSettings = filterSettings(
    ContiniusParameterSettings,
    'Archel',
  );

  const selectedParamValue = useCallback(
    (method: string) => {
      let settingsValueList: ListComputeSettingsInputValueDto[] | undefined =
        [];
      let loadedParameters: ListComputeSettingsInputValueDto[] | undefined = [];

      switch (method) {
        case 'Indicator': {
          if (indicatorIndicatorSettings)
            settingsValueList = indicatorIndicatorSettings[0].values;
          break;
        }
        case 'Variogram Family Filter': {
          if (rowCase.computeMethod.name === 'Indicator') {
            if (indicatorFamilySettings)
              settingsValueList = indicatorFamilySettings[0].values;
          } else if (rowCase.computeMethod.name === 'Net-To-Gross') {
            if (NetGrossVariogramFamilySettings)
              settingsValueList = NetGrossVariogramFamilySettings[0].values;
          } else if (rowCase.computeMethod.name === 'ContiniousParameter') {
            if (contParamsVariogramFamilySettings)
              settingsValueList = contParamsVariogramFamilySettings[0].values;
          }
          break;
        }
        case 'Net-To-Gross': {
          if (NetGrossGrainSizeSettings)
            settingsValueList = NetGrossGrainSizeSettings[0].values;
          break;
        }

        case 'ContiniousParameter': {
          if (contParamsParamsSettings)
            settingsValueList = contParamsParamsSettings[0].values;
          break;
        }
        case 'Archel': {
          if (contParamsArchelSettings)
            settingsValueList = contParamsArchelSettings[0].values;
          break;
        }
      }

      loadedParameters =
        settingsValueList &&
        settingsValueList.filter((i) =>
          rowCase.inputSettings?.find(
            (s) => s.inputSettingValueId === i.inputSettingValueId,
          ),
        );

      return loadedParameters;
    },
    [
      NetGrossGrainSizeSettings,
      NetGrossVariogramFamilySettings,
      contParamsArchelSettings,
      contParamsParamsSettings,
      contParamsVariogramFamilySettings,
      indicatorFamilySettings,
      indicatorIndicatorSettings,
      rowCase.computeMethod.name,
      rowCase.inputSettings,
    ],
  );

  const getDefaultParameters = (
    loadedParameters: ListComputeSettingsInputValueDto[],
    selectedParameter: ListComputeSettingsInputValueDto[] | undefined,
    setParameter: (
      value: React.SetStateAction<
        ListComputeSettingsInputValueDto[] | undefined
      >,
    ) => void,
  ) => {
    if (selectedParameter === undefined) {
      setParameter(loadedParameters);
    }
  };

  const setIfLoadedValues = useCallback(
    (method: string) => {
      const loaded = selectedParamValue(method);
      switch (method) {
        case 'Indicator':
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedIndicatorParameters,
              setIndicatorParameters,
            );
          break;

        case 'Variogram Family Filter':
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedVariogramModels,
              setVariogramModels,
            );
          break;

        case 'Net-To-Gross':
          if (loaded)
            getDefaultParameters(loaded, selectedGrainSize, setGrainSize);
          break;

        case 'ContiniousParameter':
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedContiniousParameters,
              setContiniousParameters,
            );
          break;

        case 'Archel':
          if (loaded)
            getDefaultParameters(loaded, selectedArchelFilter, setArchelFilter);
          break;
      }
    },
    [
      selectedArchelFilter,
      selectedGrainSize,
      selectedIndicatorParameters,
      selectedParamValue,
      selectedContiniousParameters,
      selectedVariogramModels,
    ],
  );

  useEffect(() => {
    setIfLoadedValues('Indicator');
    setIfLoadedValues('Variogram Family Filter');
    setIfLoadedValues('Net-To-Gross');
    setIfLoadedValues('ContiniousParameter');
    setIfLoadedValues('Archel');
  }, [setIfLoadedValues]);

  return {
    selectedIndicatorParameters,
    selectedGrainSize,
    selectedContiniousParameters,
    selectedArchelFilter,
    selectedVariogramModels,
    setIndicatorParameters,
    setGrainSize,
    setContiniousParameters,
    setArchelFilter,
    setVariogramModels,
    selectedValues: selectedParamValue,
  };
};
