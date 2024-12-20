import { Table } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../../../../../tokens/spacings';

export const HeaderContent = styled(Table.Row)`
  height: ${spacings.MEDIUM};
`;
export const TableWrapper = styled.div`
  width: 100%;

  .variogram-models-table {
    width: 100%;
    border: 1px solid #dcdcdc;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .align-right {
    text-align: right;
  }

  .unit {
    font-weight: 400;
    display: inline-block;
    margin-inline-start: ${spacings.X_SMALL};
  }
`;
