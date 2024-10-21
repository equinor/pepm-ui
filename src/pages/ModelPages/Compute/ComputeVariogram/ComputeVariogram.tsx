/* eslint-disable max-lines-per-function */
import { Button, Icon, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  EstimateVariogramCommand,
  JobsService,
} from '../../../../api/generated';
import { queryClient } from '../../../../auth/queryClient';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useFetchCases } from '../../../../hooks/useFetchCases';
import * as Styled from '../Compute.styled';
import { useFetchModel } from '../../../../hooks/useFetchModel';
import { isOwnerOrAdmin } from '../../../../utils/IsOwnerOrAdmin';

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
  const { modelId } = useParams<{ modelId: string }>();
  const model = useFetchModel();

  const isOwner = () => {
    return isOwnerOrAdmin(model?.data?.data.createdBy);
  };

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

  const computeVariogram = useMutation({
    mutationFn: JobsService.postApiJobsComputeVariogramEstimations,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['model-cases'] });
    },
  });

  const runComputeVariogram = async (computeCaseId: string) => {
    if (!modelId) return;
    const requestBody: EstimateVariogramCommand = {
      modelId: modelId,
      computeCaseId: computeCaseId,
    };

    const res = await computeVariogram.mutateAsync(requestBody);

    if (res.success) {
      setAlertMessage('Started computing case');
    }
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
                localCaseList?.includes('Indicator') ||
                !isOwner()
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
                localCaseList?.includes('Net-To-Gross') ||
                !isOwner()
              }
            >
              <Icon data={ADD} size={18}></Icon>
              Net-to-gross
            </Button>
            <Button
              variant="outlined"
              onClick={() => addCase('ContiniousParameter')}
              disabled={
                triggerAddCase?.includes('ContiniousParameter') ||
                localCaseList?.includes('ContiniousParameter') ||
                !isOwner()
              }
            >
              <Icon data={ADD} size={18}></Icon>
              Continious parameter
            </Button>
          </Styled.ButtonGroup>
          <Styled.ButtonGroup>
            <Tooltip title={'Functionality not implemented yet.'}>
              <Button
                variant="outlined"
                // eslint-disable-next-line no-console
                onClick={() => runComputeVariogram}
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
          runCase={runComputeVariogram}
          isOwner={isOwner}
        />
        <CaseGroup
          caseList={
            NetToGross !== undefined && NetToGross.length > 0 ? NetToGross : []
          }
          methodName="Net-To-Gross"
          triggerAddCase={triggerAddCase}
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
          runCase={runComputeVariogram}
          isOwner={isOwner}
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
          runCase={runComputeVariogram}
          isOwner={isOwner}
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
