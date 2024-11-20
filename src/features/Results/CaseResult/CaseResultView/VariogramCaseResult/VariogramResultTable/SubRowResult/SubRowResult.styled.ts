import styled from 'styled-components';
import { spacings } from '../../../../../../../tokens/spacings';

export const SubRowDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
  padding: ${spacings.X_LARGE} ${spacings.XXXX_LARGE};

  width: 100%;
`;

export const SubRowInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

export const TableList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
  width: 100%;
`;
