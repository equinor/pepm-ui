import { useMsal } from '@azure/msal-react'
import { Menu, Tabs, TopBar } from '@equinor/eds-core-react'
import {
  account_circle as accountCircle,
  notifications,
} from '@equinor/eds-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '../../components/MenuIcon/MenuIcon'
import { tabs } from '../../router'
import * as Styled from './AppBar.styled'

const NavigationTabs = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<number>()

  function clickTab(tab: number) {
    navigate(tabs[tab].path)
    setActiveTab(tab)
  }

  return (
    <Styled.Tabs activeTab={activeTab} onChange={clickTab}>
      <Tabs.List>
        {tabs.map((tab) => (
          // TODO: Ensure that default accessibility concerns are met
          // This doesn't support browser's default behaviour to "open in new tab"
          <Tabs.Tab key={tab.title}>{tab.title}</Tabs.Tab>
        ))}
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
