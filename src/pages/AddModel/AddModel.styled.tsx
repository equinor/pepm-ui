import { SideBar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../tokens/spacings';
import { theme } from '../../tokens/theme';

export const PageLayout = styled.div`
  display: flex;
  fled-direction: row;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  fled-direction: row;

  padding: ${spacings.XX_LARGE} ${spacings.X_LARGE};
`;

export const StyledSidebarContent = styled(SideBar.Content)`
  padding-top: ${spacings.MEDIUM};
  overflow: hidden;
  > a {
    border-bottom: none;
  }
`;

export const StyledBackButton = styled(SideBar.Link)`
  > p {
    color: ${theme.light.primary.resting};
    font-weight: bold;
  }
  > svg {
    fill: ${theme.light.primary.resting};
  }
  &:hover {
    background-color: ${theme.light.ui.background.light};
  }

  padding: 0 0 ${spacings.MEDIUM} ${spacings.SMALL};
`;

export { StyledBackButton as Back, StyledSidebarContent as SidebarContent };
