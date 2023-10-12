import { SideBar } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';

export const StyledSidebarContent = styled(SideBar.Content)`
  padding-top: ${spacings.MEDIUM};
  > a {
    border-bottom: none;
  }
`;

export const StyledSidebarLink = styled(SideBar.Link)`
  &.activeTab {
    background: none;
    > p {
      color: ${theme.light.primary.resting};
      font-weight: bold;
    }
    > svg {
      fill: ${theme.light.primary.resting};
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
    background: none;

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
  }
`;

export {
  StyledAccordionItem as AccordionItem,
  StyledSidebarContent as SidebarContent,
  StyledSidebarLink as SidebarLink,
};
