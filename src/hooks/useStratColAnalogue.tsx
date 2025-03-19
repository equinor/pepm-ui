import { useMutation } from '@tanstack/react-query';
import {
  AddStatigraphicGroupForm,
  deleteApiV1AnalogueModelsByAnalogueModelIdStratigraphicGroupsByStratigraphicGroupId,
  postApiV1AnalogueModelsByIdStratigraphicGroups,
} from '../api';
import { queryClient } from '../auth/queryClient';

export const useStratColAnalogue = () => {
  const postSmdaMetadata = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddStatigraphicGroupForm;
    }) => {
      return postApiV1AnalogueModelsByIdStratigraphicGroups({
        body: requestBody,
        path: { id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const deleteStratCol = useMutation({
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

  return { postSmdaMetadata, deleteStratCol };
};
