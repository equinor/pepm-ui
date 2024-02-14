import { SideBar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

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
export const StyledSidebarLink = styled(SideBar.Link)`
  &.activeTab {
    background: transparent;
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
  }
`;

export const StyledAccordionItem = styled(SideBar.AccordionItem)`
  > div {
    border-left: solid;
    border-color: ${theme.light.ui.background.medium};
    padding-left: ${spacings.MEDIUM_SMALL};
  }

  &.activeTab {
    background: transparent;

    > div {
      border-left: solid;
      border-width: medium;
      border-color: ${theme.light.primary.resting};
      padding-left: ${spacings.MEDIUM};

      > p {
        color: ${theme.light.primary.resting};
        font-weight: bold;
      }
      > svg {
        fill: ${theme.light.primary.resting};
      }
    }
    &:hover {
      background-color: ${theme.light.ui.background.light};
    }
  }
`;

export {
  StyledAccordionItem as AccordionItem,
  StyledBackButton as Back,
  StyledSidebarContent as SidebarContent,
  StyledSidebarLink as SidebarLink,
};
