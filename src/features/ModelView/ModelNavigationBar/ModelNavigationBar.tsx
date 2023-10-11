/* eslint-disable max-lines-per-function */
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react';
import {
  IconData,
  // eslint-disable-next-line sort-imports
  approve,
  format_list_bulleted as formatListBullet,
  settings,
} from '@equinor/eds-icons';
import { useLocation } from 'react-router-dom';
import * as Styled from './ModelNavigationBar.styled';

type MenuItems = SidebarLinkProps & {
  subItems?: Array<{
    label: string;
    name: string;
    href: string;
    icon: IconData;
  }>;
};

export const ModelNavigationBar = () => {
  const location = useLocation();
  const tab = location.pathname.split('/');
  const path = tab[tab.length - 1];

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
  ];

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
  };

  return (
    <SideBar open>
      <Styled.SidebarContent>
        <Styled.SidebarLink
          className={menuItems[0].href === path && 'activeTab'}
          key={menuItems[0].label}
          {...menuItems[0]}
          active={menuItems[0].href === path}
        ></Styled.SidebarLink>
        <Styled.SidebarLink
          disabled
          className={('object' === path || 'variogram' === path) && 'activeTab'}
          isExpanded
          label={sidebarCompute.label}
          icon={sidebarCompute.icon}
          active={'object' === path || 'variogram' === path}
          href={'variogram'}
        ></Styled.SidebarLink>
        {sidebarCompute.subItems?.map((item) => (
          <Styled.AccordionItem
            className={item.href === path && 'activeTab actTab'}
            key={item.label}
            label={item.label}
            active={item.href === path && item.label === 'Variogram'}
            href={item.href}
          ></Styled.AccordionItem>
        ))}
        <Styled.SidebarLink
          className={menuItems[1].href === path && 'activeTab'}
          key={menuItems[1].label}
          {...menuItems[1]}
          active={menuItems[1].href === path}
        ></Styled.SidebarLink>
      </Styled.SidebarContent>
    </SideBar>
  );
};
