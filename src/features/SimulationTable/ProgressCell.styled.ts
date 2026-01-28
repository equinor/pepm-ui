import styled from 'styled-components';
import { LinearProgress, Typography } from '@equinor/eds-core-react';
import { spacings } from '../../tokens/spacings';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.SMALL};
  flex: 1;
`;

export const StyledLinearProgress = styled(LinearProgress)`
  flex: 1;
  min-width: ${spacings.XXXX_LARGE};
`;

export const StyledTypography = styled(Typography)`
  min-width: 6ch;
  text-align: right;
`;
