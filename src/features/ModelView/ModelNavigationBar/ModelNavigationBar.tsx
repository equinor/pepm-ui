/* eslint-disable max-lines-per-function */
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react';
import {
  approve as APPROVE,
  format_list_bulleted as FORMATLISTBULLET,
  IconData,
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

  const menuItems: SidebarLinkProps = {
    label: 'Details',
    icon: FORMATLISTBULLET,
    href: 'details',
    active: false,
  };

  const sidebarCompute: MenuItems = {
    label: 'Compute',
    href: 'variogram',
    icon: settings,
    subItems: [
      {
        label: 'Variogram',
        name: 'variogram',
        href: 'compute/variogram',
        icon: settings,
      },
      {
        label: 'Object',
        name: 'object',
        href: 'compute/object',
        icon: settings,
      },
    ],
  };

  const sidebarResults: MenuItems = {
    label: 'Results',
    href: '',
    icon: APPROVE,
    subItems: [
      {
        label: 'Variogram',
        name: 'variogram',
        href: 'results/variogram',
        icon: APPROVE,
      },
      {
        label: 'Object',
        name: 'object',
        href: 'results/object',
        icon: APPROVE,
      },
    ],
  };

  return (
    <SideBar open>
      <Styled.SidebarContent>
        <Styled.SidebarLink
          className={menuItems.href === path && 'activeTab'}
          label={menuItems.label}
          icon={menuItems.icon}
          active={menuItems.href === path}
          onClick={() => {
            navigate('details');
          }}
        ></Styled.SidebarLink>

        <Styled.SidebarLink
          disabled
          className={
            ('object' === path || 'variogram' === path) &&
            'compute' === path2 &&
            'activeTab'
          }
          isExpanded
          label={sidebarCompute.label}
          icon={sidebarCompute.icon}
          active={
            ('object' === path || 'variogram' === path) && 'compute' === path2
          }
          onClick={() => {
            navigate('compute/variogram');
          }}
        ></Styled.SidebarLink>
        {sidebarCompute.subItems?.map((item) => (
          <Styled.AccordionItem
            className={
              item.name === path && path2 === 'compute' && 'activeTab actTab'
            }
            key={item.label}
            label={item.label}
            active={item.name === path && path2 === 'compute'}
            onClick={() => {
              navigate(`${item.href}`);
            }}
          ></Styled.AccordionItem>
        ))}

        <Styled.SidebarLink
          className={
            ('object' === path || 'variogram' === path) &&
            'results' === path2 &&
            'activeTab'
          }
          label={sidebarResults.label}
          icon={sidebarResults.icon}
          active={
            ('object' === path || 'variogram' === path) && 'results' === path2
          }
          onClick={() => {
            navigate('results/variogram');
          }}
        ></Styled.SidebarLink>
        {sidebarResults.subItems?.map((item) => (
          <Styled.AccordionItem
            className={
              item.name === path && path2 === 'results' && 'activeTab actTab'
            }
            key={item.label}
            label={item.label}
            active={item.name === path && path2 === 'results'}
            onClick={() => {
              navigate(`${item.href}`);
            }}
          ></Styled.AccordionItem>
        ))}
      </Styled.SidebarContent>
    </SideBar>
  );
};
