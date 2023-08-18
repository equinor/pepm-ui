import { useEffect, useState } from 'react'
import { callApi } from '../api/callApi'
import { fetchAccessToken } from '../auth/msalClient'
import { AnalogueModel } from '../models/models'

/**
 * NOTE: This is a temporary hook for testing purposes
 */

export const useAnalogueModels = () => {
  const [models, setModels] = useState<AnalogueModel[]>([])

  useEffect(() => {
    function fetchAnalogueModels() {
      fetchAccessToken().then((token) =>
        callApi(token, '/api/analogueModels')
          .then((response) => response.value)
          .then((models) => setModels(models))
      )
    }

    if (models.length < 1) fetchAnalogueModels()
  }, [models])

  return models
}
