import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 65%;
  row-gap: ${spacings.LARGE};
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const FileTable = styled(Table)`
  min-width: 256px;
  width: fit-content;
`;

export const TableCell = styled(Table.Cell)`
  white-space: nowrap;
`;
