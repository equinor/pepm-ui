import { useMutation } from '@tanstack/react-query';
import {
  putApiV1AnalogueModelsByIdComputecasesByComputeCaseIdResults,
  putApiV1AnalogueModelsByIdResultsObjectByObjectId,
  UpdateObjectResultCommandBody,
  UpdateVariogramResultCommandBody,
} from '../api/generated';
import { queryClient } from '../auth/queryClient';

export const useMutateObjectResult = () => {
  const putObjectResult = useMutation({
    mutationFn: ({
      id,
      objectId,
      requestBody,
    }: {
      id: string;
      objectId: string;
      requestBody: UpdateObjectResultCommandBody;
    }) => {
      return putApiV1AnalogueModelsByIdResultsObjectByObjectId({
        body: requestBody,
        path: { id: id, objectId: objectId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['object-result'] });
    },
  });

  return putObjectResult;
};

export const useMutateVariogramResult = () => {
  const putVariogramResult = useMutation({
    mutationFn: ({
      id,
      computeCaseId,
      requestBody,
    }: {
      id: string;
      computeCaseId: string;
      requestBody: UpdateVariogramResultCommandBody;
    }) => {
      return putApiV1AnalogueModelsByIdComputecasesByComputeCaseIdResults({
        body: requestBody,
        path: { id: id, computeCaseId: computeCaseId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variogram-result'] });
    },
  });

  return putVariogramResult;
};
