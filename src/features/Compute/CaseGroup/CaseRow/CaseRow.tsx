/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import {
  ComputeCaseDto,
  CreateComputeCaseCommandResponse,
  CreateComputeCaseInputSettingsForm,
  ListComputeCasesByAnalogueModelIdQueryResponse,
  ListComputeSettingsInputDto,
  ListComputeSettingsMethodDto,
  UpdateComputeCaseInputSettingsForm,
} from '../../../../api/generated';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import { ModelAreaSelect } from '../CaseSettingSelects/ModelAreaSelect';
import { VariogramOptionSelect } from '../VariogramSettingSelect/VariogramSettingSelect';
import * as Styled from './CaseRow.Styled';
import { useCaseParameters } from './hooks/useCaseParameters';
import { useGetParameterList } from './hooks/useGetParameterList';
import { useModelArea } from './hooks/useModelArea';
import { useSetSaved } from './hooks/useSetSaved';

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
  const [caseError, setCaseError] = useState<string>('');

  const indicatorSettings = settingsFilter('Indicator');
  const netToGrossSettings = settingsFilter('Net-To-Gross');
  const continiousParameterSettings = settingsFilter('ContiniousParameter');

  const row = allCasesList.filter((c) => c.computeCaseId === id);
  const settingType = row[0].computeMethod.name;

  const { saved } = useSetSaved(id, allCasesList, caseList);
  const {
    selectedIndicatorParameters,
    selectedGrainSize,
    selectedContiniousParameters,
    selectedArchelFilter,
    selectedVariogramModels,
    setIndicatorParameters,
    setGrainSize,
    setContiniousParameters,
    setArchelFilter,
    setVariogramModels,
    selectedValues,
  } = useCaseParameters(
    rowCase,
    indicatorSettings,
    netToGrossSettings,
    continiousParameterSettings,
  );

  const {
    isLoading,
    isProcessed,
    areaList,
    selectedModelArea,
    setModelArea,
    selectedRowArea,
  } = useModelArea(allCasesList);

  const { inputSettingsList } = useGetParameterList(
    settingType,
    indicatorSettings,
    netToGrossSettings,
    continiousParameterSettings,
    selectedIndicatorParameters,
    selectedArchelFilter,
    selectedGrainSize,
    selectedContiniousParameters,
    selectedVariogramModels,
  );

  const runRowCase = () => {
    if (id) runCase(id);
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

          if (caseType === 'Object' && checkDuplicateType.length > 0) {
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
            setCaseError('Duplicate Object case, model area');
          } else if (selectedModelArea !== undefined) {
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
            selectedParamValue={selectedValues}
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
            selectedParamValue={selectedValues}
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
            selectedContiniousParameters={selectedContiniousParameters}
            selectedArchelFilter={selectedArchelFilter}
            selectedVariogramModels={selectedVariogramModels}
            setModelArea={setModelArea}
            setContiniousParameters={setContiniousParameters}
            setArchelFilter={setArchelFilter}
            setVariogramModels={setVariogramModels}
            existingCases={caseList}
            saved={saved}
            caseError={caseError}
            selectedParamValue={selectedValues}
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

        {rowCase.computeMethod.name === 'Mouthbar' && (
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
          isProcessed={isProcessed}
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
