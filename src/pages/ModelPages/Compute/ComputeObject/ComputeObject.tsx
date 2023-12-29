/* eslint-disable max-lines-per-function */
import { useMsal } from '@azure/msal-react';
import { Snackbar } from '@equinor/eds-core-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AnalogueModelComputeCasesService,
  CreateComputeCaseCommandForm,
  CreateComputeCaseInputSettingsForm,
  EstimateChannelCommand,
  JobsService,
} from '../../../../api/generated';
import { queryClient } from '../../../../auth/queryClient';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import { useAccessToken } from '../../../../hooks/useAccessToken';
import * as Styled from '../Compute.styled';
import { CaseInfoTyoe } from '../ComputeVariogram/ComputeVariogram';

export const ComputeObject = () => {
  const [showAlert, setAlert] = useState<string>();
  const { modelId } = useParams<{ modelId: string }>();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  function clearStatus() {
    setAlert(undefined);
  }
  const saveCaseAlert = () => {
    setAlert('New object case saved');
  };

  const { data } = useQuery({
    queryKey: ['model-cases', modelId],
    queryFn: () =>
      AnalogueModelComputeCasesService.getApiAnalogueModelsComputeCases(
        modelId as string,
      ),
    enabled: !!token,
  });

  const saveCase = useMutation({
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
    onSuccess: (data) => {
      queryClient.refetchQueries();
    },
  });

  const computeObject = useMutation({
    mutationFn: JobsService.postApiJobsComputeChannelEstimations,
  });

  const ObjectCaseInfo: CaseInfoTyoe = {
    type: 'Channel',
    title: 'Object cases',
    info: 'You can add multiple cases for the different areas in your model.',
    addText: 'Add object case',
    runText: 'Run all object cases',
  };

  const runComputeObject = async (computeCaseId: string) => {
    if (!modelId) return;
    const requestBody: EstimateChannelCommand = {
      modelId: modelId,
      computeCaseId: computeCaseId,
    };

    const res = await computeObject.mutateAsync(requestBody);

    if (res.success) setAlert('Started computing case');
  };

  // Returnerer Cases fra DB
  const channel = data?.data.filter(
    (method) => method.computeMethod.name === 'Channel',
  );

  const saveObjectCase = async (
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
      const res = await saveCase.mutateAsync({
        id: modelId,
        requestBody: caseRequestBody,
      });
      return res;
    }
  };

  return (
    <>
      <Styled.Case>
        <ComputeHeader caseInfo={ObjectCaseInfo} />
        <CaseGroup
          caseGroup={channel !== undefined && channel.length > 0 ? channel : []}
          methodName={ObjectCaseInfo.type}
          saveObjectCase={saveObjectCase}
          saveCaseAlert={saveCaseAlert}
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
