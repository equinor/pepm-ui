import axios from 'axios';
import { client } from '../api/generated/client.gen';

export const getFetchAnaloguesExcelAxios = async (exportModels: string[]) => {
  let params = '';

  if (exportModels.length > 0) {
    exportModels.forEach((element, index) => {
      if (index === 0) params = '?AnalogueModelIds=' + element;
      else params += '&AnalogueModelIds=' + element;
    });
  }
  const response = await axios.get(
    '/api/v1/downloads/analogue-models-excel' + params,
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
    link.download = 'export.xlsx';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }

  return URL.revokeObjectURL(response.data);
};
