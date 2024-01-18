/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  ComputeCaseDto,
  ListComputeSettingsInputDto,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../../api/generated';
import * as Styled from './CaseOptionSelects.styled';
import { CaseSettingSelect } from './CaseSettingSelect/CaseSettingSelect';
import { ModelAreaSelect } from './ModelAreaSelect/ModelAreaSelect';

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
  // TODO: Case Error handling
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Lage en funksjon som tar inn Liste og Name
  const indicatorFamilySettings = IndicatorSettings?.filter(
    (value) => value.name === 'Variogram Family Filter',
  );
  const indicatorIndicatorSettings = IndicatorSettings?.filter(
    (value) => value.name === 'Indicator',
  );

  const NetGrossGrainSizeSettings = NetToGrossSettings?.filter(
    (value) => value.name === 'Net-To-Gross',
  );
  const NetGrossVariogramFamilySettings = NetToGrossSettings?.filter(
    (value) => value.name === 'Variogram Family Filter',
  );
  const contParamsVariogramFamilySettings = ContiniusParameterSettings?.filter(
    (value) => value.name === 'Variogram Family Filter',
  );
  const contParamsParamsSettings = ContiniusParameterSettings?.filter(
    (value) => value.name === 'ContiniousParameter',
  );
  const contParamsArchelSettings = ContiniusParameterSettings?.filter(
    (value) => value.name === 'Archel',
  );

  // TODO: Refactor method to reusable function
  const selectedParamValue = (method: string) => {
    let settingsValueList: ListComputeSettingsInputValueDto[] | undefined = [];
    let loadedParameters: ListComputeSettingsInputValueDto[] | undefined = [];

    if (method === 'Indicator') {
      settingsValueList =
        indicatorIndicatorSettings && indicatorIndicatorSettings[0].values;
    } else if (
      method === 'Variogram Family Filter' &&
      caseType === 'Indicator'
    ) {
      settingsValueList =
        indicatorFamilySettings && indicatorFamilySettings[0].values;
    } else if (method === 'Net-To-Gross') {
      settingsValueList =
        NetGrossGrainSizeSettings && NetGrossGrainSizeSettings[0].values;
    } else if (
      method === 'Variogram Family Filter' &&
      caseType === 'Net-To-Gross'
    ) {
      settingsValueList =
        NetGrossVariogramFamilySettings &&
        NetGrossVariogramFamilySettings[0].values;
    } else if (
      method === 'Variogram Family Filter' &&
      caseType === 'ContiniousParameter'
    ) {
      settingsValueList =
        contParamsVariogramFamilySettings &&
        contParamsVariogramFamilySettings[0].values;
    } else if (method === 'ContiniousParameter') {
      settingsValueList =
        contParamsParamsSettings && contParamsParamsSettings[0].values;
    } else if (method === 'Archel') {
      settingsValueList =
        contParamsArchelSettings && contParamsArchelSettings[0].values;
    }

    loadedParameters =
      settingsValueList &&
      settingsValueList.filter((i) =>
        rowCase.inputSettings?.find(
          (s) => s.inputSettingValueId === i.inputSettingValueId,
        ),
      );

    let defaultParameter: ListComputeSettingsInputValueDto[] = [];

    if (method === 'Indicator' && loadedParameters && setIndicatorParameters) {
      if (
        loadedParameters !== undefined &&
        selectedIndicatorParameters === undefined
      ) {
        defaultParameter = loadedParameters;
        setIndicatorParameters(loadedParameters);
      } else if (
        selectedIndicatorParameters !== undefined &&
        loadedParameters === undefined
      ) {
        defaultParameter = selectedIndicatorParameters;
      } else if (
        selectedIndicatorParameters !== undefined &&
        loadedParameters !== undefined
      ) {
        defaultParameter = selectedIndicatorParameters;
      }
      return defaultParameter;
    } else if (method === 'Variogram Family Filter') {
      if (
        loadedParameters !== undefined &&
        selectedVariogramModels === undefined
      ) {
        defaultParameter = loadedParameters;
        setVariogramModels && setVariogramModels(loadedParameters);
      } else if (
        selectedVariogramModels !== undefined &&
        loadedParameters === undefined
      ) {
        defaultParameter = selectedVariogramModels;
      } else if (
        selectedVariogramModels !== undefined &&
        loadedParameters !== undefined
      ) {
        defaultParameter = selectedVariogramModels;
      }
      return defaultParameter;
    } else if (method === 'Net-To-Gross') {
      if (loadedParameters !== undefined && selectedGrainSize === undefined) {
        defaultParameter = loadedParameters;
        setGrainSize && setGrainSize(loadedParameters);
      } else if (
        selectedGrainSize !== undefined &&
        loadedParameters === undefined
      ) {
        defaultParameter = selectedGrainSize;
      } else if (
        selectedGrainSize !== undefined &&
        loadedParameters !== undefined
      ) {
        defaultParameter = selectedGrainSize;
      }
      return defaultParameter;
    } else if (method === 'ContiniousParameter') {
      if (loadedParameters !== undefined && selectedParameters === undefined) {
        defaultParameter = loadedParameters;
        setParameters && setParameters(loadedParameters);
      } else if (
        selectedParameters !== undefined &&
        loadedParameters === undefined
      ) {
        defaultParameter = selectedParameters;
      } else if (
        selectedParameters !== undefined &&
        loadedParameters !== undefined
      ) {
        defaultParameter = selectedParameters;
      }
      return defaultParameter;
    } else if (method === 'Archel') {
      if (
        loadedParameters !== undefined &&
        selectedArchelFilter === undefined
      ) {
        defaultParameter = loadedParameters;
        setArchelFilter && setArchelFilter(loadedParameters);
      } else if (
        selectedArchelFilter !== undefined &&
        loadedParameters === undefined
      ) {
        defaultParameter = selectedArchelFilter;
      } else if (
        selectedArchelFilter !== undefined &&
        loadedParameters !== undefined
      ) {
        defaultParameter = selectedArchelFilter;
      }
      return defaultParameter;
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
