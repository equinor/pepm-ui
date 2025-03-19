import { AnalogueModelDetail, UploadFileType } from '../api/generated';
import { client } from '../api/generated/client.gen';
import axios from 'axios';

export const GetFetchIniFileAxios = async (
  analogueModel: AnalogueModelDetail,
) => {
  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/ini`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
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

  return URL.revokeObjectURL(response.data);
};

export const GetFetchNcFileAxios = async (
  analogueModel: AnalogueModelDetail,
) => {
  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/nc`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
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

  return URL.revokeObjectURL(response.data);
};

export const GetFetchResqmlFileAxios = async (
  analogueModel: AnalogueModelDetail,
) => {
  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/resqml`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
    },
  );

  if (response.data) {
    const fileURL = window.URL.createObjectURL(response.data.data);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'Resqml.zip';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }

  return URL.revokeObjectURL(response.data);
};
