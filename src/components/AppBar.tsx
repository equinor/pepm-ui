import { useMsal } from '@azure/msal-react'
import { Button, Icon, Menu, Tabs, TopBar } from '@equinor/eds-core-react'
import {
  account_circle as accountCircle,
  notifications,
} from '@equinor/eds-icons'
import { useRef, useState } from 'react'
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
  const { instance } = useMsal()
  const [menu, setMenu] = useState<{
    notifications: { isOpen: boolean }
    userInfo: { isOpen: boolean }
  }>({ notifications: { isOpen: false }, userInfo: { isOpen: false } })
  const notificationsRef = useRef<HTMLButtonElement>(null)
  const userInfoRef = useRef<HTMLButtonElement>(null)

  function toggleNotifications() {
    setMenu({
      notifications: { isOpen: !menu.notifications.isOpen },
      userInfo: { isOpen: false },
    })
  }

  function toggleUserInfo() {
    setMenu({
      notifications: { isOpen: false },
      userInfo: { isOpen: !menu.userInfo.isOpen },
    })
  }

  return (
    <StyledTopBar>
      <TopBar.Header>{title}</TopBar.Header>
      <NavigationTabs />
      <TopBar.Actions>
        <Icons>
          <Button variant="ghost_icon">
            <Icon name="notifications" data={notifications} />
          </Button>
          <Button variant="ghost_icon">
            <Icon name="accountCircle" data={accountCircle} />
          </Button>
        </Icons>
      </TopBar.Actions>
      <Menu
        open={menu.notifications.isOpen}
        anchorEl={notificationsRef.current}
      >
        <Menu.Item>Notifications (Not ready yet)</Menu.Item>
      </Menu>
      <Menu open={menu.userInfo.isOpen} anchorEl={userInfoRef.current}>
        <Menu.Section title="Logged in">
          <Menu.Item>{instance.getActiveAccount()?.name}</Menu.Item>
        </Menu.Section>
      </Menu>
    </StyledTopBar>
  )
}

export { AppBar }
