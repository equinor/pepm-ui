/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Icon } from '@equinor/eds-core-react';
import { expand as EXPAND } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  ComputeCaseDto,
  ComputeMethod,
  InputValueType,
  ListComputeSettingsModelDto,
  ModelAreaDto,
} from '../../../../../api/generated';
import { CaseSettingSelect } from '../CaseSettingSelects/CaseSettingSelect';
import { ModelAreaSelect } from '../CaseSettingSelects/ModelAreaSelect';
import * as Styled from '../CaseSettingSelects/SettingSelect.styled';
import { ViewSelectedVariogramSettings } from '../ViewSelectedVariogramSettings/ViewSelectedVariogramSettings';
import { Variants } from '@equinor/eds-core-react/dist/types/components/types';
import { useCaseRowStore } from '../../../../../stores/CaseRowStore';

export const VariogramOptionSelect = ({
  rowCase,
  modelAreas,
  caseType,
  selectedModelArea,
  selectedIndicatorParameters,
  selectedGrainSize,
  selectedContiniousParameters,
  selectedArchelFilter,
  selectedVariogramModels,
  setModelArea,
  setIndicatorParameters,
  setGrainSize,
  setContiniousParameters,
  setArchelFilter,
  setVariogramModels,
  NetGrossGrainSizeSettings,
  NetGrossVariogramFamilySettings,
  NetGrossArchelSettings,
  contParamsVariogramFamilySettings,
  contParamsParamsSettings,
  contParamsArchelSettings,
  indicatorFamilySettings,
  indicatorIndicatorSettings,
  existingCases,
  saved,
  selectedParamValue,
}: {
  rowCase: ComputeCaseDto;
  modelAreas: ModelAreaDto[];
  caseType: ComputeMethod;
  selectedModelArea?: ModelAreaDto[] | undefined;
  selectedIndicatorParameters?: ListComputeSettingsModelDto[];
  selectedGrainSize?: ListComputeSettingsModelDto[];
  selectedContiniousParameters?: ListComputeSettingsModelDto[];
  selectedArchelFilter?: ListComputeSettingsModelDto[] | undefined;
  selectedVariogramModels: ListComputeSettingsModelDto[] | undefined;

  setModelArea?: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
  setIndicatorParameters?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
  setGrainSize?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
  setContiniousParameters?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
  setArchelFilter?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
  setVariogramModels: React.Dispatch<
    React.SetStateAction<ListComputeSettingsModelDto[] | undefined>
  >;
  indicatorFamilySettings?: ListComputeSettingsModelDto[] | undefined;
  indicatorIndicatorSettings?: ListComputeSettingsModelDto[] | undefined;
  NetGrossGrainSizeSettings?: ListComputeSettingsModelDto[] | undefined;
  NetGrossVariogramFamilySettings?: ListComputeSettingsModelDto[] | undefined;
  NetGrossArchelSettings?: ListComputeSettingsModelDto[] | undefined;
  contParamsVariogramFamilySettings?: ListComputeSettingsModelDto[] | undefined;
  contParamsParamsSettings?: ListComputeSettingsModelDto[] | undefined;
  contParamsArchelSettings?: ListComputeSettingsModelDto[] | undefined;
  existingCases: ComputeCaseDto[];
  saved: boolean;
  selectedParamValue: (method: string) => ListComputeSettingsModelDto[];
}) => {
  const [expandSettings, setExpandSettings] = useState<boolean>(false);
  const {
    indicatorParams,
    indicatorVariogramModel,
    netToGrossGrain,
    netToGrossVariogramModel,
    contParamParameters,
    contParamArchel,
    contParamVariogramModel,
    indicatorModelArea,
    netToGrossModelArea,
    contParamModelArea,
  } = useCaseRowStore();

  const getDefaultParameters = (
    loadedParameters: ListComputeSettingsModelDto[],
    selectedParameter: ListComputeSettingsModelDto[] | undefined,
  ) => {
    let list: ListComputeSettingsModelDto[] = [];

    if (loadedParameters !== undefined && selectedParameter === undefined) {
      list = loadedParameters;
    } else if (
      selectedParameter !== undefined &&
      loadedParameters === undefined
    ) {
      list = selectedParameter;
    } else if (
      selectedParameter !== undefined &&
      loadedParameters !== undefined
    ) {
      list = selectedParameter;
    }
    return list;
  };

  const setIfLoadedValues = (inputValueType: InputValueType) => {
    const loaded = selectedParamValue(inputValueType);
    switch (inputValueType) {
      case InputValueType.INDICATOR:
        if (loaded)
          return getDefaultParameters(loaded, selectedIndicatorParameters);
        break;

      case InputValueType.VARIOGRAM_FAMILY_FILTER:
        return getDefaultParameters(loaded, selectedVariogramModels);

      case InputValueType.NET_TO_GROSS:
        if (loaded) return getDefaultParameters(loaded, selectedGrainSize);
        break;

      case InputValueType.ATTRIBUTE_NAME:
        if (loaded)
          return getDefaultParameters(loaded, selectedContiniousParameters);
        break;

      case InputValueType.ARCHEL:
        if (loaded) return getDefaultParameters(loaded, selectedArchelFilter);

        break;
    }
  };

  const handleExpandView = () => {
    setExpandSettings(!expandSettings);
  };

  const modelAreaVariant = (): Variants | undefined => {
    if (
      caseType === ComputeMethod.INDICATOR &&
      selectedModelArea?.filter((c) => c.modelAreaType !== '').length === 0 &&
      indicatorModelArea
    ) {
      return 'error';
    }
    if (
      caseType === ComputeMethod.NET_TO_GROSS &&
      selectedModelArea?.filter((c) => c.modelAreaType !== '').length === 0 &&
      netToGrossModelArea
    ) {
      return 'error';
    }
    if (
      caseType === ComputeMethod.CONTINIOUS_PARAMETER &&
      selectedModelArea?.filter((c) => c.modelAreaType !== '').length === 0 &&
      contParamModelArea
    ) {
      return 'error';
    }
    return undefined;
  };

  const parameterVariant = (): Variants | undefined => {
    if (
      caseType === ComputeMethod.INDICATOR &&
      selectedIndicatorParameters?.filter(
        (c) => c.inputValueType === InputValueType.INDICATOR,
      ).length === 0 &&
      indicatorParams
    )
      return 'error';

    if (
      caseType === ComputeMethod.NET_TO_GROSS &&
      selectedGrainSize?.filter(
        (c) => c.inputValueType === InputValueType.NET_TO_GROSS,
      ).length === 0 &&
      netToGrossGrain
    )
      return 'error';

    if (
      caseType === ComputeMethod.CONTINIOUS_PARAMETER &&
      selectedContiniousParameters?.filter(
        (c) => c.inputValueType === InputValueType.ATTRIBUTE_NAME,
      ).length === 0 &&
      contParamParameters
    )
      return 'error';

    return undefined;
  };

  const variogramModelVariant = (): Variants | undefined => {
    if (
      caseType === ComputeMethod.INDICATOR &&
      selectedVariogramModels?.filter((c) => c.computeSettingId !== '')
        .length === 0 &&
      indicatorVariogramModel
    ) {
      return 'error';
    }
    if (
      caseType === ComputeMethod.NET_TO_GROSS &&
      selectedVariogramModels?.filter((c) => c.computeSettingId !== '')
        .length === 0 &&
      netToGrossVariogramModel
    ) {
      return 'error';
    }
    if (
      caseType === ComputeMethod.CONTINIOUS_PARAMETER &&
      selectedVariogramModels?.filter((c) => c.computeSettingId !== '')
        .length === 0 &&
      contParamVariogramModel
    ) {
      return 'error';
    }
    return undefined;
  };

  const archelFilterVariant = (): Variants | undefined => {
    if (
      caseType === ComputeMethod.CONTINIOUS_PARAMETER &&
      selectedArchelFilter?.filter((c) => c.computeSettingId !== '').length ===
        0 &&
      contParamArchel
    ) {
      return 'error';
    }
    return undefined;
  };

  return (
    <Styled.AutocompleteWrapper>
      <Styled.ButtonWrapper>
        <Button
          variant="ghost_icon"
          aria-label="remove"
          onClick={handleExpandView}
        >
          <Icon data={EXPAND} size={24}></Icon>
        </Button>
      </Styled.ButtonWrapper>
      <ViewSelectedVariogramSettings
        expandSettings={expandSettings}
        selectedModelArea={selectedModelArea}
      >
        <ModelAreaSelect
          disableSelect={saved}
          modelAreas={modelAreas}
          selectedModelArea={selectedModelArea}
          setModelArea={setModelArea}
          existingCases={existingCases}
          caseType="Variogram"
          variant={modelAreaVariant()}
        />
      </ViewSelectedVariogramSettings>

      {setIndicatorParameters && caseType === ComputeMethod.INDICATOR && (
        <ViewSelectedVariogramSettings
          expandSettings={expandSettings}
          selecteSettings={
            setIfLoadedValues && setIfLoadedValues(InputValueType.INDICATOR)
          }
        >
          <CaseSettingSelect
            label={'Parameter'}
            options={indicatorIndicatorSettings}
            caseMethod={rowCase.computeMethod}
            settingType={InputValueType.INDICATOR}
            selectedValue={
              setIfLoadedValues && setIfLoadedValues(InputValueType.INDICATOR)
            }
            setValue={setIndicatorParameters}
            variant={parameterVariant()}
          />
        </ViewSelectedVariogramSettings>
      )}

      {setGrainSize && caseType === ComputeMethod.NET_TO_GROSS && (
        <ViewSelectedVariogramSettings
          expandSettings={expandSettings}
          selecteSettings={
            setIfLoadedValues && setIfLoadedValues(InputValueType.NET_TO_GROSS)
          }
        >
          <CaseSettingSelect
            label={'From grain size'}
            settingType={InputValueType.NET_TO_GROSS}
            caseMethod={rowCase.computeMethod}
            options={NetGrossGrainSizeSettings}
            selectedValue={
              setIfLoadedValues &&
              setIfLoadedValues(InputValueType.NET_TO_GROSS)
            }
            setValue={setGrainSize}
            variant={parameterVariant()}
          />
        </ViewSelectedVariogramSettings>
      )}
      {setContiniousParameters &&
        caseType === ComputeMethod.CONTINIOUS_PARAMETER && (
          <ViewSelectedVariogramSettings
            expandSettings={expandSettings}
            selecteSettings={
              setIfLoadedValues &&
              setIfLoadedValues(InputValueType.ATTRIBUTE_NAME)
            }
          >
            <CaseSettingSelect
              label={'Parameter'}
              settingType={InputValueType.ATTRIBUTE_NAME}
              caseMethod={rowCase.computeMethod}
              options={contParamsParamsSettings}
              selectedValue={
                setIfLoadedValues &&
                setIfLoadedValues(InputValueType.ATTRIBUTE_NAME)
              }
              setValue={setContiniousParameters}
              variant={parameterVariant()}
            />
          </ViewSelectedVariogramSettings>
        )}
      <ViewSelectedVariogramSettings
        expandSettings={expandSettings}
        selecteSettings={
          setIfLoadedValues && setIfLoadedValues(InputValueType.ARCHEL)
        }
      >
        <CaseSettingSelect
          label="Architectural elements filter"
          settingType={InputValueType.ARCHEL}
          caseMethod={rowCase.computeMethod}
          options={
            caseType === ComputeMethod.NET_TO_GROSS
              ? NetGrossArchelSettings
              : contParamsArchelSettings
          }
          selectedValue={
            setIfLoadedValues && setIfLoadedValues(InputValueType.ARCHEL)
          }
          setValue={setArchelFilter}
          variant={archelFilterVariant()}
        />
      </ViewSelectedVariogramSettings>

      <ViewSelectedVariogramSettings
        expandSettings={expandSettings}
        selecteSettings={
          setIfLoadedValues &&
          setIfLoadedValues(InputValueType.VARIOGRAM_FAMILY_FILTER)
        }
      >
        <CaseSettingSelect
          label={'Variogram model'}
          settingType={InputValueType.VARIOGRAM_FAMILY_FILTER}
          caseMethod={rowCase.computeMethod}
          options={
            caseType === ComputeMethod.NET_TO_GROSS
              ? NetGrossVariogramFamilySettings
              : caseType === ComputeMethod.INDICATOR
              ? indicatorFamilySettings
              : contParamsVariogramFamilySettings
          }
          selectedValue={
            setIfLoadedValues &&
            setIfLoadedValues(InputValueType.VARIOGRAM_FAMILY_FILTER)
          }
          setValue={setVariogramModels}
          variant={variogramModelVariant()}
        />
      </ViewSelectedVariogramSettings>
    </Styled.AutocompleteWrapper>
  );
};
