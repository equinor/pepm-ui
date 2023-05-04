import { apiConfig } from '../auth/authConfig'

/**
 * Attaches a given access token to API call.
 * @param accessToken
 */
export async function callApi(accessToken: string, resourceUri: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`
  const uri = apiConfig.baseUrl + resourceUri

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(uri, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}
