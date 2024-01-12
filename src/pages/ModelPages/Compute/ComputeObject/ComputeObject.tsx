/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Snackbar } from '@equinor/eds-core-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelComputeCasesService,
  EstimateChannelCommand,
  JobsService,
} from '../../../../api/generated';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import * as Styled from '../Compute.styled';
import { CaseInfoTyoe } from '../ComputeVariogram/ComputeVariogram';

const ObjectCaseInfo: CaseInfoTyoe = {
  type: 'Channel',
  title: 'Object cases',
  info: 'You can add multiple cases for the different areas in your model.',
  addText: 'Add object case',
  runText: 'Run all object cases',
};

export const ComputeObject = () => {
  const [refetchKey, setRefetchKey] = useState<number>(0);
  const [showAlert, setAlert] = useState<string>();
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  function clearStatus() {
    setAlert(undefined);
  }
  const setAlertMessage = (message: string) => {
    setAlert(message);
  };

  const uppdateCaseList = () => {
    setRefetchKey(refetchKey + 1);
  };

  const { data } = useQuery({
    queryKey: ['model-cases', modelId, refetchKey],
    queryFn: () =>
      AnalogueModelComputeCasesService.getApiAnalogueModelsComputeCases(
        modelId as string,
      ),
    enabled: !!token,
  });

  const computeObject = useMutation({
    mutationFn: JobsService.postApiJobsComputeChannelEstimations,
  });

  const runComputeObject = async (computeCaseId: string) => {
    if (!modelId) return;
    const requestBody: EstimateChannelCommand = {
      modelId: modelId,
      computeCaseId: computeCaseId,
    };

    const res = await computeObject.mutateAsync(requestBody);

    if (res.success) {
      uppdateCaseList();
      setAlertMessage('Started computing case');
    }
  };

  // Returnerer Cases fra DB
  const channel = data?.data.filter(
    (method) => method.computeMethod.name === 'Channel',
  );

  return (
    <>
      <Styled.Case>
        <ComputeHeader caseInfo={ObjectCaseInfo} />
        <CaseGroup
          caseList={channel !== undefined && channel.length > 0 ? channel : []}
          methodName={ObjectCaseInfo.type}
          setAlertMessage={setAlertMessage}
          runCase={runComputeObject}
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
