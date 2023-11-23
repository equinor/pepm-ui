import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Metadata = styled.div`
  width: 100%;
  min-width: 256px;
`;
export const MetadataTable = styled.div`
  width: 100%;
  min-width: 256px;

  > table {
    width: 85%;

    > tbody {
      > tr {
        > .table-first-col {
          width: 20%;
          padding-right: ${spacings.X_LARGE};
        }

        > .table-second-col {
          display: flex;
          flex-direction: row;
          align-items: center;

          > p {
            padding-right: 10px;
          }
        }
      }
    }
  }
`;
