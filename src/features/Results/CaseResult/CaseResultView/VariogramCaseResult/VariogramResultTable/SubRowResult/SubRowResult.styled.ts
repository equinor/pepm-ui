import styled from 'styled-components';
import { spacings } from '../../../../../../../tokens/spacings';

export const SubRowDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
  padding: ${spacings.MEDIUM} ${spacings.MEDIUM} ${spacings.X_LARGE}
    calc(${spacings.MEDIUM} + ${spacings.XXXX_LARGE} + ${spacings.MEDIUM});
`;

export const SubRowInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const TableList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.LARGE};
  width: 100%;
`;
