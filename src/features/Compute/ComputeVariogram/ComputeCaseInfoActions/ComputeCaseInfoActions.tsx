import { Button, Typography } from '@equinor/eds-core-react';
import { CaseInfoTyoe } from '../../../../pages/ModelPages/Compute/ComputeVariogram/ComputeVariogram';
import * as Styled from './ComputeCaseInfoActions.styled';

export const ComputeCaseInfoActions = ({
  addCase,
  caseInfo,
}: {
  addCase: () => void;
  caseInfo: CaseInfoTyoe;
}) => {
  return (
    <Styled.CaseOverview>
      <Styled.Text>
        <Typography variant="h2"> {caseInfo.title} </Typography>
        <Typography variant="body_long">{caseInfo.info}</Typography>
      </Styled.Text>
      <Styled.Buttons>
        <Button variant="outlined" onClick={addCase}>
          {caseInfo.addText}
        </Button>
        <Button>{caseInfo.runText}</Button>
      </Styled.Buttons>
    </Styled.CaseOverview>
  );
};
