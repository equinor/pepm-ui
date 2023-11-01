/* eslint-disable prettier/prettier */
import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../tokens/spacings';
import { theme } from '../../../../../tokens/theme';

export const ResultCard = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.LARGE};

  padding: ${spacings.X_LARGE};
`;

export const CaseTable = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};

  width: 100%;
`;

export const ColumnCell = styled(Table.Cell)`
  background: ${theme.light.ui.background.light};
`;

export const DataCell = styled(Table.Cell)`
  text-align: right;

  > div {
    display: flex;
    justify-content: right;
  }
`;
