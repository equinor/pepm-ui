import { Divider } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const CaseResultView = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};
  padding: ${spacings.LARGE};

  @media (min-width: 1400px) {
    width: 80%;
  }
`;

export const CaseResultList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};

  width: 100%;
`;

export const StyledDivider = styled(Divider)`
  margin: ${spacings.MEDIUM} 0;
  max-width: 1108px;
`;

export const Wrapper = styled.div`
  width: 100%;
`;
