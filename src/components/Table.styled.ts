import styled from 'styled-components';
import { spacings } from '../tokens/spacings';

export const Table = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > div {
    > table {
      min-width: 90% !important;
    }
    > div {
      min-width: 90% !important;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: ${spacings.SMALL};
`;
