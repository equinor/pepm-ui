import { apiConfig } from '../auth/authConfig';
import { client } from './generated/client.gen';

client.setConfig({
  baseURL: apiConfig.baseUrl,
});
