import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Table = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > div {
    > table {
      min-width: 1150px;
    }
    > div {
      margin-top: 2rem;
      min-width: 1150px;
    }

    @media (max-width: 1750px) {
      > table {
        min-width: 100% !important;
      }
      > div {
        min-width: 100% !important;
      }
    }
  }
`;
