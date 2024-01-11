/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Button, Icon, Snackbar } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnalogueModelComputeCasesService } from '../../../../api/generated';
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
  const [showAlert, setAlert] = useState<string>();
  const [triggerAddCase, setTriggerAddCase] = useState<string>();
  const [localCaseList, setLocalCaseList] = useState<Array<string>>([]);

  const updateLocalCaseList = (type: string, add: boolean) => {
    const temp = localCaseList;
    if (add) {
      temp.push(type);
    } else {
      const filtered = temp.findIndex((e) => e.includes(type));
      temp.splice(filtered, 1);
    }
    setLocalCaseList(temp);
  };

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
  const NetToGross = methodFilter('Net-to-Gross');
  const ContiniousParameter = methodFilter('ContiniusParameter');

  const saveCaseAlert = () => {
    setAlert('New object case saved');
  };

  const addCase = (type: string) => {
    setTriggerAddCase(type);
  };

  return (
    <>
      <Styled.Case>
        <ComputeHeader caseInfo={variogramCaseInfo} />

        <Styled.ButtonDiv>
          <Styled.ButtonGroup>
            <Button
              variant="outlined"
              onClick={() => addCase('Indicator')}
              disabled={localCaseList.includes('Indicator')}
            >
              <Icon data={ADD} size={18}></Icon>
              Indicator
            </Button>
            <Button variant="outlined" onClick={() => addCase('Net-to-Gross')}>
              <Icon data={ADD} size={18}></Icon>
              Net-to-Gross
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
          triggerAddCase={triggerAddCase}
          saveCaseAlert={saveCaseAlert}
          setTriggerAddCase={setTriggerAddCase}
          updateLocalCaseList={updateLocalCaseList}
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
        />
        <CaseGroup
          caseList={
            NetToGross !== undefined && NetToGross.length > 0 ? NetToGross : []
          }
          methodName="Net-to-Gross"
          triggerAddCase={triggerAddCase}
          // localCaseList={localNTGCaseList}
          saveCaseAlert={saveCaseAlert}
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
        />

        <CaseGroup
          caseList={
            ContiniousParameter !== undefined && ContiniousParameter.length > 0
              ? ContiniousParameter
              : []
          }
          methodName="ContiniousParameter"
          triggerAddCase={triggerAddCase}
          saveCaseAlert={saveCaseAlert}
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log(id)}
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
