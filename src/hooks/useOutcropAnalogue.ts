import { useMutation } from '@tanstack/react-query';
import {
  AddAnalogueModelOutcropForm,
  deleteApiV1AnalogueModelsByIdOutcropsByOutcropId,
  postApiV1AnalogueModelsByIdOutcrops,
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
      return postApiV1AnalogueModelsByIdOutcrops({
        body: requestBody,
        path: { id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const deleteOutcropAnalogue = useMutation({
    mutationFn: ({ id, outcropId }: { id: string; outcropId: string }) => {
      return deleteApiV1AnalogueModelsByIdOutcropsByOutcropId({
        path: { id: id, outcropId: outcropId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });
  return { postOutcropRow, deleteOutcropAnalogue };
};
