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
  CreateComputeCaseCommandResponse,
  CreateComputeCaseInputSettingsForm,
  ListComputeCasesByAnalogueModelIdQueryResponse,
  ListComputeSettingsDto,
  ListComputeSettingsInputValueDto,
  ListComputeSettingsMethodDto,
  ModelAreaDto,
  UpdateComputeCaseInputSettingsForm,
} from '../../../../api/generated';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import { ModelAreaSelect } from '../CaseSettingSelects/ModelAreaSelect';
import { VariogramOptionSelect } from '../CaseSettingSelects/VariogramSettingSelect';
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
  deleteCase,
  removeLocalCase,
  settingsFilter,
  variogramFilter,
}: {
  rowCase: ComputeCaseDto;
  id: string;
  allCasesList: ComputeCaseDto[];
  caseList: ComputeCaseDto[];
  caseType: string;
  saveCase: (
    modelAreaId: string,
    computeMethodId: string,
    computeTypeId: string,
    inputSettings: CreateComputeCaseInputSettingsForm[],
  ) => Promise<CreateComputeCaseCommandResponse | undefined>;
  updateCase?: (
    modelAreaId: string,
    computeTypeId: string,
    inputSettings: UpdateComputeCaseInputSettingsForm[],
  ) => Promise<ListComputeCasesByAnalogueModelIdQueryResponse | undefined>;
  deleteCase: (
    computeCaseId: string,
  ) => Promise<ListComputeCasesByAnalogueModelIdQueryResponse | undefined>;
  setAlertMessage: (message: string) => void;
  runCase: (id: string) => void;
  removeLocalCase: (id: string) => void;
  settingsFilter: (name: string) => ListComputeSettingsDto[] | undefined;
  variogramFilter?: (
    name: string,
  ) => ListComputeSettingsMethodDto[] | undefined;
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

  const channelSettings = settingsFilter('Object');
  const variogramSettings = settingsFilter('Variogram');

  const indicatorSettings = variogramFilter && variogramFilter('Indicator');
  const netToGrossSettings = variogramFilter && variogramFilter('Net-To-Gross');
  const continiousParameterSettings =
    variogramFilter && variogramFilter('ContiniousParameter');

  const runRowCase = () => {
    if (id) runCase(id);
  };

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

  const addSelectedSettings = (
    setting: ListComputeSettingsInputValueDto[] | undefined,
    settingType: string,
    methodType: string,
  ) => {
    if (setting) {
      let selectedId = undefined;
      switch (settingType) {
        case 'Indicator':
          if (indicatorSettings)
            selectedId = indicatorSettings[0].inputSettings.filter(
              (i) => i.name === methodType,
            )[0].inputSettingTypeId;
          return selectedId;

        case 'Net-To-Gross':
          if (netToGrossSettings)
            selectedId = netToGrossSettings[0].inputSettings.filter(
              (i) => i.name === methodType,
            )[0].inputSettingTypeId;
          return selectedId;

        case 'ContiniousParameter':
          if (continiousParameterSettings)
            selectedId =
              continiousParameterSettings &&
              continiousParameterSettings[0].inputSettings.filter(
                (i) => (i.inputSettingTypeId = setting[0].inputSettingValueId),
              )[0].inputSettingTypeId;
          return selectedId;
      }
    }
  };

  const updateList = async (
    setting: ListComputeSettingsInputValueDto[] | undefined,
    settingList: CreateComputeCaseInputSettingsForm[],
    settingType: string,
    methodType: string,
  ) => {
    let newList = [...settingList];
    if (setting) {
      const inputSettingTypeId = addSelectedSettings(
        setting,
        settingType,
        methodType,
      );

      if (inputSettingTypeId)
        setting.forEach((m) => {
          const temp = {
            inputSettingValueId: m.inputSettingValueId,
            inputSettingTypeId: inputSettingTypeId,
          };
          newList = [...newList, temp];
        });
    }
    return newList;
  };

  const getParameterList = async (settingType: string) => {
    let inputSettingsList: CreateComputeCaseInputSettingsForm[] = [];

    switch (settingType) {
      case 'Indicator': {
        const firstUpdate = await updateList(
          selectedIndicatorParameters,
          inputSettingsList,
          'Indicator',
          'Indicator',
        );

        inputSettingsList = firstUpdate;

        const secondUpdate = await updateList(
          selectedVariogramModels,
          inputSettingsList,
          'Indicator',
          'Variogram Family Filter',
        );
        inputSettingsList = secondUpdate;

        break;
      }
      case 'Net-To-Gross': {
        const firstUpdate = await updateList(
          selectedGrainSize,
          inputSettingsList,
          'Net-To-Gross',
          'Net-To-Gross',
        );
        inputSettingsList = firstUpdate;

        const secondUpdate = await updateList(
          selectedVariogramModels,
          inputSettingsList,
          'Net-To-Gross',
          'Variogram Family Filter',
        );
        inputSettingsList = secondUpdate;

        break;
      }

      case 'ContiniousParameter': {
        const firstUpdate = await updateList(
          selectedParameters,
          inputSettingsList,
          'ContiniousParameter',
          'ContiniousParameter',
        );
        inputSettingsList = firstUpdate;

        const secondUpdate = await updateList(
          selectedArchelFilter,
          inputSettingsList,
          'ContiniousParameter',
          'Archel',
        );
        inputSettingsList = secondUpdate;

        const thirdUpdate = await updateList(
          selectedVariogramModels,
          inputSettingsList,
          'ContiniousParameter',
          'Variogram Family Filter',
        );
        inputSettingsList = thirdUpdate;

        break;
      }
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

      const settingType = row[0].computeMethod.name;
      const list = await getParameterList(settingType);
      const inputSettingsList = list;

      const res = await updateCase(
        modelArea,
        row[0].computeCaseId,
        inputSettingsList,
      );
      if (res?.success) {
        setAlertMessage('Case updated');
      }
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

          const settingType = row[0].computeMethod.name;
          const list = await getParameterList(settingType);
          const inputSettingsList = list;

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
            const settingType = row[0].computeMethod.name;
            const list = await getParameterList(settingType);
            const inputSettingsList = list;

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
    function setNotSavedVariogram(r: ComputeCaseDto, type: string) {
      if (r.computeMethod.name === type) {
        setSaved(false);
      }
    }

    allCasesList.forEach((r) => setNotSavedVariogram(r, 'Indicator'));
    allCasesList.forEach((r) => setNotSavedVariogram(r, 'Net-To-Gross'));
    allCasesList.forEach((r) => setNotSavedVariogram(r, 'ContiniousParameter'));
  }, [caseList, allCasesList, saved]);

  return (
    <Styled.Case>
      <Styled.CaseRow>
        {rowCase.computeMethod.name === 'Indicator' && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={'Indicator'}
            IndicatorSettings={
              indicatorSettings && indicatorSettings[0].inputSettings
            }
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            selectedIndicatorParameters={selectedIndicatorParameters}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setIndicatorParameters={setIndicatorParameters}
            setVariogramModels={setVariogramModels}
            existingCases={caseList}
            saved={saved}
            caseError={caseError}
          />
        )}

        {rowCase.computeMethod.name === 'Net-To-Gross' && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={'Net-To-Gross'}
            NetToGrossSettings={
              netToGrossSettings && netToGrossSettings[0].inputSettings
            }
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            selectedGrainSize={selectedGrainSize}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setGrainSize={setGrainSize}
            setVariogramModels={setVariogramModels}
            existingCases={caseList}
            saved={saved}
            caseError={caseError}
          />
        )}

        {rowCase.computeMethod.name === 'ContiniousParameter' && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={'ContiniousParameter'}
            ContiniusParameterSettings={
              continiousParameterSettings &&
              continiousParameterSettings[0].inputSettings
            }
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
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
          id={id}
          caseType={caseType === 'Object' ? 'Object' : 'Variogram'}
          saved={saved}
          isProcessed={data?.data.isProcessed}
          caseStatus={rowCase.jobStatus}
          saveCase={() => handleSaveCase(id)}
          runCase={runRowCase}
          deleteCase={deleteCase}
          setAlertMessage={setAlertMessage}
        />
      </Styled.CaseRow>
    </Styled.Case>
  );
};
