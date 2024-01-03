/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, Icon, Snackbar } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelComputeCasesService,
  ComputeCaseDto,
  ComputeJobStatus,
} from '../../../../api/generated';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import * as Styled from '../Compute.styled';

export interface CaseInfoTyoe {
  type: string;
  title: string;
  info: string;
  addText: string;
  runText: string;
}

const variogramCaseInfo: CaseInfoTyoe = {
  type: 'Variogram',
  title: 'Variogram cases',
  info: 'You can add multiple cases for the different areas in your model.',
  addText: 'Add Variogram case',
  runText: 'Run all variograms',
};

export const ComputeVariogram = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const [localIndicatorCaseList, setLocalIndicatorCaseList] = useState<
    ComputeCaseDto[]
  >([]);
  const [localNTGCaseList, setLocalNTGCaseList] = useState<ComputeCaseDto[]>(
    [],
  );
  const [
    localContiniousParameterCaseList,
    setLocalContiniousParameterCaseList,
  ] = useState<ComputeCaseDto[]>([]);

  const [showAlert, setAlert] = useState<string>();

  function clearStatus() {
    setAlert(undefined);
  }

  const { data } = useQuery({
    queryKey: ['model-cases', modelId],
    queryFn: () =>
      AnalogueModelComputeCasesService.getApiAnalogueModelsComputeCases(
        modelId as string,
      ),
    enabled: !!token,
  });

  const methodFilter = (name: string) => {
    return data?.data.filter((method) => method.computeMethod.name === name);
  };
  const Indicator = methodFilter('Indicator');
  const NetToGross = methodFilter('Net-To-Gross');
  const ContiniousParameter = methodFilter('Indicator');

  const saveCaseAlert = () => {
    setAlert('New object case saved');
  };

  // TODO: Get the id in a propper way, not hard coded.
  const getMethodId = (method: string) => {
    if (method === 'Indicator') {
      return 'c96fd047-19cc-4e10-9c1e-626a62c22539';
    } else if (method === 'Net-To-Gross') {
      return '2abfea7a-7160-4b0a-85a9-674be70b5f17';
    } else {
      return '88663a7e-0a45-46ce-8ba3-ef4a314e1878';
    }
  };

  const addCase = (methodName: string) => {
    const methodId = getMethodId(methodName);
    const method = {
      computeMethodId: methodId,
      name: methodName,
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

    if (methodName === 'Indicator' && localIndicatorCaseList.length < 1) {
      setLocalIndicatorCaseList([...localIndicatorCaseList, newCase]);
    } else if (methodName === 'Indicator') {
      // TODO: Error handeling, inform user
      // eslint-disable-next-line no-console
      console.log('Just one unsaved case at time');
    }

    if (methodName === 'Net-To-Gross' && localNTGCaseList.length < 1) {
      setLocalNTGCaseList([...localNTGCaseList, newCase]);
    } else if (methodName === 'Net-To-Gross') {
      // TODO: Error handeling, inform user
      // eslint-disable-next-line no-console
      console.log('Just one unsaved case at time');
    }

    if (
      methodName === 'ContiniousParameter' &&
      localContiniousParameterCaseList.length < 1
    ) {
      setLocalContiniousParameterCaseList([
        ...localContiniousParameterCaseList,
        newCase,
      ]);
    } else if (methodName === 'ContiniousParameter') {
      // TODO: Error handeling, inform user
      // eslint-disable-next-line no-console
      console.log('Just one unsaved case at time');
    }
  };

  return (
    <>
      <Styled.Case>
        <ComputeHeader caseInfo={variogramCaseInfo} />

        <Styled.ButtonDiv>
          <Styled.ButtonGroup>
            <Button variant="outlined" onClick={() => addCase('Indicator')}>
              <Icon data={ADD} size={18}></Icon>
              Indicator
            </Button>
            <Button variant="outlined" onClick={() => addCase('Net-To-Gross')}>
              <Icon data={ADD} size={18}></Icon>
              Net-To-Gross
            </Button>
            <Button
              variant="outlined"
              onClick={() => addCase('ContiniousParameter')}
            >
              <Icon data={ADD} size={18}></Icon>
              ContiniousParameter
            </Button>
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

        <CaseGroup
          caseList={
            Indicator !== undefined && Indicator.length > 0 ? Indicator : []
          }
          methodName="Indicator"
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
          localCaseList={localIndicatorCaseList}
          saveCaseAlert={saveCaseAlert}
        />
        <CaseGroup
          caseList={
            NetToGross !== undefined && NetToGross.length > 0 ? NetToGross : []
          }
          methodName="Net-to-gross"
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
          localCaseList={localNTGCaseList}
          saveCaseAlert={saveCaseAlert}
        />

        <CaseGroup
          caseList={
            ContiniousParameter !== undefined && ContiniousParameter.length > 0
              ? ContiniousParameter
              : []
          }
          methodName="ContiniousParameter"
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
          localCaseList={localContiniousParameterCaseList}
          saveCaseAlert={saveCaseAlert}
        />
      </Styled.Case>
      <Snackbar
        open={!!showAlert}
        autoHideDuration={3000}
        onClose={clearStatus}
      >
        {showAlert}
      </Snackbar>
    </>
  );
};
