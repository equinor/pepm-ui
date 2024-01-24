import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  > button {
    width: fit-content;
  }
`;

const DataTable = styled(Table)`
  min-width: 256px;
  width: 65%;
`;

export const NameCell = styled(Table.Cell)`
  width: 20%;
  padding-right: ${spacings.X_LARGE};
`;

export const DataCell = styled(Table.Cell)`
  display: flex;
  flex-direction: row;
  align-items: center;

  > p {
    padding-right: 10px;
  }
`;

export { DataTable as Table };
