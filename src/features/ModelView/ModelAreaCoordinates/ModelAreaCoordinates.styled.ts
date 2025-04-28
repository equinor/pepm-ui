import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.MEDIUM};
  height: 45%;

  > button {
    width: fit-content;
  }
`;

export const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
  padding-bottom: 1rem;
  padding-top: 1rem;
`;
