import { InteractionType } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from '@azure/msal-react';
import { RouterProvider } from 'react-router-dom';
import { OpenAPI } from './api/generated';
import { apiConfig } from './auth/authConfig';
import { router } from './router';

export function App() {
  useMsalAuthentication(InteractionType.Redirect);
  OpenAPI.BASE = apiConfig.baseUrl;

  return (
    <>
      <AuthenticatedTemplate>
        <RouterProvider router={router} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>You are not authorized</div>
      </UnauthenticatedTemplate>
    </>
  );
}
