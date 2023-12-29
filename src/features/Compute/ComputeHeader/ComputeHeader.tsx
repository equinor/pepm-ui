import { Typography } from '@equinor/eds-core-react';
import { CaseInfoTyoe } from '../../../pages/ModelPages/Compute/ComputeVariogram/ComputeVariogram';
import * as Styled from './ComputeHeader.styled';

export const ComputeHeader = ({ caseInfo }: { caseInfo: CaseInfoTyoe }) => {
  return (
    <Styled.CaseOverview>
      <Styled.Text>
        <Typography variant="h2"> {caseInfo.title} </Typography>
        <Typography variant="body_long">{caseInfo.info}</Typography>
      </Styled.Text>
    </Styled.CaseOverview>
  );
};
