import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';
import { analogueModelDefault, usePepmContextStore } from './GlobalState';
import { getApiV1AnalogueModelsById } from '../api/generated';

export const useFetchModel = (id?: string) => {
  const { analogueModel } = usePepmContextStore();
  const { modelId } = useParams();
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const ID = id ? id : (modelId as string);
  const query = useQuery({
    queryKey: ['analogue-model', ID],
    queryFn: () =>
      getApiV1AnalogueModelsById({
        path: { id: ID },
        query: {
          expand:
            'fileuploads, stratigraphicgroups, modelareas, geologicalgroups, outcrops, inifile, computecases',
        },
      }),
    enabled: !!token && analogueModel === analogueModelDefault,
  });

  return query;
};
