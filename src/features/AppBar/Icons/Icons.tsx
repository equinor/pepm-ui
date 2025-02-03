import { useMsal } from '@azure/msal-react';
import { Menu } from '@equinor/eds-core-react';
import { account_circle as accountCircle } from '@equinor/eds-icons';
import MenuIcon from '../../../components/MenuIcon/MenuIcon';
import * as Styled from './Icons.styled';

export const Icons = () => {
  const { instance, accounts } = useMsal();

  const icons = {
    userInfo: {
      title: 'UserInfo',
      data: accountCircle,
    },
  };

  const displayRoles = () => {
    const roles = accounts[0].idTokenClaims?.roles;

    if (roles === undefined) return 'No roles assigned.';
    if (roles.length === 1) return roles[0] + ' role';

    const splitRoles = roles.map((role) => role?.split('.')[1]);

    if (splitRoles.length === 2) {
      return `${splitRoles[0]} and ${splitRoles[1]} roles`;
    } else {
      return `${splitRoles.slice(0, -1).join(', ')} and ${
        splitRoles[splitRoles.length - 1]
      } roles`;
    }
  };

  return (
    <Styled.Icons>
      <MenuIcon icon={icons.userInfo}>
        <Menu.Item as={'div'} className="menu-item">
          <ul className="user-info">
            <li className="name">{instance.getActiveAccount()?.name}</li>
            <li className="role">{displayRoles()}</li>
          </ul>
        </Menu.Item>
      </MenuIcon>
    </Styled.Icons>
  );
};
