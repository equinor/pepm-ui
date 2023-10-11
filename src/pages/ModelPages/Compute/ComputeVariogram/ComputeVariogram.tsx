import { CaseCard } from '../../../../features/Compute/ComputeVariogram/CaseCard/CaseCard';
import { ComputeCaseInfoActions } from '../../../../features/Compute/ComputeVariogram/ComputeCaseInfoActions/ComputeCaseInfoActions';
import * as Styled from './ComputeVariogram.styled';

export const ComputeVariogram = () => {
  return (
    <Styled.Case>
      <ComputeCaseInfoActions />
      <Styled.CaseBorder>
        <CaseCard />
      </Styled.CaseBorder>
      <Styled.AddCaseButton variant="outlined">
        Add variogram case
      </Styled.AddCaseButton>
    </Styled.Case>
  );
};
