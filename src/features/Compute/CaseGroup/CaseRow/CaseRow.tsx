/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import {
  ListComputeSettingsDto,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../../api/generated';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import { ObjectOptionSelect } from '../CaseOptionSelects/ObjectOptionSelect';
import { VariogramOptionSelect } from '../CaseOptionSelects/VariogramOptionSelect';
import * as Styled from './CaseRow.Styled';

export const CaseRow = ({
  caseType,
  id,
  modelAreas,
  caseSettings,
  runCase,
  removeCase,
}: {
  caseType: string;
  id: string;
  modelAreas: ModelAreaDto[] | undefined;
  caseSettings?: ListComputeSettingsDto[];
  runCase: (
    selectedModelArea?: ModelAreaDto[],
    selectedIndicatorParameters?: ListComputeSettingsInputValueDto[],
    selectedGrainSize?: ListComputeSettingsInputValueDto[],
    selectedArchelFilter?: ListComputeSettingsInputValueDto[],
    selectedParameters?: ListComputeSettingsInputValueDto[],
    selectedVariogramModels?: ListComputeSettingsInputValueDto[],
  ) => void;
  removeCase: (id: string) => void;
}) => {
  const variogramSettings =
    caseSettings && caseSettings.filter((item) => item.name === 'Variogram');

  const indicatorSettings =
    variogramSettings &&
    variogramSettings[0].allowedMethods.filter(
      (item) => item.name === 'Indicator',
    );

  const NetToGrossSettings =
    variogramSettings &&
    variogramSettings[0].allowedMethods.filter(
      (item) => item.name === 'Net-To-Gross',
    );

  const ContiniousParameterSettings =
    variogramSettings &&
    variogramSettings[0].allowedMethods.filter(
      (item) => item.name === 'ContiniousParameter',
    );

  const [selectedModelArea, setModelArea] = useState<ModelAreaDto[]>([]);
  const [selectedIndicatorParameters, setIndicatorParameters] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedGrainSize, setGrainSize] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedParameters, setParameters] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedArchelFilter, setArchelFilter] =
    useState<ListComputeSettingsInputValueDto[]>();
  const [selectedVariogramModels, setVariogramModels] =
    useState<ListComputeSettingsInputValueDto[]>();

  return (
    <Styled.Case>
      <Styled.CaseRow>
        {caseType === 'Indicator' && (
          <VariogramOptionSelect
            modelAreas={modelAreas ? modelAreas : []}
            caseType={'Indicator'}
            IndicatorSettings={
              indicatorSettings && indicatorSettings[0].inputSettings
            }
            selectedModelArea={selectedModelArea}
            selectedIndicatorParameters={selectedIndicatorParameters}
            selectedParameters={selectedParameters}
            selectedArchelFilter={selectedArchelFilter}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setIndicatorParameters={setIndicatorParameters}
            setParameters={setParameters}
            setArchelFilter={setArchelFilter}
            setVariogramModels={setVariogramModels}
          />
        )}

        {caseType === 'Net-to-gross' && (
          <VariogramOptionSelect
            modelAreas={modelAreas ? modelAreas : []}
            caseType={'Net-to-gross'}
            NetToGrossSettings={
              NetToGrossSettings && NetToGrossSettings[0].inputSettings
            }
            selectedModelArea={selectedModelArea}
            selectedGrainSize={selectedGrainSize}
            selectedParameters={selectedParameters}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setGrainSize={setGrainSize}
            setParameters={setParameters}
            setVariogramModels={setVariogramModels}
          />
        )}

        {caseType === 'Continuous parameter' && (
          <VariogramOptionSelect
            modelAreas={modelAreas ? modelAreas : []}
            caseType={'Continuous parameter'}
            ContiniusParameterSettings={
              ContiniousParameterSettings &&
              ContiniousParameterSettings[0].inputSettings
            }
            selectedModelArea={selectedModelArea}
            selectedParameters={selectedParameters}
            selectedArchelFilter={selectedArchelFilter}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setParameters={setParameters}
            setArchelFilter={setArchelFilter}
            setVariogramModels={setVariogramModels}
          />
        )}

        {caseType === 'Channel' && (
          <ObjectOptionSelect
            modelAreas={modelAreas ? modelAreas : []}
            selectedModelArea={selectedModelArea}
            setModelArea={setModelArea}
          />
        )}
        <CaseButtons
          id={id}
          runCase={() =>
            runCase(
              selectedModelArea,
              selectedIndicatorParameters,
              selectedGrainSize,
              selectedParameters,
              selectedArchelFilter,
              selectedVariogramModels,
            )
          }
          removeCase={removeCase}
        />
      </Styled.CaseRow>
    </Styled.Case>
  );
};
