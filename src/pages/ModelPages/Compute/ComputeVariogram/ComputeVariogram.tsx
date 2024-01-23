/* eslint-disable max-lines-per-function */
import { Button, Icon, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useState } from 'react';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useFetchCases } from '../../../../hooks/useFetchCases';
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
  const [showAlert, setAlert] = useState<string>();
  const [triggerAddCase, setTriggerAddCase] = useState<string>();
  const [localCaseList, setLocalCaseList] = useState<Array<string>>([]);

  const updateLocalCaseList = (type: string, add: boolean) => {
    if (add) {
      const temp = localCaseList;
      temp.push(type);
      setLocalCaseList(temp);
    } else {
      const filteredAddCases = localCaseList.filter((i) => i !== type);
      setLocalCaseList(filteredAddCases);
      setTriggerAddCase(undefined);
    }
  };

  function clearStatus() {
    setAlert(undefined);
  }

  const { data } = useFetchCases();

  const methodFilter = (name: string) => {
    return data?.data.filter((method) => method.computeMethod.name === name);
  };
  const Indicator = methodFilter('Indicator');
  const NetToGross = methodFilter('Net-To-Gross');
  const ContiniousParameter = methodFilter('ContiniousParameter');

  const setAlertMessage = (message: string) => {
    setAlert(message);
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
              disabled={
                triggerAddCase?.includes('Indicator') ||
                localCaseList?.includes('Indicator')
              }
            >
              <Icon data={ADD} size={18}></Icon>
              Indicator
            </Button>
            <Button
              variant="outlined"
              onClick={() => addCase('Net-To-Gross')}
              disabled={
                triggerAddCase?.includes('Net-To-Gross') ||
                localCaseList?.includes('Net-To-Gross')
              }
            >
              <Icon data={ADD} size={18}></Icon>
              Net-To-Gross
            </Button>
            <Button
              variant="outlined"
              onClick={() => addCase('ContiniousParameter')}
              disabled={
                triggerAddCase?.includes('ContiniousParameter') ||
                localCaseList?.includes('ContiniousParameter')
              }
            >
              <Icon data={ADD} size={18}></Icon>
              ContiniousParameter
            </Button>
          </Styled.ButtonGroup>
          <Styled.ButtonGroup>
            <Tooltip title={'Functionality not implemented yet.'}>
              <Button
                variant="outlined"
                // eslint-disable-next-line no-console
                onClick={() => console.log('Running all')}
                disabled
              >
                <Icon data={PLAY} size={18}></Icon>
                Run all
              </Button>
            </Tooltip>
          </Styled.ButtonGroup>
        </Styled.ButtonDiv>

        <CaseGroup
          caseList={
            Indicator !== undefined && Indicator.length > 0 ? Indicator : []
          }
          methodName="Indicator"
          triggerAddCase={triggerAddCase}
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
          // eslint-disable-next-line no-console
          runCase={(id: string) => console.log('Running variogram case .... ')}
        />
        <CaseGroup
          caseList={
            NetToGross !== undefined && NetToGross.length > 0 ? NetToGross : []
          }
          methodName="Net-To-Gross"
          triggerAddCase={triggerAddCase}
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
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
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
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
