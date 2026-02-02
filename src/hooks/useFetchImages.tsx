import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { client } from '../api/generated/client.gen';
import { useErrorStore } from '../stores/ErrorStore';

interface UseFetchImagesOptions {
  orchestrationId: string;
  imagesToLoad: number[];
  imageFilenames: string[];
}

/**
 * Hook to fetch multiple images with React Query caching
 * Uses useQueries to dynamically create queries based on indices array
 */
export const useFetchImages = ({
  orchestrationId,
  imagesToLoad,
  imageFilenames,
}: UseFetchImagesOptions) => {
  const { addError } = useErrorStore();

  return useQueries({
    queries: imagesToLoad.map((index) => ({
      queryKey: ['orchestration-image', orchestrationId, imageFilenames[index]],
      queryFn: async () => {
        const filename = imageFilenames[index];
        try {
          const response = await axios.get(
            `/api/v1/delft3d-orchestrations/${orchestrationId}/results/download`,
            {
              params: { file: filename },
              headers: { Authorization: `Bearer ${client.getConfig().auth}` },
              responseType: 'blob',
              baseURL: client.getConfig().baseURL,
            },
          );

          if (response.data) {
            return new Blob([response.data]);
          }
          return null;
        } catch (error) {
          addError(`Failed to load image: ${filename}`);
          return null;
        }
      },
      enabled: !!orchestrationId && !!imageFilenames[index],
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
      retry: 2,
    })),
  });
};
