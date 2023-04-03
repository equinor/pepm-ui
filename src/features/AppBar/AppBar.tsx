import { useMsal } from '@azure/msal-react'
import { Menu, Tabs, TopBar } from '@equinor/eds-core-react'
import {
  account_circle as accountCircle,
  notifications,
} from '@equinor/eds-icons'
import { useRef, useState } from 'react'
import IconButton from '../../components/IconButton'
import * as Styled from './AppBar.styled'

const NavigationTabs = () => {
  return (
    <Styled.Tabs>
      <Tabs.List>
        <Tabs.Tab>Add model</Tabs.Tab>
        <Tabs.Tab>Browse</Tabs.Tab>
        <Tabs.Tab>API</Tabs.Tab>
        <Tabs.Tab>About</Tabs.Tab>
      </Tabs.List>
    </Styled.Tabs>
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
    <Styled.TopBar>
      <TopBar.Header>{title}</TopBar.Header>
      <NavigationTabs />
      <TopBar.Actions>
        <Styled.Icons>
          <IconButton
            title={'Notifications'}
            icon={notifications}
            onClick={toggleNotifications}
            ref={notificationsRef}
          />
          <IconButton
            title={'UserInfo'}
            icon={accountCircle}
            onClick={toggleUserInfo}
            ref={userInfoRef}
          />
        </Styled.Icons>
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
    </Styled.TopBar>
  )
}

export { AppBar }
