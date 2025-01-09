import { useMsal } from '@azure/msal-react';
import { Button, Menu } from '@equinor/eds-core-react';
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
        <Menu.Section title="Logged in">
          <Menu.Item>{instance.getActiveAccount()?.name}</Menu.Item>
          <Menu.Item as={'div'}>
            <Button onClick={() => instance.logoutRedirect()}>Log out</Button>
          </Menu.Item>
        </Menu.Section>
      </MenuIcon>
    </Styled.Icons>
  );
};
