/* eslint-disable max-lines-per-function */
import { Button, Icon, Snackbar, Tooltip } from '@equinor/eds-core-react';
import { add as ADD, play as PLAY } from '@equinor/eds-icons';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ComputeMethod,
  EstimateVariogramCommand,
  postApiV1JobsComputeVariogramEstimations,
} from '../../../../api/generated';
import { queryClient } from '../../../../auth/queryClient';
import { CaseGroup } from '../../../../features/Compute/Components/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/Components/ComputeHeader/ComputeHeader';
import * as Styled from '../Compute.styled';
import { useIsOwnerOrAdmin } from '../../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../../hooks/GlobalState';

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
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [showAlert, setAlert] = useState<string>();
  const [triggerAddCase, setTriggerAddCase] = useState<ComputeMethod>();
  const [localCaseList, setLocalCaseList] = useState<Array<string>>([]);
  const { modelId } = useParams<{ modelId: string }>();

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

  const { computeCases } = usePepmContextStore();

  const methodFilter = (name: ComputeMethod) => {
    return computeCases.filter((method) => method.computeMethod === name);
  };
  const indicator = methodFilter(ComputeMethod.INDICATOR);
  const netToGross = methodFilter(ComputeMethod.NET_TO_GROSS);
  const continiousParameter = methodFilter(ComputeMethod.CONTINIOUS_PARAMETER);

  const setAlertMessage = (message: string) => {
    setAlert(message);
  };

  const addCase = (type: ComputeMethod) => {
    setTriggerAddCase(type);
  };

  const computeVariogram = useMutation({
    mutationFn: (requestBody: EstimateVariogramCommand) =>
      postApiV1JobsComputeVariogramEstimations({ body: requestBody }),
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

    if (res.data?.success) {
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
              onClick={() => addCase(ComputeMethod.INDICATOR)}
              disabled={
                triggerAddCase?.includes(ComputeMethod.INDICATOR) ||
                localCaseList?.includes(ComputeMethod.INDICATOR) ||
                !isOwnerOrAdmin
              }
            >
              <Icon data={ADD} size={18}></Icon>
              Indicator
            </Button>
            <Button
              variant="outlined"
              onClick={() => addCase(ComputeMethod.NET_TO_GROSS)}
              disabled={
                triggerAddCase?.includes(ComputeMethod.NET_TO_GROSS) ||
                localCaseList?.includes(ComputeMethod.NET_TO_GROSS) ||
                !isOwnerOrAdmin
              }
            >
              <Icon data={ADD} size={18}></Icon>
              Net-to-gross
            </Button>
            <Button
              variant="outlined"
              onClick={() => addCase(ComputeMethod.CONTINIOUS_PARAMETER)}
              disabled={
                triggerAddCase?.includes(ComputeMethod.CONTINIOUS_PARAMETER) ||
                localCaseList?.includes(ComputeMethod.CONTINIOUS_PARAMETER) ||
                !isOwnerOrAdmin
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
            indicator !== undefined && indicator.length > 0 ? indicator : []
          }
          methodName={ComputeMethod.INDICATOR}
          triggerAddCase={triggerAddCase}
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
          runCase={runComputeVariogram}
        />
        <CaseGroup
          caseList={
            netToGross !== undefined && netToGross.length > 0 ? netToGross : []
          }
          methodName={ComputeMethod.NET_TO_GROSS}
          triggerAddCase={triggerAddCase}
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
          runCase={runComputeVariogram}
        />

        <CaseGroup
          caseList={
            continiousParameter !== undefined && continiousParameter.length > 0
              ? continiousParameter
              : []
          }
          methodName={ComputeMethod.CONTINIOUS_PARAMETER}
          triggerAddCase={triggerAddCase}
          setAlertMessage={setAlertMessage}
          updateLocalCaseList={updateLocalCaseList}
          runCase={runComputeVariogram}
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
