import { useMutation } from '@tanstack/react-query';
import {
  AddAnalogueModelAreaCommandForm,
  AnalogueModelsService,
  UpdateAnalogueModelAreaCommandForm,
} from '../api/generated';
import { queryClient } from '../auth/queryClient';

export const useMutateAreaCoordinates = () => {
  const postAreaCoordinates = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelAreaCommandForm;
    }) => {
      return AnalogueModelsService.postApiV1AnalogueModelsModelAreas(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
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
      return AnalogueModelsService.putApiV1AnalogueModelsModelAreas(
        id,
        modelAreaId,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  return { postAreaCoordinates, putAreaCoordinates };
};
