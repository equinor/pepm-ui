import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const uploadCell = styled(Table.Cell)`
  alignitems: baseline;
  > form {
    > label {
      > input {
        width: 5%;
      }
    }
  }
`;

export const filesizeCell = styled(Table.Cell)`
  width: 15%;
`;
export const deleteCell = styled(Table.Cell)`
  width: 10%;
`;
