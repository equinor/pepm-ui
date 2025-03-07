import { Outlet } from 'react-router-dom';
import * as Styled from '../App.styled';
import AppBar from '../features/AppBar/AppBar';
import { Footer } from '../features/Footer/Footer';

export const Layout = () => {
  return (
    <>
      <AppBar title="PEPM" />
      <Styled.OutletWrapper>
        <Outlet />
      </Styled.OutletWrapper>
      <Footer
        text={`All information is proprietary of Equinor © ${new Date().getFullYear()} Equinor ASA`}
      />
    </>
  );
};
