/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  ComputeCaseDto,
  ListComputeSettingsInputDto,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../../api/generated';
import { CaseSettingSelect } from './CaseSettingSelect';
import { ModelAreaSelect } from './ModelAreaSelect';
import * as Styled from './SettingSelect.styled';

export const VariogramOptionSelect = ({
  rowCase,
  modelAreas,
  caseType,
  selectedModelArea,
  selectedIndicatorParameters,
  selectedGrainSize,
  selectedParameters,
  selectedArchelFilter,
  selectedVariogramModels,
  setModelArea,
  setIndicatorParameters,
  setGrainSize,
  setParameters,
  setArchelFilter,
  setVariogramModels,
  NetToGrossSettings,
  ContiniusParameterSettings,
  IndicatorSettings,
  existingCases,
  saved,
  caseError,
}: {
  rowCase: ComputeCaseDto;
  modelAreas: ModelAreaDto[];
  caseType: string;
  selectedModelArea?: ModelAreaDto[] | undefined;
  selectedIndicatorParameters?: ListComputeSettingsInputValueDto[];
  selectedGrainSize?: ListComputeSettingsInputValueDto[];
  selectedParameters?: ListComputeSettingsInputValueDto[];
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
  setParameters?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  setArchelFilter?: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  setVariogramModels: React.Dispatch<
    React.SetStateAction<ListComputeSettingsInputValueDto[] | undefined>
  >;
  IndicatorSettings?: ListComputeSettingsInputDto[];
  NetToGrossSettings?: ListComputeSettingsInputDto[];
  ContiniusParameterSettings?: ListComputeSettingsInputDto[];
  existingCases: ComputeCaseDto[];
  saved: boolean;
  caseError: string;
}) => {
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

  const getDefaultParameters = (
    loadedParameters: ListComputeSettingsInputValueDto[],
    selectedParameter: ListComputeSettingsInputValueDto[] | undefined,
    setParameter: (
      value: React.SetStateAction<
        ListComputeSettingsInputValueDto[] | undefined
      >,
    ) => void,
  ) => {
    let list: ListComputeSettingsInputValueDto[] = [];

    if (loadedParameters !== undefined && selectedParameter === undefined) {
      list = loadedParameters;
      setParameter(loadedParameters);
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

  const selectedParamValue = (method: string) => {
    let settingsValueList: ListComputeSettingsInputValueDto[] | undefined = [];
    let loadedParameters: ListComputeSettingsInputValueDto[] | undefined = [];

    switch (method) {
      case 'Indicator': {
        if (indicatorIndicatorSettings)
          settingsValueList = indicatorIndicatorSettings[0].values;
        break;
      }
      case 'Variogram Family Filter': {
        if (caseType === 'Indicator') {
          if (indicatorFamilySettings)
            settingsValueList = indicatorFamilySettings[0].values;
        } else if (caseType === 'Net-To-Gross') {
          if (NetGrossVariogramFamilySettings)
            settingsValueList = NetGrossVariogramFamilySettings[0].values;
        } else if (caseType === 'ContiniousParameter') {
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

    switch (method) {
      case 'Indicator':
        if (setIndicatorParameters)
          return getDefaultParameters(
            loadedParameters,
            selectedIndicatorParameters,
            setIndicatorParameters,
          );
        break;

      case 'Variogram Family Filter':
        if (setVariogramModels)
          return getDefaultParameters(
            loadedParameters,
            selectedVariogramModels,
            setVariogramModels,
          );
        break;

      case 'Net-To-Gross':
        if (setGrainSize)
          return getDefaultParameters(
            loadedParameters,
            selectedGrainSize,
            setGrainSize,
          );
        break;

      case 'ContiniousParameter':
        if (setParameters)
          return getDefaultParameters(
            loadedParameters,
            selectedParameters,
            setParameters,
          );
        break;

      case 'Archel':
        if (setArchelFilter)
          return getDefaultParameters(
            loadedParameters,
            selectedArchelFilter,
            setArchelFilter,
          );
        break;
    }
  };

  return (
    <Styled.AutocompleteWrapper>
      <ModelAreaSelect
        disableSelect={saved}
        modelAreas={modelAreas}
        selectedModelArea={selectedModelArea}
        setModelArea={setModelArea}
        existingCases={existingCases}
        caseError={caseError}
        caseType="Variogram"
      />

      {setIndicatorParameters && caseType === 'Indicator' && (
        <CaseSettingSelect
          label={'Parameter'}
          options={
            indicatorIndicatorSettings && indicatorIndicatorSettings[0].values
          }
          selectedValue={selectedParamValue && selectedParamValue('Indicator')}
          setValue={setIndicatorParameters}
        />
      )}

      {setGrainSize && caseType === 'Net-To-Gross' && (
        <CaseSettingSelect
          label={'From grain size'}
          settingType="Net-To-Gross"
          options={
            NetGrossGrainSizeSettings && NetGrossGrainSizeSettings[0].values
          }
          selectedValue={
            selectedParamValue && selectedParamValue('Net-To-Gross')
          }
          setValue={setGrainSize}
        />
      )}
      {setParameters && caseType === 'ContiniousParameter' && (
        <CaseSettingSelect
          label={'Parameter'}
          settingType="ContiniousParameter"
          options={
            contParamsParamsSettings && contParamsParamsSettings[0].values
          }
          selectedValue={
            selectedParamValue && selectedParamValue('ContiniousParameter')
          }
          setValue={setParameters}
        />
      )}
      <CaseSettingSelect
        label="Architectural elements filter"
        settingType="Archel"
        options={contParamsArchelSettings && contParamsArchelSettings[0].values}
        selectedValue={selectedParamValue && selectedParamValue('Archel')}
        setValue={setArchelFilter}
        caseType={caseType}
      />
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
          selectedParamValue && selectedParamValue('Variogram Family Filter')
        }
        setValue={setVariogramModels}
      />
    </Styled.AutocompleteWrapper>
  );
};
