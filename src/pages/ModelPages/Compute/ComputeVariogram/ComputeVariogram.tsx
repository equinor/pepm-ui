import { Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { CaseCard } from '../../../../features/Compute/ComputeVariogram/CaseCard/CaseCard';
import { ComputeCaseInfoActions } from '../../../../features/Compute/ComputeVariogram/ComputeCaseInfoActions/ComputeCaseInfoActions';
import * as Styled from './ComputeVariogram.styled';

export interface Casetype {
  id: string;
  name: string;
}

export interface CaseInfoTyoe {
  title: string;
  info: string;
  addText: string;
  runText: string;
}

export const ComputeVariogram = () => {
  const [cases, setCases] = useState<Casetype[]>([
    { id: '1', name: 'Variogram Case 1' },
  ]);

  const variogramCaseInfo: CaseInfoTyoe = {
    title: 'Variogram cases',
    info: 'You can add multiple cases for the different areas in your model.',
    addText: 'Add Variogram case',
    runText: 'Run all variograms',
  };

  const addCase = () => {
    const newCase: Casetype = {
      id: `${Math.floor(Math.random() * 100)}`,
      name: `Variogram Case ${cases.length + 1}`,
    };
    setCases([...cases, newCase]);
  };

  const removeCase = (id: string) => {
    const newCaseList = cases.filter((c) => c.id !== id);
    setCases(newCaseList);
  };

  return (
    <Styled.Case>
      <ComputeCaseInfoActions addCase={addCase} caseInfo={variogramCaseInfo} />
      {cases.length !== 0 ? (
        cases.map((c) => (
          <CaseCard
            key={c.id}
            id={c.id}
            name={c.name}
            caseType={'variogram'}
            removeCase={removeCase}
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
