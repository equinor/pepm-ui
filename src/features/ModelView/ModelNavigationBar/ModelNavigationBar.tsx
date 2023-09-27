/* eslint-disable max-lines-per-function */
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react'
import {
  IconData,
  // eslint-disable-next-line sort-imports
  approve,
  format_list_bulleted as formatListBullet,
  settings,
} from '@equinor/eds-icons'
import { useLocation } from 'react-router-dom'
import * as Styled from './ModelNavigationBar.styled'

type MenuItems = SidebarLinkProps & {
  subItems?: Array<{
    label: string
    name: string
    href: string
    icon: IconData
  }>
}

export const ModelNavigationBar = () => {
  const menuItems: SidebarLinkProps[] = [
    {
      label: 'Details',
      icon: formatListBullet,
      href: 'details',
      active: false,
    },

    {
      label: 'Results',
      icon: approve,
      href: 'results',
      active: false,
    },
  ]

  const sidebarCompute: MenuItems = {
    label: 'Compute',
    href: 'variogram',
    icon: settings,
    subItems: [
      {
        label: 'Variogram',
        name: 'variogram',
        href: 'variogram',
        icon: settings,
      },
      {
        label: 'Object',
        name: 'object',
        href: 'object',
        icon: settings,
      },
    ],
  }

  const location = useLocation()
  const tab = location.pathname.split('/')
  console.log(tab[tab.length - 1])
  console.log(tab[tab.length - 1] === sidebarCompute.href)

  return (
    <SideBar open>
      <SideBar.Content>
        <SideBar.Toggle />
        {menuItems.map((m) => (
          <Styled.StyledSidebarLink
            className={m.href === tab[tab.length - 1] && 'activeTab'}
            key={m.label}
            {...m}
            active={m.href === tab[tab.length - 1]}
          ></Styled.StyledSidebarLink>
        ))}
        <Styled.StyledSidebarLink
          disabled
          className={
            'object' === tab[tab.length - 1] ||
            'variogram' === tab[tab.length - 1]
              ? 'activeTab'
              : ''
          }
          isExpanded
          label={sidebarCompute.label}
          icon={sidebarCompute.icon}
          active={
            'object' === tab[tab.length - 1] ||
            'variogram' === tab[tab.length - 1]
          }
          href={'variogram'}
        ></Styled.StyledSidebarLink>
        {sidebarCompute.subItems?.map((item) => (
          <Styled.StyledAccordianItem
            className={item.href === tab[tab.length - 1] && 'activeTab actTab'}
            key={item.label}
            label={item.label}
            active={
              item.href === tab[tab.length - 1] && item.label === 'Variogram'
            }
            href={item.href}
          ></Styled.StyledAccordianItem>
        ))}
      </SideBar.Content>
    </SideBar>
  )
}
