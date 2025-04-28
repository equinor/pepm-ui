import { Outlet } from 'react-router-dom';
import * as Styled from '../App.styled';
import AppBar from '../features/AppBar/AppBar';
import { Footer } from '../features/Footer/Footer';
import { ErrorNotifications } from '../components/ErrorBanner/ErrorBanner';

export const Layout = () => {
  return (
    <>
      <AppBar title="PEPM" />
      <Styled.OutletWrapper>
        <Outlet />
        <ErrorNotifications />
      </Styled.OutletWrapper>
      <Footer
        text={`All information is proprietary of Equinor © ${new Date().getFullYear()} Equinor ASA`}
      />
    </>
  );
};

export const GreyLayout = () => {
  return (
    <>
      <AppBar title="PEPM" />
      <Styled.GreyOutletWrapper>
        <Outlet />
        <ErrorNotifications />
      </Styled.GreyOutletWrapper>
      <Footer
        text={`All information is proprietary of Equinor © ${new Date().getFullYear()} Equinor ASA`}
      />
    </>
  );
};
