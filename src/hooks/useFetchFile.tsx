import { AnalogueModelDetail, UploadFileType } from '../api/generated';
import { client } from '../api/generated/client.gen';
import axios from 'axios';

export const GetFetchIniFileAxios = async (
  analogueModel: AnalogueModelDetail,
  setIsLoadingIni: React.Dispatch<React.SetStateAction<number>>,
) => {
  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/ini`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (progressEvent.loaded * 100) / progressEvent.total!,
        );
        setIsLoadingIni(percentCompleted);
      },
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
  setIsLoadingNc: React.Dispatch<React.SetStateAction<number>>,
) => {
  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/nc`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (progressEvent.loaded * 100) / progressEvent.total!,
        );
        setIsLoadingNc(percentCompleted);
      },
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
  setIsLoadingResqml: React.Dispatch<React.SetStateAction<number>>,
) => {
  const response = await axios.get(
    `/api/v1/downloads/${analogueModel.analogueModelId}/resqml`,
    {
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob', // response type of blob to handle images
      baseURL: client.getConfig().baseURL,
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          (progressEvent.loaded * 100) / progressEvent.total!,
        );
        setIsLoadingResqml(percentCompleted);
      },
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
