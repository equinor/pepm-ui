/* eslint-disable prettier/prettier */
import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { theme } from '../../../../../../tokens/theme';

const StyledTable = styled(Table)`
  width: 100%;
  max-width: 950px;
`;
export const ColumnCell = styled(Table.Cell)`
  background: ${theme.light.ui.background.light};
  border: solid 0.5px ${theme.light.ui.background.medium};
`;

export const DataCell = styled(Table.Cell)`
  text-align: right;
  border: solid 0.5px ${theme.light.ui.background.medium};
  width: 25%;
  > div {
    display: flex;
    justify-content: right;
  }
`;

export const InfoCell = styled(Table.Cell)`
  text-align: right;
  border: solid 0.5px ${theme.light.ui.background.medium};
  width: 20%;
  > div {
    display: flex;
    justify-content: right;
  }
`;

export { StyledTable as Table };
