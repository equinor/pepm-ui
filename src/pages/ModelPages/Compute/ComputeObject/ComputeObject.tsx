import { Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EstimateChannelCommand } from '../../../../api/generated/models/EstimateChannelCommand';
import { JobsService } from '../../../../api/generated/services/JobsService';
import { CaseCard } from '../../../../features/Compute/ComputeVariogram/CaseCard/CaseCard';
import { ComputeCaseInfoActions } from '../../../../features/Compute/ComputeVariogram/ComputeCaseInfoActions/ComputeCaseInfoActions';
import { CaseInfoTyoe, Casetype } from '../ComputeVariogram/ComputeVariogram';
import * as Styled from '../ComputeVariogram/ComputeVariogram.styled';

export const ComputeObject = () => {
  const [cases, setCases] = useState<Casetype[]>([
    { id: '1', name: 'Variogram Case 1' },
  ]);
  const { modelId } = useParams<{ modelId: string }>();

  const computeObject = useMutation({
    mutationFn: JobsService.postApiJobsComputeChannelEstimations,
  });

  const ObjectCaseInfo: CaseInfoTyoe = {
    title: 'Object cases',
    info: 'You can add multiple cases for the different areas in your model.',
    addText: 'Add object case',
    runText: 'Run all object cases',
  };

  const addCase = () => {
    const newCase: Casetype = {
      id: `${Math.floor(Math.random() * 100)}`,
      name: `Object Case ${cases.length + 1}`,
    };
    setCases([...cases, newCase]);
  };

  const removeCase = (id: string) => {
    const newCaseList = cases.filter((c) => c.id !== id);
    setCases(newCaseList);
  };

  const runComputeObject = async () => {
    if (!modelId) return;
    const requestBody: EstimateChannelCommand = {
      modelId: modelId,
    };

    const runCompute = await computeObject.mutateAsync(requestBody);

    console.log(runCompute);
    console.log(computeObject);
  };

  return (
    <Styled.Case>
      <ComputeCaseInfoActions addCase={addCase} caseInfo={ObjectCaseInfo} />
      {cases.length !== 0 ? (
        cases.map((c) => (
          <CaseCard
            key={c.id}
            id={c.id}
            name={c.name}
            caseType={'object'}
            removeCase={removeCase}
            runCase={runComputeObject}
          />
        ))
      ) : (
        <Typography>Add a Case</Typography>
      )}
      <Styled.AddCaseButton variant="outlined" onClick={addCase}>
        Add variogram case
      </Styled.AddCaseButton>
    </Styled.Case>
  );
};
