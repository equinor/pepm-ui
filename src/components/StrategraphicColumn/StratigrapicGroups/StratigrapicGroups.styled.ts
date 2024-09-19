import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};

  th,
  td {
    white-space: nowrap;
  }
`;

export const StratColCell = styled.div`
  display: flex;
  flex-direction: row;
`;
