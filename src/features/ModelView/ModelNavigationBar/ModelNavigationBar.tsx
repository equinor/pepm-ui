/* eslint-disable max-lines-per-function */
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react';
import {
  arrow_back as BACK,
  format_list_bulleted as FORMATLISTBULLET,
  grid_on as GRID,
  IconData,
} from '@equinor/eds-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { VariogramIcon } from '../../../assets/VaritogramIcon';
import * as Styled from './ModelNavigationBar.styled';

type MenuItems = SidebarLinkProps & {
  subItems?: Array<{
    label: string;
    name: string;
    type: string;
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

  const backItems: SidebarLinkProps = {
    label: 'Back to models',
    icon: BACK,
    href: '/',
    active: false,
  };
  const menuItems: SidebarLinkProps = {
    label: 'Details',
    icon: FORMATLISTBULLET,
    href: 'details',
    active: false,
  };

  const objectItems: MenuItems = {
    label: 'Object',
    href: '',
    icon: GRID,
    subItems: [
      {
        label: 'Compute settings',
        name: 'object',
        type: 'compute',
        href: 'compute/object',
        icon: GRID,
      },
      {
        label: 'Results',
        name: 'object',
        type: 'results',
        href: 'results/object',
        icon: GRID,
      },
    ],
  };

  const variogramItems: MenuItems = {
    label: 'Variogram',
    href: '',
    icon: VariogramIcon,
    subItems: [
      {
        label: 'Compute settings',
        name: 'variogram',
        type: 'compute',
        href: 'compute/variogram',
        icon: VariogramIcon,
      },
      {
        label: 'Results',
        name: 'variogram',
        type: 'results',
        href: 'results/variogram',
        icon: VariogramIcon,
      },
    ],
  };

  return (
    <SideBar open>
      <Styled.SidebarContent>
        <Styled.Back
          label={backItems.label}
          icon={backItems.icon}
          onClick={() => {
            navigate('/');
          }}
        ></Styled.Back>
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
          isExpanded
          label={objectItems.label}
          icon={objectItems.icon}
          onClick={() => {
            navigate('compute/object');
          }}
        ></Styled.SidebarLink>
        {objectItems.subItems?.map((item) => (
          <Styled.AccordionItem
            className={
              item.name === path && path2 === item.type && 'activeTab actTab'
            }
            key={item.label}
            label={item.label}
            active={item.name === path && path2 === item.type}
            onClick={() => {
              navigate(`${item.href}`);
            }}
          ></Styled.AccordionItem>
        ))}

        <Styled.SidebarLink
          label={variogramItems.label}
          icon={variogramItems.icon}
          onClick={() => {
            navigate('compute/variogram');
          }}
        ></Styled.SidebarLink>
        {variogramItems.subItems?.map((item) => (
          <Styled.AccordionItem
            className={
              item.name === path && path2 === item.type && 'activeTab actTab'
            }
            key={item.label}
            label={item.label}
            active={item.name === path && path2 === item.type}
            onClick={() => {
              navigate(`${item.href}`);
            }}
          ></Styled.AccordionItem>
        ))}
      </Styled.SidebarContent>
    </SideBar>
  );
};
