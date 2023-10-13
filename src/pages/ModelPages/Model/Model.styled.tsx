import styled from 'styled-components';
import { theme } from '../../../tokens/theme';

export const Wrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  overflow: scroll;
`;

export const SidebarWrapper = styled.div`
  heigth: 100%;
  max-width: 256px;
  > div {
    border-color: ${theme.light.ui.background.medium};
  }
`;
