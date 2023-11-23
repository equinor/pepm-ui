import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const FileTable = styled.div`
  width: 100%;
  min-width: 256px;
  max-width: 100%;

  > table {
    width: 85%;

    > thead,
    tbody {
      > tr {
        > .table-row {
        }

        > .table-first-col {
          width: 80%;
          padding-right: ${spacings.X_LARGE};
        }
      }
    }
  }
`;
