import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const CaseResultView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: ${spacings.X_LARGE};
  padding: ${spacings.X_LARGE};
`;

export const CaseResultList = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(5, auto);
  grid-row-gap: ${spacings.X_LARGE};

  > * {
    grid-column: 1 / -1;
  }
`;
