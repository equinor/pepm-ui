import { useMutation } from '@tanstack/react-query';
import {
  AddAnalogueModelAreaCommandForm,
  postApiV1AnalogueModelsByIdModelAreas,
  putApiV1AnalogueModelsByIdModelAreasByModelAreaId,
  UpdateAnalogueModelAreaCommandForm,
} from '../api/generated';
import { queryClient } from '../auth/queryClient';
import { usePepmContextStore } from '../stores/GlobalStore';

export const useMutateAreaCoordinates = () => {
  const { analogueModel } = usePepmContextStore();
  const postAreaCoordinates = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelAreaCommandForm;
    }) => {
      return postApiV1AnalogueModelsByIdModelAreas({
        body: requestBody,
        path: { id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['analogue-model', analogueModel.analogueModelId],
      });
    },
  });

  const putAreaCoordinates = useMutation({
    mutationFn: ({
      id,
      modelAreaId,
      requestBody,
    }: {
      id: string;
      modelAreaId: string;
      requestBody: UpdateAnalogueModelAreaCommandForm;
    }) => {
      return putApiV1AnalogueModelsByIdModelAreasByModelAreaId({
        body: requestBody,
        path: {
          id: id,
          modelAreaId: modelAreaId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['analogue-model', analogueModel.analogueModelId],
      });
    },
  });

  return { postAreaCoordinates, putAreaCoordinates };
};
