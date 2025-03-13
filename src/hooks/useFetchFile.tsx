import { AnalogueModelDetail, OpenAPI, UploadFileType } from '../api/generated';
import axios from 'axios';

export const getFetchIniFileAxios = async (
  analogueModel: AnalogueModelDetail,
): Promise<string> => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;

  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/ini`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: base,
    },
  );

  if (response.data) {
    const fileURL = window.URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download =
      analogueModel.fileUploads.find(
        (x) => x.uploadFileType === UploadFileType.INI_DATA,
      )?.originalFileName || 'file.ini';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};

export const getFetchNcFileAxios = async (
  analogueModel: AnalogueModelDetail,
): Promise<string> => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;

  const response = await axios.get(
    `/api/downloads/${analogueModel.analogueModelId}/nc`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: base,
    },
  );

  if (response.data) {
    const fileURL = window.URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download =
      analogueModel.fileUploads.find(
        (x) => x.uploadFileType === UploadFileType.NET_CDF,
      )?.originalFileName || 'file.nc';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};

export const getFetchResqmlFileAxios = async (
  analogueModel: AnalogueModelDetail,
) => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;

  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/resqml`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: base,
    },
  );

  if (response.data) {
    const fileURL = window.URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'Resqml.zip';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};
