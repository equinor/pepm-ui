/* eslint-disable max-lines-per-function */
import { useState } from 'react';
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
}: {
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
}) => {
  // TODO: Case Error handling
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [caseError, setCaseError] = useState<string>('');

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
          selectedValue={
            selectedIndicatorParameters && selectedIndicatorParameters
          }
          setValue={setIndicatorParameters}
        />
      )}

      {setGrainSize && caseType === 'Net-to-gross' && (
        <CaseSettingSelect
          label={'From grain size'}
          options={
            NetGrossGrainSizeSettings && NetGrossGrainSizeSettings[0].values
          }
          selectedValue={selectedGrainSize && selectedGrainSize}
          setValue={setGrainSize}
        />
      )}
      {caseType === 'Continuous parameter' && (
        <CaseSettingSelect
          label={'Parameter'}
          settingType="continuousParameter"
          options={
            contParamsParamsSettings && contParamsParamsSettings[0].values
          }
          selectedValue={selectedParameters}
          setValue={setParameters}
        />
      )}
      <CaseSettingSelect
        label="Architectural elements filter"
        settingType="archel"
        caseType={caseType}
        options={contParamsArchelSettings && contParamsArchelSettings[0].values}
        selectedValue={selectedArchelFilter}
        setValue={setArchelFilter}
      />
      <CaseSettingSelect
        label={'Variogram model'}
        options={
          caseType === 'Net-to-gross'
            ? NetGrossVariogramFamilySettings &&
              NetGrossVariogramFamilySettings[0].values
            : caseType === 'Indicator'
            ? indicatorFamilySettings && indicatorFamilySettings[0].values
            : contParamsVariogramFamilySettings &&
              contParamsVariogramFamilySettings[0].values
        }
        selectedValue={selectedVariogramModels}
        setValue={setVariogramModels}
      />
    </Styled.AutocompleteWrapper>
  );
};
