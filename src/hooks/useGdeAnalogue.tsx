import { useMutation } from '@tanstack/react-query';
import {
  AddGeologicalGroupForm,
  deleteApiV1AnalogueModelsByAnalogueModelIdGeologicalGroupsByGeologicalGroupId,
  postApiV1AnalogueModelsByIdGeologicalGroups,
} from '../api';
import { queryClient } from '../auth/queryClient';

export const useGdeAnalogue = () => {
  const postGde = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddGeologicalGroupForm;
    }) => {
      return postApiV1AnalogueModelsByIdGeologicalGroups({
        body: requestBody,
        path: { id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const deleteGde = useMutation({
    mutationFn: ({
      analogueModelId,
      geologicalGroupId,
    }: {
      analogueModelId: string;
      geologicalGroupId: string;
    }) => {
      return deleteApiV1AnalogueModelsByAnalogueModelIdGeologicalGroupsByGeologicalGroupId(
        {
          path: {
            analogueModelId: analogueModelId,
            geologicalGroupId: geologicalGroupId,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });
  return { postGde, deleteGde };
};
