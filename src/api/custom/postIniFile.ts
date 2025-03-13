import axios from 'axios';
import { OpenAPI } from '../generated';
import type { UploadIniFileCommandResponse } from '../generated/models/UploadIniFileCommandResponse';

export const postIniFile = async (
  modelId: string,
  formData: FormData,
): Promise<UploadIniFileCommandResponse> => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;

  const response = await axios
    .post(`/api/v1/uploads/models/${modelId}/ini-file`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      baseURL: base,
    })
    .catch(function (err) {
      return Promise.reject(err);
    });

  // create an object URL for the image blob and return it
  return response.data;
};
