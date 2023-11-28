import styled from 'styled-components';
import { spacings } from '../tokens/spacings';

export const Table = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > div {
    > table {
      width: 90% !important;
    }
  }
`;
