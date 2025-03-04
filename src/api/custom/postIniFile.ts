import axios from 'axios';
import { UploadIniFileCommandResponse } from '../generated';
import { client } from '../generated/client.gen';
import { apiConfig } from '../../auth/authConfig';

export const postIniFile = async (
  modelId: string,
  formData: FormData,
): Promise<UploadIniFileCommandResponse> => {
  const response = await axios.post(
    `/api/v1/uploads/models/${modelId}/ini-file`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${client.getConfig().auth}`,
        'Content-Type': 'multipart/form-data',
      },
      baseURL: apiConfig.baseUrl,
    },
  );

  // create an object URL for the image blob and return it
  return response;
};
