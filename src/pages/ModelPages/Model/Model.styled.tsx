import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const EmptyPage = styled.div`
  background-color: ${theme.light.ui.background.light};
  display: grid;
  place-items: center;
  height: 100%;

  .loading {
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: ${spacings.MEDIUM};
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 16rem 1fr;
`;

export const ContentWrapper = styled.div`
  grid-area: content;
`;

export const SidebarWrapper = styled.div`
  grid-area: sidebar;
`;
