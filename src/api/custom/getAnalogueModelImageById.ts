import axios from 'axios';
import { OpenAPI } from '../generated';

export const getAnalogueModelImage = async (
  analogueModelId: string,
  imageId: string,
): Promise<string> => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;

  const response = await axios.get(
    `/api/v1/analogue-models/${analogueModelId}/images/${imageId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: base,
    },
  );

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};
