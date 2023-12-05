/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EstimateChannelCommand } from '../../../../api/generated/models/EstimateChannelCommand';
import { JobsService } from '../../../../api/generated/services/JobsService';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import * as Styled from '../Compute.styled';
import {
  CaseGroupType,
  CaseInfoTyoe,
  Casetype,
} from '../ComputeVariogram/ComputeVariogram';

export const ComputeObject = () => {
  const [caseGroup, setCaseGroup] = useState<CaseGroupType[]>([
    {
      id: '1',
      type: 'Channel',
      cases: [{ id: '1', name: 'Case 1' }],
    },
  ]);
  const [cases, setCases] = useState<Casetype[]>([
    { id: '1', name: 'Channel' },
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

  const addCase = (id?: string) => {
    if (caseGroup.length === 0) {
      const newCaseGroup: CaseGroupType = {
        id: `${Math.floor(Math.random() * 100)}`,
        type: 'Channel',
        cases: [{ id: '1', name: 'Case 1' }],
      };
      setCaseGroup([...caseGroup, newCaseGroup]);
    } else {
      const newCase: Casetype = {
        id: `${Math.floor(Math.random() * 100)}`,
        name: `Object Case ${cases.length + 1}`,
      };

      const newList = [...caseGroup[0].cases, newCase];
      [...caseGroup][0].cases = newList;

      setCases(newList);
    }
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

    await computeObject.mutateAsync(requestBody);
  };

  return (
    <Styled.Case>
      <ComputeHeader addCase={addCase} caseInfo={ObjectCaseInfo} />
      {cases.length !== 0 ? (
        <CaseGroup
          caseGroup={caseGroup}
          removeCase={removeCase}
          runCase={runComputeObject}
        />
      ) : (
        <Typography>Add a Case</Typography>
      )}
      <Styled.AddCaseButton variant="outlined" onClick={addCase}>
        Add variogram case
      </Styled.AddCaseButton>
    </Styled.Case>
  );
};
