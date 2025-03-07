import { InteractionType } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from '@azure/msal-react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  useMsalAuthentication(InteractionType.Redirect);

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
