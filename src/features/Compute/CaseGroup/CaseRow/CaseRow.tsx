/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelsService,
  ComputeCaseDto,
  ComputeSettingsService,
  CreateComputeCaseCommandResponse,
  CreateComputeCaseInputSettingsForm,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
} from '../../../../api/generated';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import { ModelAreaSelect } from '../CaseOptionSelects/ModelAreaSelect/ModelAreaSelect';
import { VariogramOptionSelect } from '../CaseOptionSelects/VariogramOptionSelect';
import * as Styled from './CaseRow.Styled';

export const CaseRow = ({
  rowCase,
  id,
  allCasesList,
  caseList,
  saveObjectCase,
  saveCaseAlert,
  runCase,
  removeLocalCase,
}: {
  rowCase: ComputeCaseDto;
  id: string;
  allCasesList: ComputeCaseDto[];
  caseList: ComputeCaseDto[];
  saveObjectCase?: (
    modelAreaId: string,
    computeMethodId: string,
    computeTypeId: string,
    inputSettings: CreateComputeCaseInputSettingsForm[],
  ) => Promise<CreateComputeCaseCommandResponse | undefined>;
  saveCaseAlert: () => void;
  removeLocalCase: (id: string) => void;
  runCase: (id: string) => void;
}) => {
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const [selectedModelArea, setModelArea] = useState<ModelAreaDto[]>();
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
  const [saved, setSaved] = useState<boolean>(true);
  const [caseError, setCaseError] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['analogue-model', modelId],
    queryFn: () =>
      AnalogueModelsService.getApiAnalogueModels1(modelId as string),
    enabled: !!token,
  });

  const computeSettingsResponse = useQuery({
    queryKey: ['compute-settings'],
    queryFn: () => ComputeSettingsService.getApiComputeSettings(),
    enabled: !!token,
  });

  const runRowCase = () => {
    if (id) runCase(id);
  };

  const settingsFilter = (name: string) => {
    if (computeSettingsResponse) {
      return computeSettingsResponse.data?.data.filter(
        (item) => item.name === name,
      );
    }
  };
  const channelSettings = settingsFilter('Object');
  const variogramSettings = settingsFilter('Variogram');

  const variogramFilter = (name: string) => {
    if (variogramSettings) {
      return variogramSettings[0].allowedMethods.filter(
        (item) => item.name === name,
      );
    }
  };
  const indicatorSettings = variogramFilter('Indicator');
  const NetToGrossSettings = variogramFilter('Net-To-Gross');
  const ContiniousParameterSettings = variogramFilter('ContiniousParameter');

  const wholeModelObject: ModelAreaDto[] = [
    {
      modelAreaId: '',
      modelAreaType: 'Whole Model',
      coordinates: [],
    },
  ];

  const areaList: ModelAreaDto[] =
    data && data.data.modelAreas
      ? data.data.modelAreas.concat(wholeModelObject)
      : wholeModelObject;

  const saveCase = async (id: string) => {
    // Checks if Case already exists in the db
    const caseExists = caseList.filter((c) => c.computeCaseId === id);

    if (caseExists.length > 0) {
      // Handle updates and PUT request
      // Check if model area has changed
      // Check if the new settings already exists
    } else {
      const row = allCasesList.filter((c) => c.computeCaseId === id);

      // Check if the instance is an Object case and right data/methods is provided
      // TODO: Seperate into own method, take type as argument. Support all types not just Channel cases
      if (saveObjectCase && channelSettings) {
        const computeType = channelSettings[0];

        if (
          row[0] !== undefined &&
          row[0].modelArea !== null &&
          selectedModelArea &&
          selectedModelArea[0].modelAreaId !== ''
        ) {
          // filters out cases without defined model area, 'Whole model'
          // Checks if given model area already exists
          const checkDuplicateType = caseList
            .filter((c) => c.modelArea !== null)
            .filter(
              (cl) => cl.modelArea.name === selectedModelArea[0].modelAreaType,
            );

          if (checkDuplicateType.length === 0) {
            const res = await saveObjectCase(
              selectedModelArea[0].modelAreaId,
              row[0].computeMethod.computeMethodId,
              computeType.computeTypeId,
              [],
            );
            if (res?.success) {
              removeLocalCase(id);
              saveCaseAlert();
            }
          } else {
            // TODO: Error handeling, inform user
            // Possibly not necessary anyway. Might never be reached with new limitations on user.
          }
        } else {
          // Case should have no set model area, is a 'whole model' case
          // Checks if 'whole model' case already exists
          const checkDuplicate = caseList.filter((c) => c.modelArea === null);

          if (checkDuplicate.length <= 0) {
            const res = await saveObjectCase(
              '',
              row[0].computeMethod.computeMethodId,
              '42069a5e-d76c-41be-8d1e-cd30d9b043f0',
              [],
            );
            if (res?.success) {
              removeLocalCase(id);
              saveCaseAlert();
            }
          } else {
            setCaseError('You must select a model area');
          }
        }
      }
    }
  };

  const selectedRowArea = useCallback(
    (rowId: string) => {
      const rowCase = allCasesList.filter((c) => c.computeCaseId === rowId);

      // Set default selected area to empty
      let defaultArea: ModelAreaDto[] = [
        {
          modelAreaId: '',
          modelAreaType: '',
          coordinates: [],
        },
      ];

      // Check if the case exists and if the case has a model area
      // If the saved case model area is 'null', 'Whole model' is selected and default model area is returned
      // If case has a saved model area, the area is returned
      // If 'Selected model area' is defined it is returned
      if (
        rowCase.length > 0 &&
        rowCase[0].modelArea !== null &&
        selectedModelArea === undefined
      ) {
        defaultArea = areaList.filter(
          (area) => area.modelAreaId === rowCase[0].modelArea.modelAreaId,
        );
      } else if (
        rowCase.length > 0 &&
        rowCase[0].modelArea !== null &&
        selectedModelArea
      ) {
        defaultArea = selectedModelArea;
      }
      return defaultArea;
    },
    [areaList, allCasesList, selectedModelArea],
  );

  const modelAreas = data && data.data.modelAreas;

  useEffect(() => {
    function setNotSaved(r: ComputeCaseDto) {
      if (r.computeCaseId === id) {
        setSaved(false);
      }
    }
    allCasesList
      .filter((c) => !caseList.includes(c))
      .forEach((r) => setNotSaved(r));
  }, [caseList, allCasesList, id, saved]);

  return (
    <Styled.Case>
      <Styled.CaseRow>
        {rowCase.computeMethod.name === 'Indicator' && (
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
            existingCases={caseList}
          />
        )}

        {rowCase.computeMethod.name === 'Net-To-Gross' && (
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
            existingCases={caseList}
          />
        )}

        {rowCase.computeMethod.name === 'ContiniousParameter' && (
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
            existingCases={caseList}
          />
        )}

        {rowCase.computeMethod.name === 'Channel' && (
          <ModelAreaSelect
            disableSelect={saved}
            modelAreas={areaList ? areaList : []}
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            setModelArea={setModelArea}
            existingCases={caseList}
            caseError={caseError}
          />
        )}
        <CaseButtons
          caseType={saveObjectCase ? 'Object' : 'Variogram'}
          enableRun={saved}
          isProcessed={data?.data.isProcessed}
          saveCase={() => saveCase(id)}
          runCase={runRowCase}
          caseStatus={rowCase.jobStatus}
        />
      </Styled.CaseRow>
    </Styled.Case>
  );
};
