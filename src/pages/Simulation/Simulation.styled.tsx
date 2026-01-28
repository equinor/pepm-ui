import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7f7f7;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${spacings.LARGE};
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: ${spacings.LARGE};
  max-width: 1600px;
  width: 100%;
  margin: 0;
  overflow: visible;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const TopRow = styled.div`
  display: contents;
`;

export const FullWidthRow = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
  overflow: visible;
`;

export const FabWrapper = styled.div`
  position: fixed;
  bottom: ${spacings.XX_LARGE};
  right: ${spacings.XX_LARGE};
  z-index: 100;
`;
