import styled from 'styled-components';
import { spacings } from '../../../../../tokens/spacings';

export const CaseResultCard = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.XXX_LARGE};

  padding: ${spacings.X_LARGE};

  > div {
    width: 70vw;
  }
`;

export const CaseLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  > table {
    width: 80%;
  }
`;
