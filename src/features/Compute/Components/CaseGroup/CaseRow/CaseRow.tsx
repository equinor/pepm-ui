/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
import {
  ComputeCaseDto,
  ComputeJobStatus,
  ComputeMethod,
  ComputeType,
  CreateComputeCaseCommandResponse,
  InputValueType,
  ListComputeCasesByAnalogueModelIdQueryResponse,
  ListComputeSettingsModelDto,
  postApiV1JobsCancel,
  PostCancelJobCommand,
} from '../../../../../api/generated';
import { CaseButtons } from '../CaseButtons/CaseButtons';
import { ModelAreaSelect } from '../CaseSettingSelects/ModelAreaSelect';
import { VariogramOptionSelect } from '../VariogramSettingSelect/VariogramSettingSelect';
import * as Styled from './CaseRow.Styled';
import { useModelArea } from './hooks/useModelArea';
import { useSetSaved } from './hooks/useSetSaved';
import { useCaseParameters } from './hooks/useCaseParameters';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../../auth/queryClient';
import { useParams } from 'react-router-dom';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../../../stores/GlobalStore';
import { useGetParameterList } from './hooks/useGetParameterList';
import { useErrorStore } from '../../../../../stores/ErrorStore';
import {
  checkDuplicateType,
  validateContiniousParameter,
  validateIndicator,
  validateModelArea,
  validateNetToGross,
} from './hooks/CaseRow.hooks';
import { useCaseRowStore } from '../../../../../stores/CaseRowStore';
import { Variants } from '@equinor/eds-core-react/dist/types/components/types';

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
    computeMethod: ComputeMethod,
    computeType: ComputeType,
    inputSettings: string[],
  ) => Promise<CreateComputeCaseCommandResponse | undefined>;
  updateCase?: (
    modelAreaId: string,
    computeTypeId: string,
    inputSettings: string[],
  ) => Promise<ListComputeCasesByAnalogueModelIdQueryResponse | undefined>;
  deleteCase: (
    computeCaseId: string,
  ) => Promise<ListComputeCasesByAnalogueModelIdQueryResponse | undefined>;
  setAlertMessage: (message: string) => void;
  runCase: (id: string) => void;
  removeLocalCase: (id: string) => void;
  settingsFilter: (
    name: string,
    computeType: ComputeType,
  ) => ListComputeSettingsModelDto[] | undefined;
  duplicateCase?: (id: string) => void;
}) => {
  const { modelId } = useParams<{ modelId: string }>();
  const { analogueModel, computeSettings } = usePepmContextStore();
  const { addError } = useErrorStore();
  const {
    setIndicatorParams,
    setIndicatorVariogramModel,
    setIndicatorModelArea,
    setNetToGrossGrain,
    setNetToGrossVariogramModel,
    setNetToGrossModelArea,
    setContParamParameters,
    setContParamArchel,
    setContParamVariogramModel,
    setContParamModelArea,
    setObjectModelArea,
    setChannelModelArea,
    channelModelArea,
    objectModelArea,
    resetStates,
  } = useCaseRowStore();

  // const indicatorSettings = settingsFilter('Indicator');
  // const netToGrossSettings = settingsFilter('Net-To-Gross');
  // const continiousParameterSettings = settingsFilter('ContiniousParameter');

  const row = allCasesList.filter((c) => c.computeCaseId === id);
  const settingMethodType = row[0].computeMethod;

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
  } = useCaseParameters(rowCase, computeSettings);

  const { areaList, selectedModelArea, setModelArea, selectedRowArea } =
    useModelArea(allCasesList);

  const indicatorSettings = computeSettings.variogramComputeSettings?.filter(
    (val) => val.computeMethod === ComputeMethod.INDICATOR,
  );
  const netToGrossSettings = computeSettings.variogramComputeSettings?.filter(
    (val) => val.computeMethod === ComputeMethod.NET_TO_GROSS,
  );
  const continiousParameterSettings =
    computeSettings.variogramComputeSettings?.filter(
      (val) => val.computeMethod === ComputeMethod.CONTINIOUS_PARAMETER,
    );

  const { inputSettingsList } = useGetParameterList(
    settingMethodType,
    indicatorSettings,
    netToGrossSettings,
    continiousParameterSettings,
    selectedIndicatorParameters,
    selectedArchelFilter,
    selectedGrainSize,
    selectedContiniousParameters,
    selectedVariogramModels,
  );

  const runValidations = async () => {
    const ret = [];
    switch (settingMethodType) {
      case ComputeMethod.INDICATOR:
        ret.push(
          await validateIndicator(
            addError,
            setIndicatorParams,
            setIndicatorVariogramModel,
            selectedIndicatorParameters,
            selectedVariogramModels,
          ),
        );
        ret.push(
          await validateModelArea(
            addError,
            setIndicatorModelArea,
            selectedModelArea,
          ),
        );
        break;
      case ComputeMethod.NET_TO_GROSS:
        ret.push(
          await validateNetToGross(
            addError,
            setNetToGrossGrain,
            setNetToGrossVariogramModel,
            selectedGrainSize,
            selectedVariogramModels,
          ),
        );
        ret.push(
          await validateModelArea(
            addError,
            setNetToGrossModelArea,
            selectedModelArea,
          ),
        );
        break;
      case ComputeMethod.CONTINIOUS_PARAMETER:
        ret.push(
          await validateContiniousParameter(
            addError,
            setContParamParameters,
            setContParamArchel,
            setContParamVariogramModel,
            selectedContiniousParameters,
            selectedArchelFilter,
            selectedVariogramModels,
          ),
        );
        ret.push(
          await validateModelArea(
            addError,
            setContParamModelArea,
            selectedModelArea,
          ),
        );
        break;
      case ComputeMethod.MOUTHBAR:
        ret.push(
          await validateModelArea(
            addError,
            setObjectModelArea,
            selectedModelArea,
          ),
        );
        ret.push(
          await checkDuplicateType(
            addError,
            setObjectModelArea,
            caseList,
            selectedModelArea,
            caseType,
          ),
        );
        break;
      case ComputeMethod.CHANNEL:
        ret.push(
          await validateModelArea(
            addError,
            setChannelModelArea,
            selectedModelArea,
          ),
        );
        ret.push(
          await checkDuplicateType(
            addError,
            setChannelModelArea,
            caseList,
            selectedModelArea,
            caseType,
          ),
        );

        break;
    }

    return !ret.includes(true);
  };

  const cancelJob = useMutation({
    mutationFn: (requestBody: PostCancelJobCommand) =>
      postApiV1JobsCancel({ body: requestBody }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['model-cases'] });
    },
  });

  const runCancelJob = async (computeCaseId: string) => {
    if (!modelId) return;
    const requestBody: PostCancelJobCommand = {
      modelId: modelId,
      computeCaseId: computeCaseId,
    };

    const res = await cancelJob.mutateAsync(requestBody);

    if (res.data?.success) {
      setAlertMessage('Canceled computing case');
    }
  };

  const runRowCase = () => {
    if (
      (id && rowCase.jobStatus === ComputeJobStatus.RUNNING) ||
      rowCase.jobStatus === ComputeJobStatus.WAITING
    )
      return runCancelJob(id);
    if (id) return runCase(id);
  };

  const handleSaveCase = async (id: string) => {
    let inputSettings = inputSettingsList;
    // Hardcode the values for mauthbar and channel computeMethod from the model archels. Only one setting per object
    const mouthbareComputeCaseSettings =
      computeSettings.objectComputeSettings?.find(
        (x) => x.computeMethod === ComputeMethod.MOUTHBAR,
      )?.computeSettingId;
    const channelComputeCaseSettings =
      computeSettings.objectComputeSettings?.find(
        (x) => x.computeMethod === ComputeMethod.CHANNEL,
      )?.computeSettingId;

    if (
      inputSettings.length === 0 &&
      rowCase.computeType === ComputeType.OBJECT &&
      mouthbareComputeCaseSettings !== undefined &&
      channelComputeCaseSettings !== undefined
    ) {
      switch (rowCase.computeMethod) {
        case ComputeMethod.MOUTHBAR:
          inputSettings = [mouthbareComputeCaseSettings];
          break;
        case ComputeMethod.CHANNEL:
          inputSettings = [channelComputeCaseSettings];
          break;
      }
    }

    // Checks if Case already exists in the db
    const caseExists = caseList.filter((c) => c.computeCaseId === id);
    if (caseExists.length > 0 && updateCase && (await runValidations())) {
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
        inputSettings,
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
          selectedModelArea[0]?.modelAreaId !== ''
        ) {
          if (await runValidations()) {
            const res = await saveCase(
              selectedModelArea[0].modelAreaId,
              row[0].computeMethod,
              row[0].computeType,
              inputSettings,
            );
            if (res?.success) {
              removeLocalCase(id);
              resetStates();
              setAlertMessage('New case saved');
            }
          }
        } else {
          if ((await runValidations()) && selectedModelArea !== undefined) {
            const res = await saveCase(
              '',
              row[0].computeMethod,
              row[0].computeType,
              inputSettings,
            );
            if (res?.success) {
              removeLocalCase(id);
              resetStates();
              setAlertMessage('New case saved');
            }
          }
        }
      }
    }
  };

  const hasUnsavedCase = (id: string) => {
    const caseMethod = allCasesList.filter((c) => c.computeCaseId === id)[0]
      .computeMethod;
    const methodList = allCasesList
      .filter((c) => c.computeMethod === caseMethod)
      .filter((i) => i.computeCaseId.length < 4);
    return methodList.length > 0;
  };

  const filterSettings = (
    settings: ListComputeSettingsModelDto[] | undefined,
    inputValueType: InputValueType,
  ) => {
    switch (inputValueType) {
      case InputValueType.INDICATOR:
        return settings
          ?.filter((setting) => setting.inputValueType === inputValueType)
          .filter((setting) => setting.value !== '0');
      case InputValueType.ARCHEL:
        return settings
          ?.filter((setting) => setting.inputValueType === inputValueType)
          .filter((setting) => setting.value !== '0');
      default:
        return settings?.filter(
          (setting) => setting.inputValueType === inputValueType,
        );
    }
  };

  const indicatorFamilySettings = filterSettings(
    indicatorSettings,
    InputValueType.VARIOGRAM_FAMILY_FILTER,
  );

  const indicatorIndicatorSettings = filterSettings(
    indicatorSettings,
    InputValueType.INDICATOR,
  );

  const netGrossGrainSizeSettings = filterSettings(
    netToGrossSettings,
    InputValueType.NET_TO_GROSS,
  );

  const netGrossArchelSettings = filterSettings(
    netToGrossSettings,
    InputValueType.ARCHEL,
  );

  const netGrossVariogramFamilySettings = filterSettings(
    netToGrossSettings,
    InputValueType.VARIOGRAM_FAMILY_FILTER,
  );

  const contParamsVariogramFamilySettings = filterSettings(
    continiousParameterSettings,
    InputValueType.VARIOGRAM_FAMILY_FILTER,
  );

  const contParamsParamsSettings = filterSettings(
    continiousParameterSettings,
    InputValueType.ATTRIBUTE_NAME,
  );

  const contParamsArchelSettings = filterSettings(
    continiousParameterSettings,
    InputValueType.ARCHEL,
  );

  const variantChannel = (): Variants | undefined => {
    if (
      !saved &&
      selectedModelArea?.filter((c) => c.modelAreaType !== '').length === 0 &&
      channelModelArea
    )
      return 'error';

    return undefined;
  };

  const variantObject = (): Variants | undefined => {
    if (
      !saved &&
      selectedModelArea?.filter((c) => c.modelAreaType === '').length !== 0 &&
      objectModelArea
    )
      return 'error';

    return undefined;
  };

  if (analogueModel === analogueModelDefault) return <p>Loading ...</p>;

  return (
    <Styled.Case className={id.length <= 3 ? 'local-case' : ''}>
      <Styled.CaseRow
        className={caseType === 'Object' ? 'Object' : 'Variogram'}
      >
        {rowCase.computeMethod === ComputeMethod.INDICATOR && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={ComputeMethod.INDICATOR}
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
            selectedParamValue={selectedValues}
          />
        )}

        {rowCase.computeMethod === ComputeMethod.NET_TO_GROSS && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={ComputeMethod.NET_TO_GROSS}
            NetGrossGrainSizeSettings={netGrossGrainSizeSettings}
            NetGrossVariogramFamilySettings={netGrossVariogramFamilySettings}
            NetGrossArchelSettings={netGrossArchelSettings}
            selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
            selectedGrainSize={selectedGrainSize}
            selectedVariogramModels={selectedVariogramModels}
            selectedArchelFilter={selectedArchelFilter}
            setModelArea={setModelArea}
            setGrainSize={setGrainSize}
            setVariogramModels={setVariogramModels}
            setArchelFilter={setArchelFilter}
            existingCases={caseList}
            saved={saved}
            selectedParamValue={selectedValues}
          />
        )}

        {rowCase.computeMethod === ComputeMethod.CONTINIOUS_PARAMETER && (
          <VariogramOptionSelect
            rowCase={rowCase}
            modelAreas={areaList ? areaList : []}
            caseType={ComputeMethod.CONTINIOUS_PARAMETER}
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
            selectedParamValue={selectedValues}
          />
        )}

        {rowCase.computeMethod === ComputeMethod.CHANNEL && (
          <Styled.AutocompleteWrapper>
            <ModelAreaSelect
              disableSelect={saved}
              modelAreas={areaList ? areaList : []}
              selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
              setModelArea={setModelArea}
              existingCases={caseList}
              variant={variantChannel()}
            />
          </Styled.AutocompleteWrapper>
        )}

        {rowCase.computeMethod === ComputeMethod.MOUTHBAR && (
          <Styled.AutocompleteWrapper>
            <ModelAreaSelect
              disableSelect={saved}
              modelAreas={areaList ? areaList : []}
              selectedModelArea={selectedRowArea(rowCase.computeCaseId)}
              setModelArea={setModelArea}
              existingCases={caseList}
              variant={variantObject()}
            />
          </Styled.AutocompleteWrapper>
        )}

        <CaseButtons
          id={id}
          caseType={caseType === 'Object' ? 'Object' : 'Variogram'}
          saved={saved}
          caseStatus={rowCase.jobStatus}
          logFileExists={
            rowCase.logFilePath === null || rowCase.logFilePath.length === 0
              ? false
              : true
          }
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
