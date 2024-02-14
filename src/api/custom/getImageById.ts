import axios from 'axios';
import { OpenAPI } from '../generated';

export const getVariogramImage = async (imageId: string): Promise<string> => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;

  try {
    const response = await axios.get(`/api/images/variogram/${imageId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: base,
    });

    // create an object URL for the image blob and return it
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
    throw error; // re-throw the error so it can be handled by the caller
  }
};
