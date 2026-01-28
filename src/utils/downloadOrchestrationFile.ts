import { client } from '../api/generated/client.gen';
import axios from 'axios';

/**
 * Download an orchestration result file
 */
export const downloadOrchestrationFile = async (
  orchestrationId: string,
  fileName: string,
): Promise<void> => {
  const response = await axios.get(
    `/api/v1/delft3d-orchestrations/${orchestrationId}/results/download`,
    {
      params: { file: fileName },
      headers: { Authorization: `Bearer ${client.getConfig().auth}` },
      responseType: 'blob',
      baseURL: client.getConfig().baseURL,
    },
  );

  if (response.data) {
    // Create blob from response
    const blob = new Blob([response.data]);
    const fileURL = window.URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  }
};
