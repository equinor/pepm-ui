/* eslint-disable prettier/prettier */
import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { theme } from '../../../../../tokens/theme';

export const ColumnCell = styled(Table.Cell)`
  background: ${theme.light.ui.background.light};
  border: solid 0.5px ${theme.light.ui.background.medium};
`;

export const DataCell = styled(Table.Cell)`
  text-align: right;
  border: solid 0.5px ${theme.light.ui.background.medium};

  > div {
    display: flex;
    justify-content: right;
  }
`;
