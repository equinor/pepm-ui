import { TopBar } from '@equinor/eds-core-react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './AppBar.styled';
import { Icons } from './Icons/Icons';
import { Navigation } from './Navigation/Navigation';
const AppBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Styled.TopBar>
      <Styled.Header
        onClick={() => {
          navigate('');
        }}
      >
        {title}
      </Styled.Header>
      <Navigation />
      <TopBar.Actions>
        <Icons />
      </TopBar.Actions>
    </Styled.TopBar>
  );
};

export default AppBar;
