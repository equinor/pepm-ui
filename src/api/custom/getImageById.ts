import axios from 'axios';
import { apiConfig } from '../../auth/authConfig';
import { client } from '../generated/client.gen';

export const getVariogramImage = async (imageId: string): Promise<string> => {
  const response = await axios.get(`/api/v1/images/variogram/${imageId}`, {
    headers: { Authorization: `Bearer ${client.getConfig().auth}` },
    responseType: 'blob', // response type of blob to handle images
    baseURL: apiConfig.baseUrl,
  });

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};
