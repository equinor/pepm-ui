import { Tabs, TopBar } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { spacings } from '../../tokens/spacings'

const StyledTopBar = styled(TopBar)`
  column-gap: ${spacings.X_LARGE};
`

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-end;

  > * {
    display: flex;
    gap: ${spacings.SMALL};

    > [aria-selected='false'] {
      border-color: transparent;
    }
  }
`

const Icons = styled.div`
  display: flex;
  gap: ${spacings.SMALL};
`
export { StyledTopBar as TopBar, StyledTabs as Tabs, Icons }
