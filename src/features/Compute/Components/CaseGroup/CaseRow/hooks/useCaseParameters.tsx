/* eslint-disable max-lines-per-function */

import { useCallback, useEffect, useState } from 'react';
import {
  ComputeCaseDto,
  ComputeMethod,
  InputValueType,
  ListComputeSettingsMethodDto,
  ListComputeSettingsModelDto,
} from '../../../../../../api/generated';
import { Md5 } from 'ts-md5';

export const useCaseParameters = (
  rowCase: ComputeCaseDto,
  allSettings: ListComputeSettingsMethodDto | undefined,
) => {
  const [selectedIndicatorParameters, setIndicatorParameters] =
    useState<ListComputeSettingsModelDto[]>();
  const [selectedGrainSize, setGrainSize] =
    useState<ListComputeSettingsModelDto[]>();
  const [selectedContiniousParameters, setContiniousParameters] =
    useState<ListComputeSettingsModelDto[]>();
  const [selectedArchelFilter, setArchelFilter] =
    useState<ListComputeSettingsModelDto[]>();
  const [selectedVariogramModels, setVariogramModels] =
    useState<ListComputeSettingsModelDto[]>();

  const variogramSettings = allSettings?.variogramComputeSettings;
  const IndicatorSettings =
    variogramSettings &&
    variogramSettings.filter(
      (value) => value.computeMethod === ComputeMethod.INDICATOR,
    );
  const NetToGrossSettings =
    variogramSettings &&
    variogramSettings.filter(
      (value) => value.computeMethod === ComputeMethod.NET_TO_GROSS,
    );
  const ContiniusParameterSettings =
    variogramSettings &&
    variogramSettings.filter(
      (value) => value.computeMethod === ComputeMethod.CONTINIOUS_PARAMETER,
    );

  const filterSettings = (
    setting: ListComputeSettingsModelDto[] | undefined | null,
    inputValueType: string,
  ) => {
    return setting?.filter((value) => value.inputValueType === inputValueType);
  };

  const indicatorFamilySettings = filterSettings(
    IndicatorSettings,
    InputValueType.VARIOGRAM_FAMILY_FILTER,
  );

  const indicatorIndicatorSettings = filterSettings(
    IndicatorSettings,
    InputValueType.INDICATOR,
  );
  const NetGrossGrainSizeSettings = filterSettings(
    NetToGrossSettings,
    InputValueType.NET_TO_GROSS,
  );

  const NetGrossVariogramFamilySettings = filterSettings(
    NetToGrossSettings,
    InputValueType.VARIOGRAM_FAMILY_FILTER,
  );

  const NetGrossArchelSettings = filterSettings(
    NetToGrossSettings,
    InputValueType.ARCHEL,
  );

  const contParamsVariogramFamilySettings = filterSettings(
    ContiniusParameterSettings,
    InputValueType.VARIOGRAM_FAMILY_FILTER,
  );

  const contParamsParamsSettings = filterSettings(
    ContiniusParameterSettings,
    InputValueType.ATTRIBUTE_NAME,
  );

  const contParamsArchelSettings = filterSettings(
    ContiniusParameterSettings,
    InputValueType.ARCHEL,
  );

  const selectedParamValue = useCallback(
    (method: string) => {
      let settingsValueList: ListComputeSettingsModelDto[] | undefined = [];
      let loadedParameters: ListComputeSettingsModelDto[] | undefined = [];

      switch (method) {
        case InputValueType.INDICATOR: {
          if (indicatorIndicatorSettings)
            settingsValueList = indicatorIndicatorSettings;
          break;
        }
        case InputValueType.VARIOGRAM_FAMILY_FILTER: {
          if (rowCase.computeMethod === ComputeMethod.INDICATOR) {
            if (indicatorFamilySettings)
              settingsValueList = indicatorFamilySettings;
          } else if (rowCase.computeMethod === ComputeMethod.NET_TO_GROSS) {
            if (NetGrossVariogramFamilySettings)
              settingsValueList = NetGrossVariogramFamilySettings;
          } else if (
            rowCase.computeMethod === ComputeMethod.CONTINIOUS_PARAMETER
          ) {
            if (contParamsVariogramFamilySettings)
              settingsValueList = contParamsVariogramFamilySettings;
          }
          break;
        }
        case InputValueType.NET_TO_GROSS: {
          if (NetGrossGrainSizeSettings)
            settingsValueList = NetGrossGrainSizeSettings;
          break;
        }

        case InputValueType.ATTRIBUTE_NAME: {
          if (contParamsParamsSettings)
            settingsValueList = contParamsParamsSettings;
          break;
        }
        case InputValueType.ARCHEL: {
          if (rowCase.computeMethod === ComputeMethod.NET_TO_GROSS) {
            if (NetGrossArchelSettings)
              settingsValueList = NetGrossArchelSettings;
          } else if (
            rowCase.computeMethod === ComputeMethod.CONTINIOUS_PARAMETER
          ) {
            if (contParamsArchelSettings)
              settingsValueList = contParamsArchelSettings;
          }
          break;
        }
      }

      loadedParameters =
        settingsValueList &&
        settingsValueList.filter((i) =>
          rowCase.inputSettings?.find(
            (s) =>
              Md5.hashStr(
                s.computeMethod +
                  s.computeType +
                  s.inputValueType +
                  s.value +
                  s.name,
              ) ===
              Md5.hashStr(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                i.computeMethod! +
                  i.computeType +
                  i.inputValueType +
                  i.value +
                  i.name,
              ),
          ),
        );

      return loadedParameters;
    },
    [
      NetGrossGrainSizeSettings,
      NetGrossVariogramFamilySettings,
      NetGrossArchelSettings,
      contParamsArchelSettings,
      contParamsParamsSettings,
      contParamsVariogramFamilySettings,
      indicatorFamilySettings,
      indicatorIndicatorSettings,
      rowCase.computeMethod,
      rowCase.inputSettings,
    ],
  );

  const getDefaultParameters = (
    loadedParameters: ListComputeSettingsModelDto[],
    selectedParameter: ListComputeSettingsModelDto[] | undefined,
    setParameter: (
      value: React.SetStateAction<ListComputeSettingsModelDto[] | undefined>,
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
        case InputValueType.INDICATOR:
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedIndicatorParameters,
              setIndicatorParameters,
            );
          break;

        case InputValueType.VARIOGRAM_FAMILY_FILTER:
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedVariogramModels,
              setVariogramModels,
            );
          break;

        case InputValueType.NET_TO_GROSS:
          if (loaded)
            getDefaultParameters(loaded, selectedGrainSize, setGrainSize);
          break;

        case InputValueType.ATTRIBUTE_NAME:
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedContiniousParameters,
              setContiniousParameters,
            );
          break;

        case InputValueType.ARCHEL:
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
    setIfLoadedValues(InputValueType.INDICATOR);
    setIfLoadedValues(InputValueType.VARIOGRAM_FAMILY_FILTER);
    setIfLoadedValues(InputValueType.NET_TO_GROSS);
    setIfLoadedValues(InputValueType.ATTRIBUTE_NAME);
    setIfLoadedValues(InputValueType.ARCHEL);
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
