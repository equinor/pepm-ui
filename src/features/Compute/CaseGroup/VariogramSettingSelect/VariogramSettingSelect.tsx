/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Icon } from '@equinor/eds-core-react';
import { expand as EXPAND } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  ComputeCaseDto,
  ListComputeSettingsInputDto,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../../api/generated';
import { CaseSettingSelect } from '../CaseSettingSelects/CaseSettingSelect';
import { ModelAreaSelect } from '../CaseSettingSelects/ModelAreaSelect';
import * as Styled from '../CaseSettingSelects/SettingSelect.styled';
import { ViewSelectedVariogramSettings } from '../ViewSelectedVariogramSettings/ViewSelectedVariogramSettings';

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
  contParamsVariogramFamilySettings,
  contParamsParamsSettings,
  contParamsArchelSettings,
  indicatorFamilySettings,
  indicatorIndicatorSettings,
  existingCases,
  saved,
  caseError,
  selectedParamValue,
  isOwner,
}: {
  rowCase: ComputeCaseDto;
  modelAreas: ModelAreaDto[];
  caseType: string;
  selectedModelArea?: ModelAreaDto[] | undefined;
  selectedIndicatorParameters?: ListComputeSettingsInputValueDto[];
  selectedGrainSize?: ListComputeSettingsInputValueDto[];
  selectedContiniousParameters?: ListComputeSettingsInputValueDto[];
  selectedArchelFilter?: ListComputeSettingsInputValueDto[] | undefined;
  selectedVariogramModels: ListComputeSettingsInputValueDto[] | undefined;

  setModelArea?: React.Dispatch<
    React.SetStateAction<ModelAreaDto[] | undefined>
  >;
  setIndicatorParameters?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  setGrainSize?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  setContiniousParameters?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  setArchelFilter?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  setVariogramModels: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  indicatorFamilySettings?: ListComputeSettingsInputDto[] | undefined;
  indicatorIndicatorSettings?: ListComputeSettingsInputDto[] | undefined;
  NetGrossGrainSizeSettings?: ListComputeSettingsInputDto[] | undefined;
  NetGrossVariogramFamilySettings?: ListComputeSettingsInputDto[] | undefined;
  contParamsVariogramFamilySettings?: ListComputeSettingsInputDto[] | undefined;
  contParamsParamsSettings?: ListComputeSettingsInputDto[] | undefined;
  contParamsArchelSettings?: ListComputeSettingsInputDto[] | undefined;
  existingCases: ComputeCaseDto[];
  saved: boolean;
  caseError: string;
  selectedParamValue: (method: string) => ListComputeSettingsInputValueDto[];
  isOwner: () => boolean;
}) => {
  const [expandSettings, setExpandSettings] = useState<boolean>(false);

  const getDefaultParameters = (
    loadedParameters: ListComputeSettingsInputValueDto[],
    selectedParameter: ListComputeSettingsInputValueDto[] | undefined,
  ) => {
    let list: ListComputeSettingsInputValueDto[] = [];

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

  const setIfLoadedValues = (method: string) => {
    const loaded = selectedParamValue(method);
    switch (method) {
      case 'Indicator':
        if (loaded)
          return getDefaultParameters(loaded, selectedIndicatorParameters);
        break;

      case 'Variogram Family Filter':
        return getDefaultParameters(loaded, selectedVariogramModels);

      case 'Net-To-Gross':
        if (loaded) return getDefaultParameters(loaded, selectedGrainSize);
        break;

      case 'ContiniousParameter':
        if (loaded)
          return getDefaultParameters(loaded, selectedContiniousParameters);
        break;

      case 'Archel':
        if (loaded) return getDefaultParameters(loaded, selectedArchelFilter);

        break;
    }
  };

  const handleExpandView = () => {
    setExpandSettings(!expandSettings);
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
          caseError={caseError}
          caseType="Variogram"
          isOwner={isOwner}
        />
      </ViewSelectedVariogramSettings>

      {setIndicatorParameters && caseType === 'Indicator' && (
        <ViewSelectedVariogramSettings
          expandSettings={expandSettings}
          selecteSettings={setIfLoadedValues && setIfLoadedValues('Indicator')}
        >
          <CaseSettingSelect
            label={'Parameter'}
            options={
              indicatorIndicatorSettings && indicatorIndicatorSettings[0].values
            }
            selectedValue={setIfLoadedValues && setIfLoadedValues('Indicator')}
            setValue={setIndicatorParameters}
            isOwner={isOwner}
          />
        </ViewSelectedVariogramSettings>
      )}

      {setGrainSize && caseType === 'Net-To-Gross' && (
        <ViewSelectedVariogramSettings
          expandSettings={expandSettings}
          selecteSettings={
            setIfLoadedValues && setIfLoadedValues('Net-To-Gross')
          }
        >
          <CaseSettingSelect
            label={'From grain size'}
            settingType="Net-To-Gross"
            options={
              NetGrossGrainSizeSettings && NetGrossGrainSizeSettings[0].values
            }
            selectedValue={
              setIfLoadedValues && setIfLoadedValues('Net-To-Gross')
            }
            setValue={setGrainSize}
            isOwner={isOwner}
          />
        </ViewSelectedVariogramSettings>
      )}
      {setContiniousParameters && caseType === 'ContiniousParameter' && (
        <ViewSelectedVariogramSettings
          expandSettings={expandSettings}
          selecteSettings={
            setIfLoadedValues && setIfLoadedValues('ContiniousParameter')
          }
        >
          <CaseSettingSelect
            label={'Parameter'}
            settingType="ContiniousParameter"
            options={
              contParamsParamsSettings && contParamsParamsSettings[0].values
            }
            selectedValue={
              setIfLoadedValues && setIfLoadedValues('ContiniousParameter')
            }
            setValue={setContiniousParameters}
            isOwner={isOwner}
          />
        </ViewSelectedVariogramSettings>
      )}
      <ViewSelectedVariogramSettings
        expandSettings={expandSettings}
        selecteSettings={setIfLoadedValues && setIfLoadedValues('Archel')}
      >
        <CaseSettingSelect
          label="Architectural elements filter"
          settingType="Archel"
          options={
            contParamsArchelSettings && contParamsArchelSettings[0].values
          }
          selectedValue={setIfLoadedValues && setIfLoadedValues('Archel')}
          setValue={setArchelFilter}
          caseType={caseType}
          isOwner={isOwner}
        />
      </ViewSelectedVariogramSettings>

      <ViewSelectedVariogramSettings
        expandSettings={expandSettings}
        selecteSettings={
          setIfLoadedValues && setIfLoadedValues('Variogram Family Filter')
        }
      >
        <CaseSettingSelect
          label={'Variogram model'}
          options={
            caseType === 'Net-To-Gross'
              ? NetGrossVariogramFamilySettings &&
                NetGrossVariogramFamilySettings[0].values
              : caseType === 'Indicator'
              ? indicatorFamilySettings && indicatorFamilySettings[0].values
              : contParamsVariogramFamilySettings &&
                contParamsVariogramFamilySettings[0].values
          }
          selectedValue={
            setIfLoadedValues && setIfLoadedValues('Variogram Family Filter')
          }
          setValue={setVariogramModels}
          isOwner={isOwner}
        />
      </ViewSelectedVariogramSettings>
    </Styled.AutocompleteWrapper>
  );
};
