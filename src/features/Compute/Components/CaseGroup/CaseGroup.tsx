/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { add as ADD } from '@equinor/eds-icons';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ComputeCaseDto,
  ComputeJobStatus,
  ComputeMethod,
  ComputeType,
  CreateComputeCaseCommandForm,
  deleteApiV1AnalogueModelsByIdComputeCasesByComputeCaseId,
  postApiV1AnalogueModelsByIdComputeCases,
  putApiV1AnalogueModelsByIdComputeCasesByComputeCaseId,
  UpdateComputeCaseCommandForm,
} from '../../../../api/generated';
import { queryClient } from '../../../../auth/queryClient';
import { CaseCardComponent } from '../../../../components/CaseCardComponent/CaseCardComponent';
import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';
import { useIsOwnerOrAdmin } from '../../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../../stores/GlobalStore';

export const CaseGroup = ({
  caseList,
  methodName,
  triggerAddCase,
  setAlertMessage,
  updateLocalCaseList,
  runCase,
}: {
  caseList: ComputeCaseDto[];
  methodName: ComputeMethod;
  triggerAddCase?: ComputeMethod;
  setAlertMessage: (message: string) => void;
  updateLocalCaseList?: (type: string, add: boolean) => void;
  runCase: (computeCaseId: string) => void;
}) => {
  const [localList, setLocalList] = useState<ComputeCaseDto[]>([]);
  const { computeCases, computeSettings } = usePepmContextStore();
  const { modelId } = useParams<{ modelId: string }>();
  const isOwnerOrAdmin = useIsOwnerOrAdmin();

  const saveApiCase = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: CreateComputeCaseCommandForm;
    }) => {
      return postApiV1AnalogueModelsByIdComputeCases({
        body: requestBody,
        path: { id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['model-cases'] });
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
      return putApiV1AnalogueModelsByIdComputeCasesByComputeCaseId({
        body: requestBody,
        path: { id: id, computeCaseId: computeCaseId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['model-cases'] });
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
      return deleteApiV1AnalogueModelsByIdComputeCasesByComputeCaseId({
        path: { id: id, computeCaseId: computeCaseId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['model-cases'] });
    },
  });

  const settingsFilter = (name: string, computeType: ComputeType) => {
    if (computeSettings) {
      switch (computeType) {
        case ComputeType.OBJECT:
          return computeSettings.objectComputeSettings?.filter(
            (item) => item.name === name,
          );
        case ComputeType.VARIOGRAM:
          return computeSettings.variogramComputeSettings?.filter(
            (item) => item.name === name,
          );
      }
    }
  };

  const filerLocalList = useCallback(
    (methodType: ComputeMethod) => {
      const methodFileter = localList.filter(
        (c) => c.computeMethod === methodType,
      );

      return methodFileter;
    },
    [localList],
  );

  const addCase = useCallback(
    (methodType: ComputeMethod, computeType: ComputeType) => {
      const setListItem = (
        methodType: ComputeMethod,
        newCase: ComputeCaseDto,
      ) => {
        const filteredList = filerLocalList(methodType);

        if (computeType === ComputeType.OBJECT && filteredList.length < 1) {
          setLocalList([...localList, newCase]);
        } else if (
          computeType !== ComputeType.OBJECT &&
          filteredList.length < 1 &&
          filteredList[0] === undefined
        ) {
          setLocalList([...localList, newCase]);
          updateLocalCaseList && updateLocalCaseList(methodType, true);
        }
      };

      const randomId = Math.floor(Math.random() * 100).toString();
      const newCase: ComputeCaseDto = {
        computeCaseId: randomId,
        computeMethod: methodType,
        modelArea: {
          modelAreaId: '',
          name: '',
        },
        inputSettings: [],
        jobStatus: ComputeJobStatus.NOT_STARTED,
        computeType: computeType,
      };

      setListItem(methodType, newCase);
    },
    [filerLocalList, localList, updateLocalCaseList],
  );

  const removeLocalCase = (id: string) => {
    const newList = localList.filter((c) => c.computeCaseId !== id);
    setLocalList(newList);
  };

  const saveCase = async (
    modelAreaId: string,
    computeMethod: ComputeMethod,
    computeType: ComputeType,
    inputSettings: string[],
  ) => {
    const caseRequestBody: CreateComputeCaseCommandForm = {
      modelAreaId: modelAreaId,
      computeMethod: computeMethod,
      inputSettings: inputSettings,
      computeType: computeType,
    };
    if (modelId) {
      const res = await saveApiCase.mutateAsync({
        id: modelId,
        requestBody: caseRequestBody,
      });
      if (res.data?.success)
        updateLocalCaseList && updateLocalCaseList(methodName, false);
      return res.data;
    }
  };

  const updateCase = async (
    modelAreaId: string,
    computeCaseId: string,
    inputSettings: string[],
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
      return res.data;
    }
  };

  const deleteCase = async (computeCaseId: string) => {
    if (modelId) {
      const localCase = caseList.find((c) => c.computeCaseId === computeCaseId);
      if (!localCase) {
        removeLocalCase(computeCaseId);
      } else {
        const res = await deleteApiCase.mutateAsync({
          id: modelId,
          computeCaseId: computeCaseId,
        });
        return res.data;
      }
    }
  };

  useEffect(() => {
    if (triggerAddCase !== undefined) {
      addCase(triggerAddCase, ComputeType.VARIOGRAM);
    }
  }, [addCase, triggerAddCase]);

  const duplicateCase = (id: string) => {
    const caseToDuplicate = computeCases.filter((c) => c.computeCaseId === id);
    const randomLocalId = Math.floor(Math.random() * 100).toString();
    if (caseToDuplicate) {
      const newCase: ComputeCaseDto = {
        computeCaseId: randomLocalId,
        computeMethod: caseToDuplicate[0].computeMethod,
        modelArea: caseToDuplicate[0].modelArea,
        inputSettings: caseToDuplicate[0].inputSettings,
        jobStatus: ComputeJobStatus.NOT_STARTED,
        computeType: caseToDuplicate[0].computeType,
      };

      const localCasesForMethod = filerLocalList(
        caseToDuplicate[0].computeMethod,
      );

      if (
        localCasesForMethod.length < 1 &&
        localCasesForMethod[0] === undefined
      ) {
        setLocalList([...localList, newCase]);
        updateLocalCaseList && updateLocalCaseList('Variogram', true);
      }
    }
  };

  if (computeSettings === null || undefined) return <p>Loading ...</p>;

  return (
    <>
      {(methodName === ComputeMethod.CHANNEL ||
        methodName === ComputeMethod.MOUTHBAR) && (
        <Styled.ButtonDiv>
          <Styled.ButtonGroup>
            <Tooltip
              title={
                localList.length < 1 ? '' : 'Only one unsaved case at the time.'
              }
            >
              <Button
                variant="outlined"
                onClick={() => addCase(methodName, ComputeType.OBJECT)}
                disabled={localList.length >= 1 || !isOwnerOrAdmin}
              >
                <Icon data={ADD} size={18}></Icon>
                {methodName}
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
          {methodName === ComputeMethod.CHANNEL ||
          methodName === ComputeMethod.MOUTHBAR ? (
            <>
              {caseList.concat(localList).map((c, index) => (
                <CaseRow
                  rowCase={c}
                  key={c.computeCaseId}
                  id={c.computeCaseId}
                  allCasesList={caseList.concat(localList)}
                  caseList={caseList}
                  caseType={c.computeType}
                  saveCase={saveCase}
                  deleteCase={deleteCase}
                  setAlertMessage={setAlertMessage}
                  runCase={runCase}
                  removeLocalCase={removeLocalCase}
                  settingsFilter={settingsFilter}
                />
              ))}
            </>
          ) : (
            <>
              {caseList.concat(filerLocalList(methodName)).map((c, index) => (
                <CaseRow
                  rowCase={c}
                  key={c.computeCaseId}
                  id={c.computeCaseId}
                  allCasesList={caseList.concat(localList)}
                  caseList={caseList}
                  caseType={c.computeType}
                  saveCase={saveCase}
                  updateCase={updateCase}
                  deleteCase={deleteCase}
                  setAlertMessage={setAlertMessage}
                  runCase={runCase}
                  removeLocalCase={removeLocalCase}
                  settingsFilter={settingsFilter}
                  duplicateCase={duplicateCase}
                />
              ))}
            </>
          )}
        </Styled.CaseList>
      </CaseCardComponent>
    </>
  );
};
