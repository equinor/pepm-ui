import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: ${spacings.MEDIUM};
`;

export const ArcElCell = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;

  > p {
    padding-right: ${spacings.X_SMALL};
  }
`;
