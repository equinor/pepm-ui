import styled from 'styled-components';

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
