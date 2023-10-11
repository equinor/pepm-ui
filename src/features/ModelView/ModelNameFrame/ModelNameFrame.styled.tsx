import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const NameFrame = styled.div`
  width: 100%;
  padding: ${spacings.LARGE} 0;
  background-color: ${theme.light.ui.background.light};

  > h1 {
    margin: 0;
    padding: 0 ${spacings.X_LARGE};
    font-weight: normal;
  }
`;
