import { SideBar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const SidebarWrapper = styled.aside`
  height: 100%;
  max-width: 256px;
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
