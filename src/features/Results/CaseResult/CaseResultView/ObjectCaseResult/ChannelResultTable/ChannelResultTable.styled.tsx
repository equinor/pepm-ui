/* eslint-disable prettier/prettier */
import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { theme } from '../../../../../../tokens/theme';

const StyledTable = styled(Table)`
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;

  tr:last-child td {
    border-bottom: 0;
  }
`;

export const ColumnCell = styled(Table.Cell)`
  background: ${theme.light.ui.background.light};
  font-weight: 700;
  border-right: 1px solid ${theme.light.ui.background.medium};
  white-space: nowrap;
`;

export const DataCell = styled(Table.Cell)`
  text-align: right;
  white-space: nowrap;

  &:not(:last-child) {
    border-right: 1px solid ${theme.light.ui.background.medium};
  }

  > div {
    justify-content: right;
  }
`;

export const InfoCell = styled(Table.Cell)`
  text-align: right;
  border-right: 1px solid ${theme.light.ui.background.medium};
`;

export { StyledTable as Table };
