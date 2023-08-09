import { useEffect, useState } from 'react'
import { callApi } from '../api/callApi'
import { loginRequest } from '../auth/authConfig'
import msalInstance from '../auth/msalClient'
import { AnalogueModel } from '../models/models'

/**
 * NOTE: This is a temporary hook for testing purposes
 */

export const useAnalogueModels = () => {
  const [models, setModels] = useState<AnalogueModel[]>([])

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
            .then((response) => response.value)
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
