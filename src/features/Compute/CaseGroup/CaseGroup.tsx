/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelComputeCasesService,
  ComputeCaseDto,
  ComputeJobStatus,
  ComputeSettingsService,
  CreateComputeCaseCommandForm,
  CreateComputeCaseInputSettingsForm,
  UpdateComputeCaseCommandForm,
  UpdateComputeCaseInputSettingsForm,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import { CaseCardComponent } from '../../../components/CaseCardComponent/CaseCardComponent';
import { useAccessToken } from '../../../hooks/useAccessToken';
import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';

export const CaseGroup = ({
  caseList,
  methodName,
  triggerAddCase,
  setAlertMessage,
  updateLocalCaseList,
  runCase,
}: {
  caseList: ComputeCaseDto[];
  methodName: string;
  triggerAddCase?: string;
  setAlertMessage: (message: string) => void;
  updateLocalCaseList?: (type: string, add: boolean) => void;
  runCase: (computeCaseId: string) => void;
}) => {
  const [localList, setLocalList] = useState<ComputeCaseDto[]>([]);
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const saveApiCase = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: CreateComputeCaseCommandForm;
    }) => {
      return AnalogueModelComputeCasesService.postApiAnalogueModelsComputeCases(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const updateApiCase = useMutation({
    mutationFn: ({
      id,
      computeCaseId,
      requestBody,
    }: {
      id: string;
      computeCaseId: string;
      requestBody: UpdateComputeCaseCommandForm;
    }) => {
      return AnalogueModelComputeCasesService.putApiAnalogueModelsComputeCases(
        id,
        computeCaseId,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const deleteApiCase = useMutation({
    mutationFn: ({
      id,
      computeCaseId,
    }: {
      id: string;
      computeCaseId: string;
    }) => {
      return AnalogueModelComputeCasesService.deleteApiAnalogueModelsComputeCases(
        id,
        computeCaseId,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const computeSettingsResponse = useQuery({
    queryKey: ['compute-settings'],
    queryFn: () => ComputeSettingsService.getApiComputeSettings(),
    enabled: !!token,
  });

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

  const filerLocalList = useCallback(
    (methodType: string) => {
      const methodFileter = localList.filter(
        (c) => c.computeMethod.name === methodType,
      );

      return methodFileter;
    },
    [localList],
  );

  const addCase = useCallback(
    (methodType: string) => {
      const setListItem = (methodType: string, newCase: ComputeCaseDto) => {
        const filteredList = filerLocalList(methodType);

        if (methodType === 'Channel' && filteredList.length < 1) {
          setLocalList([...localList, newCase]);
        } else if (
          methodType !== 'Channel' &&
          filteredList.length < 1 &&
          filteredList[0] === undefined
        ) {
          setLocalList([...localList, newCase]);
          updateLocalCaseList && updateLocalCaseList(methodType, true);
        }
      };

      let methodId = undefined;

      switch (methodType) {
        case 'Channel':
          methodId =
            channelSettings &&
            channelSettings[0].allowedMethods[0].computeMethodId;
          break;
        case 'Indicator':
          methodId = indicatorSettings && indicatorSettings[0].computeMethodId;
          break;
        case 'Net-To-Gross':
          methodId =
            NetToGrossSettings && NetToGrossSettings[0].computeMethodId;
          break;
        case 'ContiniousParameter':
          methodId =
            ContiniousParameterSettings &&
            ContiniousParameterSettings[0].computeMethodId;
          break;
      }

      if (methodId === undefined) {
        // TODO: handle ID not found
        setAlertMessage('A problem occured, could not find method type.');
      } else {
        const method = {
          computeMethodId: methodId,
          name: methodType,
        };

        const randomId = Math.floor(Math.random() * 100).toString();
        const newCase: ComputeCaseDto = {
          computeCaseId: randomId,
          computeMethod: method,
          modelArea: {
            modelAreaId: '',
            name: '',
          },
          inputSettings: [],
          jobStatus: ComputeJobStatus.NOT_STARTED,
        };

        switch (methodType) {
          case 'Channel':
            setListItem('Channel', newCase);
            break;
          case 'Indicator':
            setListItem('Indicator', newCase);
            break;
          case 'Net-To-Gross':
            setListItem('Net-To-Gross', newCase);
            break;
          case 'ContiniousParameter':
            setListItem('ContiniousParameter', newCase);
            break;
        }
      }
    },
    [
      ContiniousParameterSettings,
      NetToGrossSettings,
      channelSettings,
      filerLocalList,
      indicatorSettings,
      localList,
      setAlertMessage,
      updateLocalCaseList,
    ],
  );

  const removeLocalCase = (id: string) => {
    const newList = localList.filter((c) => c.computeCaseId !== id);
    setLocalList(newList);
  };

  const saveCase = async (
    modelAreaId: string,
    computeMethodId: string,
    computeTypeId: string,
    inputSettings: CreateComputeCaseInputSettingsForm[],
  ) => {
    const caseRequestBody: CreateComputeCaseCommandForm = {
      modelAreaId: modelAreaId,
      computeMethodId: computeMethodId,
      computeTypeId: computeTypeId,
      inputSettings: inputSettings,
    };
    if (modelId) {
      const res = await saveApiCase.mutateAsync({
        id: modelId,
        requestBody: caseRequestBody,
      });
      if (res.success)
        updateLocalCaseList && updateLocalCaseList(methodName, false);
      return res;
    }
  };

  const updateCase = async (
    modelAreaId: string,
    computeCaseId: string,
    inputSettings: UpdateComputeCaseInputSettingsForm[],
  ) => {
    const caseRequestBody: UpdateComputeCaseCommandForm = {
      modelAreaId: modelAreaId,
      inputSettings: inputSettings,
    };
    if (modelId) {
      const res = await updateApiCase.mutateAsync({
        id: modelId,
        computeCaseId: computeCaseId,
        requestBody: caseRequestBody,
      });
      return res;
    }
  };

  const deleteCase = async (computeCaseId: string) => {
    if (modelId) {
      const res = await deleteApiCase.mutateAsync({
        id: modelId,
        computeCaseId: computeCaseId,
      });
      return res;
    }
  };

  useEffect(() => {
    if (triggerAddCase !== undefined) {
      switch (triggerAddCase) {
        case 'Indicator':
          addCase('Indicator');
          break;
        case 'Net-To-Gross':
          addCase('Net-To-Gross');
          break;
        case 'ContiniousParameter':
          addCase('ContiniousParameter');
          break;
      }
    }
  }, [addCase, triggerAddCase]);

  return (
    <>
      {methodName === 'Channel' && (
        <Styled.ButtonDiv>
          <Styled.ButtonGroup>
            <Tooltip
              title={
                localList.length < 1 ? '' : 'Only one unsaved case at the time.'
              }
            >
              <Button
                variant="outlined"
                onClick={() => addCase('Channel')}
                disabled={localList.length >= 1}
              >
                <Icon data={ADD} size={18}></Icon>
                {methodName}
              </Button>
            </Tooltip>
          </Styled.ButtonGroup>
          <Styled.ButtonGroup>
            <Tooltip title="Functionality not implemented yet.">
              <Button
                variant="outlined"
                onClick={() => console.log('Running all')}
                disabled
              >
                <Icon data={PLAY} size={18}></Icon>
                Run all
              </Button>
            </Tooltip>
          </Styled.ButtonGroup>
        </Styled.ButtonDiv>
      )}

      <CaseCardComponent
        title={methodName}
        key={caseList.length > 0 ? caseList[0].computeCaseId : null}
        addCase={addCase}
        localList={localList}
      >
        <Styled.CaseList>
          {methodName === 'Channel' ? (
            <>
              {caseList.concat(localList).map((c, index) => (
                <CaseRow
                  rowCase={c}
                  key={index}
                  id={c.computeCaseId}
                  allCasesList={caseList.concat(localList)}
                  caseList={caseList}
                  caseType={methodName === 'Channel' ? 'Object' : 'Variogram'}
                  saveCase={saveCase}
                  deleteCase={deleteCase}
                  setAlertMessage={setAlertMessage}
                  runCase={runCase}
                  removeLocalCase={removeLocalCase}
                />
              ))}
            </>
          ) : (
            <>
              {caseList.concat(filerLocalList(methodName)).map((c, index) => (
                <CaseRow
                  rowCase={c}
                  key={index}
                  id={c.computeCaseId}
                  allCasesList={caseList.concat(localList)}
                  caseList={caseList}
                  caseType={methodName === 'Channel' ? 'Object' : 'Variogram'}
                  saveCase={saveCase}
                  updateCase={updateCase}
                  deleteCase={deleteCase}
                  setAlertMessage={setAlertMessage}
                  runCase={runCase}
                  removeLocalCase={removeLocalCase}
                />
              ))}
            </>
          )}
        </Styled.CaseList>
      </CaseCardComponent>
    </>
  );
};
