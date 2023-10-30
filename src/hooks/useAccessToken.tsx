import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser';
import { useEffect, useState } from 'react';
import { loginRequest } from '../auth/authConfig';

export const useAccessToken = (
  instance: IPublicClientApplication,
  activeAccount: AccountInfo,
) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: activeAccount,
    };

    async function fetchAccessToken() {
      return instance
        .acquireTokenSilent(request)
        .then((response) => response.accessToken)
        .catch(() =>
          instance
            .acquireTokenPopup(request)
            .then((response) => response.accessToken),
        );
    }

    if (!accessToken) {
      fetchAccessToken().then((token) => setAccessToken(token));
    }
  }, [accessToken, activeAccount, instance]);

  return accessToken;
};
