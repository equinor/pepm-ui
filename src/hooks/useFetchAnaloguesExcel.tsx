import { OpenAPI } from '../api/generated';
import axios from 'axios';

export const getFetchAnaloguesExcelAxios = async (
  exportModels: string[],
): Promise<string> => {
  const token = OpenAPI.TOKEN; // replace with your bearer token
  const base = OpenAPI.BASE;
  let params = '';

  if (exportModels.length > 0) {
    exportModels.forEach((element, index) => {
      if (index === 0) params = '?AnalogueModelIds=' + element;
      else params += '&AnalogueModelIds=' + element;
    });
  }

  const response = await axios.get(
    '/api/downloads/analogue-models-excel' + params,
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
    link.download = 'export.xlsx';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }

  // create an object URL for the image blob and return it
  return URL.createObjectURL(response.data);
};
