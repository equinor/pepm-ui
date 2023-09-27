import { SideBar } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { spacings } from '../../../tokens/spacings'
import { theme } from '../../../tokens/theme'

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
`

export const StyledAccordian = styled(SideBar.Accordion)`
  &.activeTab {
    background: none;
    > p {
      color: ${theme.light.primary.resting};
      font-weight: bold;
    }
    > svg {
      fill: ${theme.light.primary.resting};
      opacity: 1;
    }

    .Icon__StyledSvg-sc-6evbi1-0 {
    }
  }
`

export const StyledAccordianItem = styled(SideBar.AccordionItem)`
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
      padding-left: 20px;

      > p {
        color: ${theme.light.primary.resting};
        font-weight: bold;
      }
      > svg {
        fill: ${theme.light.primary.resting};
      }
    }
  }
`
