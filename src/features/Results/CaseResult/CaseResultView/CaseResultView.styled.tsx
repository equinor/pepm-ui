import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const CaseResultView = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.XXX_LARGE};
  padding: ${spacings.LARGE};
`;

export const CaseResultList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.X_LARGE};
  width: fit-content;
`;
