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
  ListComputeSettingsDto,
  ListComputeSettingsInputValueDto,
  ModelAreaDto,
  UpdateComputeCaseInputSettingsForm,
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
  caseType,
  saveCase,
  setAlertMessage,
  runCase,
  updateCase,
  removeLocalCase,
}: {
  rowCase: ComputeCaseDto;
  id: string;
  allCasesList: ComputeCaseDto[];
  caseList: ComputeCaseDto[];
  caseType: string;
  saveCase?: (
    modelAreaId: string,
    computeMethodId: string,
    computeTypeId: string,
    inputSettings: CreateComputeCaseInputSettingsForm[],
  ) => Promise<CreateComputeCaseCommandResponse | undefined>;
  updateCase?: (
    modelAreaId: string,
    computeTypeId: string,
    inputSettings: UpdateComputeCaseInputSettingsForm[],
  ) => Promise<void>;
  setAlertMessage: (message: string) => void;
  runCase: (id: string) => void;
  removeLocalCase: (id: string) => void;
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
      modelAreaType: 'Whole model',
      coordinates: [],
    },
  ];

  const areaList: ModelAreaDto[] =
    data && data.data.modelAreas
      ? data.data.modelAreas.concat(wholeModelObject)
      : wholeModelObject;

  // TODO: Make into reusable function
  const getParameterList = () => {
    let inputSettingsList: CreateComputeCaseInputSettingsForm[] = [];

    if (selectedVariogramModels) {
      const variogramModelTypeId = '4d07719a-3f1c-4a0e-9147-23a51adb876c';
      selectedVariogramModels.forEach((m) => {
        const temp = {
          inputSettingValueId: m.inputSettingValueId,
          inputSettingTypeId: variogramModelTypeId,
        };
        inputSettingsList = [...inputSettingsList, temp];
      });
    }

    if (selectedIndicatorParameters) {
      const variogramModelTypeId = '4d07719a-3f1c-4a0e-9147-23a51adb876c';
      selectedIndicatorParameters.forEach((s) => {
        const temp = {
          inputSettingValueId: s.inputSettingValueId,
          inputSettingTypeId: variogramModelTypeId,
        };
        inputSettingsList = [...inputSettingsList, temp];
      });
    }

    return inputSettingsList;
  };

  const handleSaveCase = async (id: string) => {
    // Checks if Case already exists in the db
    const caseExists = caseList.filter((c) => c.computeCaseId === id);
    if (caseExists.length > 0 && updateCase) {
      // Check if model area has changed
      // Check if the new settings already exists
      const row = allCasesList.filter((c) => c.computeCaseId === id);
      const modelArea = selectedModelArea
        ? selectedModelArea[0].modelAreaId
        : row[0].modelArea
        ? row[0].modelArea.modelAreaId
        : '';
      const inputSettingsList = getParameterList();

      await updateCase(modelArea, row[0].computeCaseId, inputSettingsList);
      setAlertMessage('Case updated');
    } else {
      const row = allCasesList.filter((c) => c.computeCaseId === id);

      // Check if the instance is an Object case and right data/methods is provided
      // TODO: Seperate into own method, take type as argument. Support all types not just Channel cases
      if (saveCase && variogramSettings) {
        const computeType: ListComputeSettingsDto =
          caseType === 'Object' && channelSettings
            ? channelSettings[0]
            : variogramSettings[0];

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

          const inputSettingsList = getParameterList();

          if (caseType === 'Object' && checkDuplicateType.length > 0) {
            // TODO: Error handeling, inform user
            // Handle Object duplicate Error
            setCaseError('Duplicate Object case, model area');
          } else {
            const res = await saveCase(
              selectedModelArea[0].modelAreaId,
              row[0].computeMethod.computeMethodId,
              computeType.computeTypeId,
              inputSettingsList,
            );
            if (res?.success) {
              removeLocalCase(id);
              setAlertMessage('New case saved');
            }
          }
        } else {
          // Case should have no set model area, is a 'whole model' case
          // Checks if 'whole model' case already exists
          const checkDuplicate = caseList.filter((c) => c.modelArea === null);

          if (caseType === 'Object' && checkDuplicate.length > 0) {
            // TODO: Error handeling, inform user
            // Handle Object duplicate Error
            setCaseError('Duplicate Object case, model area');
          } else if (selectedModelArea !== undefined) {
            const inputSettingsList = getParameterList();

            const res = await saveCase(
              '',
              row[0].computeMethod.computeMethodId,
              computeType.computeTypeId,
              inputSettingsList,
            );
            if (res?.success) {
              removeLocalCase(id);
              setAlertMessage('New case saved');
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

      // 1. Check if the case exists and if the case model area is 'Whole model'
      // 2. Check if the selected area is defined, returns selected model area
      // 3. Check if the case exists, if the case model area is NOT 'Whole model', if selected model area is undefined,
      // and if the existing case model area has an empty string as id. Returns the selected area.
      // 4. Returns the set area. If all 3 above checks is fails the default empty area is returned.

      if (rowCase.length > 0 && rowCase[0].modelArea === null) {
        defaultArea = [
          {
            modelAreaId: '',
            modelAreaType: 'Whole model',
            coordinates: [],
          },
        ];
      } else if (selectedModelArea !== undefined) {
        defaultArea = selectedModelArea;
      } else if (
        rowCase.length > 0 &&
        rowCase[0].modelArea !== null &&
        selectedModelArea === undefined &&
        rowCase[0].modelArea.modelAreaId !== ''
      ) {
        defaultArea = areaList.filter(
          (area) => area.modelAreaId === rowCase[0].modelArea.modelAreaId,
        );
      }
      return defaultArea;
    },
    [areaList, allCasesList, selectedModelArea],
  );

  const modelAreas = data && data.data.modelAreas;

  const selectedParam = useCallback(
    (rowId: string, type: string) => {
      const rowCase = allCasesList.filter((c) => c.computeCaseId === rowId);
      let defaultParameter: ListComputeSettingsInputValueDto[] = [];

      const indicatorIndicatorSettings =
        indicatorSettings &&
        indicatorSettings[0].inputSettings?.filter(
          (value) => value.name === type,
        );

      const settingsValueList =
        indicatorIndicatorSettings && indicatorIndicatorSettings[0].values;

      const loadedParameters =
        settingsValueList &&
        settingsValueList.filter((i) =>
          rowCase[0].inputSettings?.find(
            (s) => s.inputSettingValueId === i.inputSettingValueId,
          ),
        );

      // If loaded parameter is undefined and selected parameters are present, set data to selected parameters.
      // If loaded parameter is not undefined and no selected parameters, set data to loaded parameters.
      // If loaded parameters and selected parameters, set data to selected parameters.
      if (type === 'Indicator') {
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
      } else if (type === 'Variogram Family Filter') {
        if (
          loadedParameters !== undefined &&
          selectedVariogramModels === undefined
        ) {
          defaultParameter = loadedParameters;
          setVariogramModels(loadedParameters);
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
      }
    },
    [
      allCasesList,
      indicatorSettings,
      selectedIndicatorParameters,
      selectedVariogramModels,
    ],
  );

  useEffect(() => {
    function setNotSaved(r: ComputeCaseDto) {
      if (r.computeCaseId === id && r.computeMethod.name === 'Channel') {
        setSaved(false);
      }
    }

    allCasesList
      .filter((c) => !caseList.includes(c))
      .forEach((r) => setNotSaved(r));
  }, [caseList, allCasesList, id, saved]);

  useEffect(() => {
    function setNotSavedVariogram(r: ComputeCaseDto) {
      if (r.computeMethod.name === 'Indicator') {
        setSaved(false);
      }
    }

    allCasesList.forEach((r) => setNotSavedVariogram(r));
  }, [caseList, allCasesList, id, saved]);

  return (
    <Styled.Case>
      <Styled.CaseRow>
        {rowCase.computeMethod.name === 'Indicator' && (
          <VariogramOptionSelect
            modelAreas={areaList ? areaList : []}
            caseType={'Indicator'}
            IndicatorSettings={
              indicatorSettings && indicatorSettings[0].inputSettings
            }
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            selectedIndicatorParameters={selectedParam(
              rowCase.computeCaseId,
              'Indicator',
            )}
            selectedParameters={selectedParameters}
            selectedArchelFilter={selectedArchelFilter}
            selectedVariogramModels={selectedParam(
              rowCase.computeCaseId,
              'Variogram Family Filter',
            )}
            setModelArea={setModelArea}
            setIndicatorParameters={setIndicatorParameters}
            setParameters={setParameters}
            setArchelFilter={setArchelFilter}
            setVariogramModels={setVariogramModels}
            existingCases={caseList}
            saved={saved}
            caseError={caseError}
          />
        )}

        {rowCase.computeMethod.name === 'Net-to-Gross' && (
          <VariogramOptionSelect
            modelAreas={modelAreas ? modelAreas : []}
            caseType={'Net-to-Gross'}
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
            saved={saved}
            caseError={caseError}
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
            saved={saved}
            caseError={caseError}
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
          caseType={caseType === 'Object' ? 'Object' : 'Variogram'}
          saved={saved}
          isProcessed={data?.data.isProcessed}
          caseStatus={rowCase.jobStatus}
          runCase={runRowCase}
          saveCase={() => handleSaveCase(id)}
          id={id}
        />
      </Styled.CaseRow>
    </Styled.Case>
  );
};
