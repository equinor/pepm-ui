/* eslint-disable max-lines-per-function */
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelComputeCasesService,
  ComputeCaseDto,
  ComputeJobStatus,
  CreateComputeCaseCommandForm,
  CreateComputeCaseCommandResponse,
  CreateComputeCaseInputSettingsForm,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import { CaseCardComponent } from '../../../components/CaseCardComponent/CaseCardComponent';
import * as Styled from './CaseGroup.styled';
import { CaseRow } from './CaseRow/CaseRow';

export const CaseGroup = ({
  caseList,
  methodName,
  saveCaseAlert,
  runCase,
}: {
  caseList: ComputeCaseDto[];
  methodName: string;
  saveCase?: (
    modelAreaId: string,
    computeMethodId: string,
    computeTypeId: string,
    inputSettings: CreateComputeCaseInputSettingsForm[],
  ) => Promise<CreateComputeCaseCommandResponse | undefined>;
  saveCaseAlert: () => void;
  runCase: (computeCaseId: string) => void;
}) => {
  const { modelId } = useParams<{ modelId: string }>();
  const [localList, setLocalList] = useState<ComputeCaseDto[]>([]);

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

  // TODO: Get the id in a propper way, not hard coded.
  const getMethodId = (method: string) => {
    if (method === 'Indicator') {
      return 'c96fd047-19cc-4e10-9c1e-626a62c22539';
    } else if (method === 'Net-to-Gross') {
      return '2abfea7a-7160-4b0a-85a9-674be70b5f17';
    } else if (method === 'ContiniousParameter') {
      return '88663a7e-0a45-46ce-8ba3-ef4a314e1878';
    } else if (method === 'Channel') {
      return '7b298b84-de00-4134-a07e-ee01119c9949';
    } else {
      // TODO: Handle error, inform user
      // eslint-disable-next-line no-console
      console.log('Unvalid metod');
      return '';
    }
  };

  const filerLocalList = (methodType: string) => {
    const methodFileter = localList.filter(
      (c) => c.computeMethod.name === methodType,
    );

    return methodFileter;
  };

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
    } else {
      // TODO: Error handeling, inform user
      // eslint-disable-next-line no-console
      console.log('Just one unsaved case at time');
    }
  };

  const addCase = (methodType: string) => {
    const methodId = getMethodId(methodType);
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
      case 'Net-to-Gross':
        setListItem('Net-to-Gross', newCase);
        break;
      case 'ContiniousParameter':
        setListItem('ContiniousParameter', newCase);
        break;
    }
  };

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
      return res;
    }
  };

  return (
    <>
      {methodName === 'Channel' ? (
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
      ) : (
        <Styled.ButtonDiv>
          <Styled.ButtonGroup>
            {methodName === 'Indicator' && (
              <Button variant="outlined" onClick={() => addCase('Indicator')}>
                <Icon data={ADD} size={18}></Icon>
                Indicator
              </Button>
            )}
            {methodName === 'Net-to-Gross' && (
              <Button
                variant="outlined"
                onClick={() => addCase('Net-to-Gross')}
              >
                <Icon data={ADD} size={18}></Icon>
                Net-to-Gross
              </Button>
            )}
            {methodName === 'ContiniousParameter' && (
              <Button
                variant="outlined"
                onClick={() => addCase('ContiniousParameter')}
              >
                <Icon data={ADD} size={18}></Icon>
                ContiniousParameter
              </Button>
            )}
          </Styled.ButtonGroup>
          <Styled.ButtonGroup>
            <Button
              variant="outlined"
              // eslint-disable-next-line no-console
              onClick={() => console.log('Running all')}
              disabled
            >
              <Icon data={PLAY} size={18}></Icon>
              Run all
            </Button>
          </Styled.ButtonGroup>
        </Styled.ButtonDiv>
      )}

      <CaseCardComponent
        title={methodName}
        key={caseList.length > 0 ? caseList[0].computeCaseId : null}
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
                  saveCaseAlert={saveCaseAlert}
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
                  saveCaseAlert={saveCaseAlert}
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
