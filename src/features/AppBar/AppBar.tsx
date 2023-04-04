import { useMsal } from '@azure/msal-react'
import { Menu, Tabs, TopBar } from '@equinor/eds-core-react'
import {
  account_circle as accountCircle,
  notifications,
} from '@equinor/eds-icons'
import MenuIcon from '../../components/MenuIcon/MenuIcon'
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

  const icons = {
    notifications: {
      title: 'Notifications',
      data: notifications,
    },
    userInfo: {
      title: 'UserInfo',
      data: accountCircle,
    },
  }

  return (
    <Styled.TopBar>
      <TopBar.Header>{title}</TopBar.Header>
      <NavigationTabs />
      <TopBar.Actions>
        <Styled.Icons>
          <MenuIcon icon={icons.notifications}>
            <Menu.Item>Notifications (Not ready yet)</Menu.Item>
          </MenuIcon>
          <MenuIcon icon={icons.userInfo}>
            <Menu.Section title="Logged in">
              <Menu.Item>{instance.getActiveAccount()?.name}</Menu.Item>
            </Menu.Section>
          </MenuIcon>
        </Styled.Icons>
      </TopBar.Actions>
    </Styled.TopBar>
  )
}

export default AppBar
