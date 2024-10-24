/* eslint-disable max-lines-per-function */
import { Snackbar } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EstimateObjectCommand, JobsService } from '../../../../api/generated';
import { queryClient } from '../../../../auth/queryClient';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useFetchCases } from '../../../../hooks/useFetchCases';
import * as Styled from '../Compute.styled';
import { CaseInfoTyoe } from '../ComputeVariogram/ComputeVariogram';
import { isOwnerOrAdmin } from '../../../../utils/IsOwnerOrAdmin';
import { useFetchModel } from '../../../../hooks/useFetchModel';

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
  const model = useFetchModel();

  function clearStatus() {
    setAlert(undefined);
  }
  const setAlertMessage = (message: string) => {
    setAlert(message);
  };

  const { data } = useFetchCases();

  const isOwner = () => {
    return isOwnerOrAdmin(model?.data?.data.createdBy);
  };

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
  const channel = data?.data.filter(
    (method) => method.computeMethod.name === 'Channel',
  );

  const mouthbar = data?.data.filter(
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
          isOwner={isOwner}
        />

        <CaseGroup
          caseList={
            mouthbar !== undefined && mouthbar.length > 0 ? mouthbar : []
          }
          methodName="Mouthbar"
          setAlertMessage={setAlertMessage}
          runCase={runComputeObject}
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
