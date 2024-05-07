import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const UploadCell = styled(Table.Cell)`
  alignitems: baseline;
  > form {
    > label {
      > input {
        width: 5%;
      }
    }
  }
`;

export const FilesizeCell = styled(Table.Cell)`
  width: 15%;
`;
export const DeleteCell = styled(Table.Cell)`
  width: 10%;
`;
