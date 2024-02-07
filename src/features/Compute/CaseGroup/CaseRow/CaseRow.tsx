/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useState } from 'react';
import {
  ComputeCaseDto,
  CreateComputeCaseCommandResponse,
  CreateComputeCaseInputSettingsForm,
  ListComputeCasesByAnalogueModelIdQueryResponse,
  ListComputeSettingsInputDto,
  ListComputeSettingsInputValueDto,
  ListComputeSettingsMethodDto,
  ModelAreaDto,
  UpdateComputeCaseInputSettingsForm,
} from '../../../../api/generated';
import { useFetchModel } from '../../../../hooks/useFetchModel';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import { ModelAreaSelect } from '../CaseSettingSelects/ModelAreaSelect';
import { VariogramOptionSelect } from '../VariogramSettingSelect/VariogramSettingSelect';
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
  duplicateCase,
}: {
  rowCase: ComputeCaseDto;
  id: string;
  allCasesList: ComputeCaseDto[];
  caseList: ComputeCaseDto[];
  caseType: string;
  saveCase: (
    modelAreaId: string,
    computeMethodId: string,
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
  settingsFilter: (name: string) => ListComputeSettingsMethodDto[] | undefined;
  duplicateCase?: (id: string) => void;
}) => {
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

  const { data, isLoading } = useFetchModel();

  const indicatorSettings = settingsFilter('Indicator');
  const netToGrossSettings = settingsFilter('Net-To-Gross');
  const continiousParameterSettings = settingsFilter('ContiniousParameter');

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
      if (saveCase) {
        if (
          row[0] !== undefined &&
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

      if (
        rowCase.length > 0 &&
        rowCase[0].modelArea === null &&
        selectedModelArea === undefined
      ) {
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
        setModelArea(defaultArea);
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

  const hasUnsavedCase = (id: string) => {
    const caseMethod = allCasesList.filter((c) => c.computeCaseId === id)[0]
      .computeMethod;
    const methodList = allCasesList
      .filter(
        (c) => c.computeMethod.computeMethodId === caseMethod.computeMethodId,
      )
      .filter((i) => i.computeCaseId.length < 4);
    return methodList.length > 0;
  };

  const filterSettings = (
    setting: ListComputeSettingsInputDto[] | undefined,
    method: string,
  ) => {
    return setting?.filter((value) => value.name === method);
  };

  const IndicatorSettings =
    indicatorSettings && indicatorSettings[0].inputSettings;
  const NetToGrossSettings =
    netToGrossSettings && netToGrossSettings[0].inputSettings;
  const ContiniusParameterSettings =
    continiousParameterSettings && continiousParameterSettings[0].inputSettings;

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

  const selectedParamValue = useCallback(
    (method: string) => {
      let settingsValueList: ListComputeSettingsInputValueDto[] | undefined =
        [];
      let loadedParameters: ListComputeSettingsInputValueDto[] | undefined = [];

      switch (method) {
        case 'Indicator': {
          if (indicatorIndicatorSettings)
            settingsValueList = indicatorIndicatorSettings[0].values;
          break;
        }
        case 'Variogram Family Filter': {
          if (rowCase.computeMethod.name === 'Indicator') {
            if (indicatorFamilySettings)
              settingsValueList = indicatorFamilySettings[0].values;
          } else if (rowCase.computeMethod.name === 'Net-To-Gross') {
            if (NetGrossVariogramFamilySettings)
              settingsValueList = NetGrossVariogramFamilySettings[0].values;
          } else if (rowCase.computeMethod.name === 'ContiniousParameter') {
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

      return loadedParameters;
    },
    [
      NetGrossGrainSizeSettings,
      NetGrossVariogramFamilySettings,
      contParamsArchelSettings,
      contParamsParamsSettings,
      contParamsVariogramFamilySettings,
      indicatorFamilySettings,
      indicatorIndicatorSettings,
      rowCase.computeMethod.name,
      rowCase.inputSettings,
    ],
  );

  const setIfLoadedValues = useCallback(
    (method: string) => {
      const loaded = selectedParamValue(method);
      switch (method) {
        case 'Indicator':
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedIndicatorParameters,
              setIndicatorParameters,
            );
          break;

        case 'Variogram Family Filter':
          if (loaded)
            getDefaultParameters(
              loaded,
              selectedVariogramModels,
              setVariogramModels,
            );
          break;

        case 'Net-To-Gross':
          if (loaded)
            getDefaultParameters(loaded, selectedGrainSize, setGrainSize);
          break;

        case 'ContiniousParameter':
          if (loaded)
            getDefaultParameters(loaded, selectedParameters, setParameters);
          break;

        case 'Archel':
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
      selectedParameters,
      selectedVariogramModels,
    ],
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
    if (selectedParameter === undefined) {
      setParameter(loadedParameters);
    }
  };

  useEffect(() => {
    setIfLoadedValues('Indicator');
    setIfLoadedValues('Variogram Family Filter');
    setIfLoadedValues('Net-To-Gross');
    setIfLoadedValues('ContiniousParameter');
    setIfLoadedValues('Archel');
  }, [selectedParamValue, setIfLoadedValues]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <Styled.Case className={id.length <= 3 ? 'local-case' : ''}>
      <Styled.CaseRow
        className={caseType === 'Object' ? 'Object' : 'Variogram'}
      >
        {rowCase.computeMethod.name === 'Indicator' && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={'Indicator'}
            indicatorFamilySettings={indicatorFamilySettings}
            indicatorIndicatorSettings={indicatorIndicatorSettings}
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            selectedIndicatorParameters={selectedIndicatorParameters}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setIndicatorParameters={setIndicatorParameters}
            setVariogramModels={setVariogramModels}
            existingCases={caseList}
            saved={saved}
            caseError={caseError}
            selectedParamValue={selectedParamValue}
          />
        )}

        {rowCase.computeMethod.name === 'Net-To-Gross' && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={'Net-To-Gross'}
            NetGrossGrainSizeSettings={NetGrossGrainSizeSettings}
            NetGrossVariogramFamilySettings={NetGrossVariogramFamilySettings}
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            selectedGrainSize={selectedGrainSize}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setGrainSize={setGrainSize}
            setVariogramModels={setVariogramModels}
            existingCases={caseList}
            saved={saved}
            caseError={caseError}
            selectedParamValue={selectedParamValue}
          />
        )}

        {rowCase.computeMethod.name === 'ContiniousParameter' && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={'ContiniousParameter'}
            contParamsVariogramFamilySettings={
              contParamsVariogramFamilySettings
            }
            contParamsParamsSettings={contParamsParamsSettings}
            contParamsArchelSettings={contParamsArchelSettings}
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
            selectedParamValue={selectedParamValue}
          />
        )}

        {rowCase.computeMethod.name === 'Channel' && (
          <Styled.AutocompleteWrapper>
            <ModelAreaSelect
              disableSelect={saved}
              modelAreas={areaList ? areaList : []}
              selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
              setModelArea={setModelArea}
              existingCases={caseList}
              caseError={caseError}
            />
          </Styled.AutocompleteWrapper>
        )}

        <CaseButtons
          id={id}
          caseType={caseType === 'Object' ? 'Object' : 'Variogram'}
          saved={saved}
          isProcessed={data?.data.isProcessed}
          caseStatus={rowCase.jobStatus}
          hasUnsavedCase={hasUnsavedCase(id)}
          saveCase={() => handleSaveCase(id)}
          runCase={runRowCase}
          deleteCase={deleteCase}
          setAlertMessage={setAlertMessage}
          duplicateCase={() => {
            duplicateCase && duplicateCase(id);
          }}
        />
      </Styled.CaseRow>
    </Styled.Case>
  );
};
