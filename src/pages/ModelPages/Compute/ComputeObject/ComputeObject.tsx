/* eslint-disable max-lines-per-function */
import { Snackbar } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EstimateObjectCommand, JobsService } from '../../../../api/generated';
import { queryClient } from '../../../../auth/queryClient';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import * as Styled from '../Compute.styled';
import { CaseInfoTyoe } from '../ComputeVariogram/ComputeVariogram';
import { usePepmContextStore } from '../../../../hooks/GlobalState';

const ObjectCaseInfo: CaseInfoTyoe = {
  type: 'Channel',
  title: 'Object cases',
  info: 'You can add multiple cases for the different areas in your model.',
  addText: 'Add object case',
  runText: 'Run all object cases',
};

export const ComputeObject = () => {
  const [showAlert, setAlert] = useState<string>();
  const { modelId } = useParams<{ modelId: string }>();

  function clearStatus() {
    setAlert(undefined);
  }
  const setAlertMessage = (message: string) => {
    setAlert(message);
  };

  const { computeCases } = usePepmContextStore();

  const computeObject = useMutation({
    mutationFn: JobsService.postApiJobsComputeObjectEstimations,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['model-cases'] });
    },
  });

  const runComputeObject = async (computeCaseId: string) => {
    if (!modelId) return;
    const requestBody: EstimateObjectCommand = {
      modelId: modelId,
      computeCaseId: computeCaseId,
    };

    const res = await computeObject.mutateAsync(requestBody);

    if (res.success) {
      setAlertMessage('Started computing case');
    }
  };

  // Returnerer Cases fra DB
  const channel = computeCases.filter(
    (method) => method.computeMethod.name === 'Channel',
  );

  const mouthbar = computeCases.filter(
    (method) => method.computeMethod.name === 'Mouthbar',
  );

  return (
    <>
      <Styled.Case>
        <ComputeHeader caseInfo={ObjectCaseInfo} />
        <CaseGroup
          caseList={channel !== undefined && channel.length > 0 ? channel : []}
          methodName="Channel"
          setAlertMessage={setAlertMessage}
          runCase={runComputeObject}
        />

        <CaseGroup
          caseList={
            mouthbar !== undefined && mouthbar.length > 0 ? mouthbar : []
          }
          methodName="Mouthbar"
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
