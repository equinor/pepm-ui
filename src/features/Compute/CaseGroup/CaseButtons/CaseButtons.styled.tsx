import styled from 'styled-components';
import { spacings } from '../../../../tokens/spacings';

export const ButtonDiv = styled.div`
  display: flex;
  flex: row;
  flex-direction: row;
  column-gap: ${spacings.SMALL};
  align-items: end;

  > button {
    width: ${spacings.COMPUTE_BUTTON};
  }
`;
