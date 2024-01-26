import { TopBar } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './AppBar.styled';
import { Icons } from './Icons/Icons';
// import { Navigation } from './Navigation/Navigation';

const AppBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <Styled.TopBar>
      <Styled.Header
        onClick={() => {
          navigate('');
        }}
      >
        {title}
      </Styled.Header>
      {/* <Navigation /> */}
      <TopBar.Actions>
        <Icons />
      </TopBar.Actions>
    </Styled.TopBar>
  );
};

export default AppBar;
