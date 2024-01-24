import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  width: 75%;
`;

export const FileTable = styled(Table)`
  width: 100%;
  min-width: 256px;
`;

export const TableCell = styled(Table.Cell)`
  width: 80%;
  padding-right: ${spacings.X_LARGE};
`;
