import styled from 'styled-components';
import { theme } from './tokens/theme';

const StyledOutletWrapper = styled.div`
  height: calc(100% - 128px);
  overflow: auto;
  // background-color: ${theme.light.ui.background.light};
`;

export { StyledOutletWrapper as OutletWrapper };
