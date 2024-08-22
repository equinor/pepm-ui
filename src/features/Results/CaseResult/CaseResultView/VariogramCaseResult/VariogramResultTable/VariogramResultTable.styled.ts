import { Dialog } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../tokens/spacings';

export const Table = styled.div`
  overflow-x: auto;
  padding-bottom: ${spacings.MEDIUM};

  > div {
    overflow-y: hidden;

    > table {
      > thead {
        > tr {
          > th {
            vertical-align: baseline !important;
          }
        }
      }
    }
    > div {
      margin-top: 2rem;
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  min-width: 500px;
  min-height: 500px;
`;

export const Column = styled.span`
  white-space: nowrap;
`;

export const Quality = styled.span`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export { StyledDialog as Dialog };
