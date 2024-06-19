import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const Table = styled.div`
  padding-bottom: ${spacings.MEDIUM};
  max-width: 1750px;
  > div {
    height: 100%;
    overflow: hidden;
    > table {
      min-width: 90% !important;

      > thead {
        > tr {
          > th {
            vertical-align: middle !important;
          }
        }
      }
    }
    > div {
      margin-top: 2rem;
      min-width: 90% !important;
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

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: ${spacings.SMALL};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  > p {
    margin: 0;
    padding-right: ${spacings.X_SMALL};
  }
`;

export const Upload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: ${spacings.X_SMALL};
  > p {
    margin: 0;
  }
`;
