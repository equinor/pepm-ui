import { Tabs, TopBar } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledTopBar = styled(TopBar)`
  height: 100%;
  padding-bottom: 0;
  padding-top: 0;
`

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-end;

  > * {
    > [aria-selected='false'] {
      border-color: transparent;
    }
  }
`

const Icons = styled.div`
  display: flex;
  gap: 0.5em;
`
export { StyledTopBar as TopBar, StyledTabs as Tabs, Icons }
