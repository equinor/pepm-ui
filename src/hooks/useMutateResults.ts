import { useMutation } from '@tanstack/react-query';
import {
  ResultsService,
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
      return ResultsService.putApiAnalogueModelsResultsObject(
        id,
        objectId,
        requestBody,
      );
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
      return ResultsService.putApiAnalogueModelsComputecasesResults(
        id,
        computeCaseId,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variogram-result'] });
    },
  });

  return putVariogramResult;
};
