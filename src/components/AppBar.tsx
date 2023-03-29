import { Icon, Tabs, TopBar } from '@equinor/eds-core-react'
import {
  account_circle as accountCircle,
  notifications,
} from '@equinor/eds-icons'
import styled from 'styled-components'
import { theme } from '../theme'

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
  padding-left: 1.5em;
  gap: 1.5em;
  color: ${theme.light.primary.resting};
`

const NavigationTabs = () => {
  return (
    <StyledTabs>
      <Tabs.List>
        <Tabs.Tab>Add model</Tabs.Tab>
        <Tabs.Tab>Browse</Tabs.Tab>
        <Tabs.Tab>API</Tabs.Tab>
        <Tabs.Tab>About</Tabs.Tab>
      </Tabs.List>
    </StyledTabs>
  )
}

const AppBar = ({ title }: { title: string }) => {
  return (
    <StyledTopBar>
      <TopBar.Header>{title}</TopBar.Header>
      <NavigationTabs />
      <TopBar.Actions>
        <Icons>
          <Icon name="notifications" data={notifications} />
          <Icon name="accountCircle" data={accountCircle} />
        </Icons>
      </TopBar.Actions>
    </StyledTopBar>
  )
}

export { AppBar }
