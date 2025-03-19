import axios from 'axios';
import { client } from '../generated/client.gen';

export const getAnalogueModelImage = async (
  analogueModelId: string,
  imageId: string,
): Promise<string> => {
  const response = await axios.get(
    `/api/v1/analogue-models/${analogueModelId}/images/${imageId}`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
    },
  );

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};
