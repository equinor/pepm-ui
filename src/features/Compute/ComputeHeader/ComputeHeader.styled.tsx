import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const CaseOverview = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  row-gap: ${spacings.MEDIUM};
`;
