import { useEffect, useState } from 'react'
import { callApi } from '../api/callApi'
import { loginRequest } from '../auth/authConfig'
import msalInstance from '../auth/msalClient'

/**
 * NOTE: This is a temporary hook for testing purposes
 */

type Model = {
  analogueModelId: string
  name: string
  description: string
}

export const useAnalogueModels = () => {
  const [models, setModels] = useState<Model[]>([])

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: msalInstance.getAllAccounts()[0],
    }

    function fetchAnalogueModels() {
      msalInstance
        .acquireTokenSilent(request)
        .then((response) => response.accessToken)
        .then((token) =>
          callApi(token, '/analogueModels')
            .then((response) => response)
            .then((models) => setModels(models))
        )
        .catch(() =>
          msalInstance
            .acquireTokenPopup(request)
            .then((response) => response.accessToken)
        )
    }

    if (models.length < 1) fetchAnalogueModels()
  }, [models])

  return models
}
