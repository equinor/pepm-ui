import { useMutation } from '@tanstack/react-query';
import { deleteApiV1AnalogueModelsByAnalogueModelIdStratigraphicGroupsByStratigraphicGroupId } from '../api';
import { queryClient } from '../auth/queryClient';

export const useStratColAnalogue = () => {
  const deleteStratColCase = useMutation({
    mutationFn: ({
      analogueModelId,
      stratigraphicGroupId,
    }: {
      analogueModelId: string;
      stratigraphicGroupId: string;
    }) => {
      return deleteApiV1AnalogueModelsByAnalogueModelIdStratigraphicGroupsByStratigraphicGroupId(
        {
          path: {
            analogueModelId: analogueModelId,
            stratigraphicGroupId: stratigraphicGroupId,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  return { deleteStratColCase };
};
