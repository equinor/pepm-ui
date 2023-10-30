/* eslint-disable max-lines-per-function */
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react';
import {
  IconData,
  // eslint-disable-next-line sort-imports
  approve,
  format_list_bulleted as formatListBullet,
  settings,
} from '@equinor/eds-icons';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const tab = location.pathname.split('/');
  const path = tab[tab.length - 1];
  const path2 = tab[tab.length - 2];

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
          label={menuItems[0].label}
          icon={menuItems[0].icon}
          active={menuItems[0].href === path}
          onClick={() => {
            navigate('details');
          }}
        ></Styled.SidebarLink>

        <Styled.SidebarLink
          disabled
          className={('object' === path || 'variogram' === path) && 'activeTab'}
          isExpanded
          label={sidebarCompute.label}
          icon={sidebarCompute.icon}
          active={'object' === path || 'variogram' === path}
          onClick={() => {
            navigate('variogram');
          }}
        ></Styled.SidebarLink>
        {sidebarCompute.subItems?.map((item) => (
          <Styled.AccordionItem
            className={item.href === path && 'activeTab actTab'}
            key={item.label}
            label={item.label}
            active={item.href === path && item.label === 'Variogram'}
            onClick={() => {
              navigate(`${item.href}`);
            }}
          ></Styled.AccordionItem>
        ))}

        <Styled.SidebarLink
          className={
            (menuItems[1].href === path || menuItems[1].href === path2) &&
            'activeTab'
          }
          label={menuItems[1].label}
          icon={menuItems[1].icon}
          active={menuItems[1].href === path || menuItems[1].href === path2}
          onClick={() => {
            navigate('results');
          }}
        ></Styled.SidebarLink>
      </Styled.SidebarContent>
    </SideBar>
  );
};
