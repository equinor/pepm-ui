import styled from 'styled-components';
import { theme } from '../../../../../tokens/theme';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  border: solid 1px ${theme.light.ui.background.medium};
`;
