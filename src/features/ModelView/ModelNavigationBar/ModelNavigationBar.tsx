/* eslint-disable max-lines-per-function */
import { SideBar, SidebarLinkProps } from '@equinor/eds-core-react';
import {
  arrow_back as BACK,
  format_list_bulleted as FORMATLISTBULLET,
  grid_on as GRID,
  IconData,
} from '@equinor/eds-icons';
import { useLocation, useNavigate } from 'react-router-dom';
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

const VariogramIcon = {
  name: 'Variogram',
  prefix: 'string',
  height: '24',
  width: '24',
  svgPathData:
    'M5.99996 8C7.25657 8.00005 7.92861 7.12723 8.29117 6.65634L8.32567 6.61159C8.72108 6.10004 8.83631 6.01523 8.95178 6.00222C8.96291 6.01104 8.97815 6.02428 8.9976 6.04365C9.10055 6.14614 9.24417 6.3484 9.40609 6.69585C9.72843 7.38753 10.0225 8.43183 10.2669 9.74543C10.7523 12.3547 11 15.7899 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 15.7899 13.2477 12.3547 13.7331 9.74543C13.9775 8.43183 14.2716 7.38753 14.5939 6.69585C14.7558 6.3484 14.8995 6.14614 15.0024 6.04365C15.0219 6.02428 15.0371 6.01104 15.0482 6.00222C15.1637 6.01523 15.2789 6.10004 15.6743 6.61159L15.7088 6.65634C16.0714 7.12723 16.7434 8.00005 18 8C18.6812 7.99997 19.1658 7.6446 19.4677 7.35765C19.6198 7.21313 19.7532 7.05934 19.858 6.93608L19.9308 6.8502L19.9309 6.85013C20.0087 6.75814 20.0687 6.68731 20.1318 6.61962C20.1427 6.60791 20.153 6.5972 20.1626 6.5874C20.1976 6.6163 20.241 6.65517 20.2929 6.70711C20.6834 7.09763 21.3166 7.09763 21.7071 6.70711C22.0976 6.31658 22.0976 5.68342 21.7071 5.29289C21.2489 4.83472 20.6729 4.46402 19.9806 4.52762C19.3287 4.58752 18.8938 5.01477 18.6694 5.25534C18.5696 5.36232 18.469 5.48135 18.3874 5.57787L18.3874 5.5779L18.3348 5.64005C18.2353 5.75702 18.1598 5.84152 18.0899 5.90793C18.0313 5.96364 17.9949 5.98904 17.9768 5.99967C17.7877 5.99394 17.6596 5.90973 17.2567 5.38845C17.2384 5.36472 17.2189 5.33922 17.1984 5.31222L17.1983 5.3121C16.8561 4.86303 16.1985 4 15 4C14.4081 4 13.9343 4.28484 13.5913 4.62628C13.2568 4.95934 12.9942 5.3938 12.7811 5.85105C12.4733 6.51156 12.2156 7.33746 12 8.26077C11.7844 7.33746 11.5267 6.51156 11.2189 5.85105C11.0058 5.3938 10.7432 4.95934 10.4087 4.62628C10.0657 4.28484 9.59194 4 9 4C7.80149 4 7.1439 4.86303 6.80173 5.3121C6.78112 5.33915 6.76166 5.36469 6.74329 5.38845C6.34036 5.90973 6.2123 5.99394 6.02318 5.99967C6.00511 5.98904 5.96871 5.96364 5.91009 5.90793C5.84021 5.84152 5.76474 5.75702 5.66522 5.64005L5.61259 5.5779L5.61258 5.5779C5.53102 5.48137 5.43042 5.36233 5.33061 5.25534C5.10619 5.01477 4.67132 4.58752 4.01938 4.52762C3.32706 4.46402 2.75106 4.83472 2.29289 5.29289C1.90237 5.68342 1.90237 6.31658 2.29289 6.70711C2.68342 7.09763 3.31658 7.09763 3.70711 6.70711C3.75904 6.65517 3.80236 6.6163 3.83745 6.5874C3.84701 6.5972 3.85725 6.60791 3.86818 6.61962C3.93133 6.68733 3.99129 6.75818 4.06915 6.8502L4.06915 6.8502L4.14196 6.93608C4.24684 7.05934 4.38023 7.21313 4.5323 7.35765C4.83423 7.6446 5.31878 7.99997 5.99996 8ZM8.93007 5.98704C8.92925 5.98661 8.92884 5.98644 8.92884 5.9865C8.92885 5.98658 8.92997 5.98725 8.9322 5.98825C8.93131 5.98773 8.9306 5.98733 8.93007 5.98704ZM6.03701 6.00643C6.03706 6.00664 6.03517 6.00606 6.03117 6.00406C6.03496 6.00521 6.03696 6.00621 6.03701 6.00643ZM3.95393 6.50834C3.95391 6.5085 3.95176 6.50953 3.94754 6.51092C3.95184 6.50888 3.95395 6.50818 3.95393 6.50834ZM15.0712 5.9865C15.0712 5.98641 15.07 5.98691 15.0678 5.98825C15.07 5.98725 15.0712 5.98658 15.0712 5.9865ZM17.963 6.00643C17.9629 6.00664 17.9648 6.00606 17.9688 6.00406C17.965 6.00521 17.963 6.00621 17.963 6.00643ZM20.0461 6.50834C20.0461 6.5085 20.0482 6.50953 20.0525 6.51092C20.0482 6.50888 20.046 6.50818 20.0461 6.50834Z',
};

export const ModelNavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tab = location.pathname.split('/');
  const path = tab[tab.length - 1];
  const path2 = tab[tab.length - 2];

  const backItems: SidebarLinkProps = {
    label: 'Back',
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
        <Styled.SidebarLink
          label={backItems.label}
          icon={backItems.icon}
          onClick={() => {
            navigate('/');
          }}
        ></Styled.SidebarLink>
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
