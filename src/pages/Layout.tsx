import { Outlet } from 'react-router-dom';
import AppBar from '../features/AppBar/AppBar';
import { Footer } from '../features/Footer/Footer';
import * as Styled from '../App.styled';
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useAccessToken } from '../hooks/useAccessToken';
import { OpenAPI } from '../api/generated/core/OpenAPI';

export const Layout = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  useEffect(() => {
    OpenAPI.TOKEN = token;
  }, [token, accounts]);

  return (
    <div>
      <AppBar title="PEPM" />
      <Styled.OutletWrapper>
        <Outlet />
      </Styled.OutletWrapper>
      <Footer text="All information is proprietary of Equinor © 2023 Equinor ASA" />
    </div>
  );
};
