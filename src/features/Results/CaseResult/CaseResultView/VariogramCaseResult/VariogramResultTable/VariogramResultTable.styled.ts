import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Table = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > div {
    > table {
      min-width: 1050px !important;
    }
    > div {
      margin-top: 2rem;
      min-width: 1050px !important;
    }

    @media (max-width: 1500px) {
      > table {
        min-width: 100% !important;
      }
      > div {
        min-width: 100% !important;
      }
    }
  }
`;
