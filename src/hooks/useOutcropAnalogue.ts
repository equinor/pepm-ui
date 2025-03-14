import { useMutation } from '@tanstack/react-query';
import {
  AddAnalogueModelOutcropForm,
  AnalogueModelsService,
} from '../api/generated';
import { queryClient } from '../auth/queryClient';

export const useOutcropAnalouge = () => {
  const postOutcropRow = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelOutcropForm;
    }) => {
      return AnalogueModelsService.postApiV1AnalogueModelsOutcrops(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const deleteOutcropAnalogue = useMutation({
    mutationFn: ({ id, outcropId }: { id: string; outcropId: string }) => {
      return AnalogueModelsService.deleteApiV1AnalogueModelsOutcrops(
        id,
        outcropId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });
  return { postOutcropRow, deleteOutcropAnalogue };
};
