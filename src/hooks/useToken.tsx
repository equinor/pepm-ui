import { useEffect, useState } from 'react'
import { fetchAccessToken } from '../auth/msalClient'

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>()

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken().then((token) => setAccessToken(token))
    }
  }, [accessToken])

  return accessToken
}
