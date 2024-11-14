import { useMsal } from '@azure/msal-react';
import { Outlet } from 'react-router-dom';
import * as Styled from '../App.styled';
import { OpenAPI } from '../api/generated/core/OpenAPI';
import AppBar from '../features/AppBar/AppBar';
import { Footer } from '../features/Footer/Footer';
import { useAccessToken } from '../hooks/useAccessToken';

export const Layout = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  if (token) OpenAPI.TOKEN = token;

  return (
    <>
      <AppBar title="PEPM" />
      <Styled.OutletWrapper>
        <Outlet />
      </Styled.OutletWrapper>
      <Footer text="All information is proprietary of Equinor © 2024 Equinor ASA" />
    </>
  );
};
