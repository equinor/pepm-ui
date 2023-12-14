/* eslint-disable max-lines-per-function */
import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { CaseGroup } from '../../../../features/Compute/CaseGroup/CaseGroup';
import { ComputeHeader } from '../../../../features/Compute/ComputeHeader/ComputeHeader';
import * as Styled from '../Compute.styled';

export interface Casetype {
  id: string;
  name: string;
}

export interface CaseGroupType {
  id: string;
  type: string;
  cases: Casetype[];
}

export interface CaseInfoTyoe {
  title: string;
  info: string;
  addText: string;
  runText: string;
}

export const ComputeVariogram = () => {
  const [caseGroup, setCaseGroup] = useState<CaseGroupType[]>([
    {
      id: '3',
      type: 'Indicator',
      cases: [{ id: '1', name: 'Case 1' }],
    },
    {
      id: '1',
      type: 'Net-to-gross',
      cases: [{ id: '1', name: 'Case 1' }],
    },
    {
      id: '2',
      type: 'Continuous parameter',
      cases: [{ id: '1', name: 'Case 1' }],
    },
  ]);

  const [cases, setCases] = useState<Casetype[]>([
    { id: '3', name: 'Indicator' },
    { id: '1', name: 'Net-to-gross' },
    { id: '2', name: 'Continuous parameter' },
  ]);

  const variogramCaseInfo: CaseInfoTyoe = {
    title: 'Variogram cases',
    info: 'You can add multiple cases for the different areas in your model.',
    addText: 'Add Variogram case',
    runText: 'Run all variograms',
  };

  const addCase = (id: string) => {
    const newCase: Casetype = {
      id: `${Math.floor(Math.random() * 100)}`,
      name: `Case ${cases.length + 1}`,
    };
    const newList = [...caseGroup[0].cases, newCase];
    const item = [...caseGroup].filter((g) => g.id === id);

    item[0].cases = newList;

    setCaseGroup(item);
  };
  const addCaseGroup = () => {
    const newCaseGroup: CaseGroupType = {
      id: `${Math.floor(Math.random() * 100)}`,
      type: 'Net-to-gross',
      cases: [{ id: '1', name: 'Case 1' }],
    };
    setCaseGroup([...caseGroup, newCaseGroup]);
  };

  const removeCase = (id: string) => {
    const newCaseList = cases.filter((c) => c.id !== id);
    setCases(newCaseList);
  };

  return (
    <Styled.Case>
      <ComputeHeader
        addCase={() => addCase('2')}
        caseInfo={variogramCaseInfo}
      />
      {caseGroup.length !== 0 ? (
        <CaseGroup caseGroup={caseGroup} removeCase={removeCase} />
      ) : (
        <Typography>Add a Case</Typography>
      )}
      <Styled.AddCaseButton variant="outlined" onClick={addCaseGroup}>
        Add Net-to-gross case group
      </Styled.AddCaseButton>
    </Styled.Case>
  );
};
