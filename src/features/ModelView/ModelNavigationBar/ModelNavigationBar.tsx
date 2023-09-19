import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react'
import {
  approve,
  format_list_bulleted as formatListBullet,
  settings,
} from '@equinor/eds-icons'
import { useLocation } from 'react-router-dom'

export const ModelNavigationBar = () => {
  const menuItems: SidebarLinkProps[] = [
    {
      label: 'Details',
      icon: formatListBullet,
      href: 'details',
      active: false,
    },
    {
      label: 'Compute',
      icon: settings,
      href: 'compute',
      active: false,
    },
    {
      label: 'Results',
      icon: approve,
      href: 'results',
      active: false,
    },
  ]

  const location = useLocation()
  const tab = location.pathname.split('/')

  return (
    <SideBar open>
      <SideBar.Content>
        <SideBar.Toggle />
        {menuItems.map((m) => (
          <SideBar.Link
            key={m.label}
            {...m}
            active={m.href === tab[tab.length - 1]}
          />
        ))}
      </SideBar.Content>
    </SideBar>
  )
}
