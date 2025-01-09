import { useMsal } from '@azure/msal-react';
import { Menu } from '@equinor/eds-core-react';
import { account_circle as accountCircle } from '@equinor/eds-icons';
import MenuIcon from '../../../components/MenuIcon/MenuIcon';
import * as Styled from './Icons.styled';

export const Icons = () => {
  const { instance } = useMsal();

  const icons = {
    userInfo: {
      title: 'UserInfo',
      data: accountCircle,
    },
  };

  return (
    <Styled.Icons>
      <MenuIcon icon={icons.userInfo}>
        <Menu.Item as={'div'} className="menu-item">
          <ul className="user-info">
            <li className="name">{instance.getActiveAccount()?.name}</li>
            <li className="role">[Admin|User|Reader] role</li>
            {/* TODO add proper role name */}
          </ul>
        </Menu.Item>
      </MenuIcon>
    </Styled.Icons>
  );
};
