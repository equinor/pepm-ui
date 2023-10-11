import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { Layout } from './pages/Layout';
import { OpenAPI } from './api/generated';
import { apiConfig } from './auth/authConfig';

export function App() {
  useMsalAuthentication(InteractionType.Redirect);
  OpenAPI.BASE = apiConfig.baseUrl;

  return (
    <>
      <AuthenticatedTemplate>
        <Layout />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>You are not authorized</div>
      </UnauthenticatedTemplate>
    </>
  );
}
