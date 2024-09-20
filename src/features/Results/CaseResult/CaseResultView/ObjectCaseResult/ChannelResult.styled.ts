import styled from 'styled-components';
import { spacings } from '../../../../../tokens/spacings';
import { theme } from '../../../../../tokens/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${spacings.LARGE};
  border: solid 0.5px ${theme.light.ui.background.medium};
`;
