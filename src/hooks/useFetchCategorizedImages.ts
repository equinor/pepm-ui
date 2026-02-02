import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { getApiV1Delft3dOrchestrationsByOrchestrationIdResults } from '../api/generated/sdk.gen';
import { useAccessToken } from './useAccessToken';

export interface CategorizedImages {
  crossSectionGrainSize: string[]; // xsect_diameter - slideshow
  bathymetryDepositionRate: string[]; // map_bottomdepth_deposition - slideshow
  histograms: string[]; // archel_summary - single
  bathymetryArchitecture: string[]; // map_bottomdepth_archels - slideshow (only when completed)
  crossSectionArchitecture: string[]; // xsect_archels - single
  crossSectionDepositionAge: string[]; // xsect_depositionage - single
}

/**
 * Hook to fetch and categorize orchestration result images by their naming patterns
 * @param orchestrationId - The orchestration ID
 * @param isRunning - Whether the orchestration is currently running (enables polling)
 */
export const useFetchCategorizedImages = (
  orchestrationId: string | null | undefined,
  isRunning = false,
) => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  return useQuery({
    queryKey: ['categorized-images', orchestrationId],
    queryFn: async () => {
      if (!orchestrationId) return null;

      const response =
        await getApiV1Delft3dOrchestrationsByOrchestrationIdResults({
          path: {
            orchestrationId,
          },
        });

      const files = response.data?.data || [];

      // Filter for image files only (PNG, JPG, etc.)
      const imageFiles = files.filter((file) =>
        /\.(png|jpg|jpeg|gif|svg)$/i.test(file.name || ''),
      );

      // Categorize images based on filename patterns
      const categorized: CategorizedImages = {
        crossSectionGrainSize: [],
        bathymetryDepositionRate: [],
        histograms: [],
        bathymetryArchitecture: [],
        crossSectionArchitecture: [],
        crossSectionDepositionAge: [],
      };

      imageFiles.forEach((file) => {
        const filename = file.name || '';

        if (filename.includes('xsect_diameter')) {
          categorized.crossSectionGrainSize.push(filename);
        } else if (filename.includes('map_bottomdepth_deposition')) {
          categorized.bathymetryDepositionRate.push(filename);
        } else if (filename.includes('archel_summary')) {
          categorized.histograms.push(filename);
        } else if (filename.includes('map_bottomdepth_archels')) {
          categorized.bathymetryArchitecture.push(filename);
        } else if (filename.includes('xsect_archels')) {
          categorized.crossSectionArchitecture.push(filename);
        } else if (filename.includes('xsect_depositionage')) {
          categorized.crossSectionDepositionAge.push(filename);
        }
      });

      // Sort arrays by filename to ensure chronological order
      Object.keys(categorized).forEach((key) => {
        const categoryKey = key as keyof CategorizedImages;
        categorized[categoryKey].sort();
      });

      return categorized;
    },
    enabled: !!token && !!orchestrationId,
    refetchInterval: isRunning ? 10000 : false, // Only poll when simulation is running
  });
};
