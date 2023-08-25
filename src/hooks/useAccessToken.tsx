import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import { loginRequest } from '../auth/authConfig'

export const useAccessToken = () => {
  const { instance, accounts } = useMsal()
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    }

    async function fetchAccessToken() {
      return instance
        .acquireTokenSilent(request)
        .then((response) => response.accessToken)
        .catch(() =>
          instance
            .acquireTokenPopup(request)
            .then((response) => response.accessToken)
        )
    }

    if (!accessToken) {
      fetchAccessToken().then((token) => setAccessToken(token))
    }
  }, [accessToken, accounts, instance])

  return accessToken
}
