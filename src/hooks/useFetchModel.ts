import { useQuery } from '@tanstack/react-query';
import { useMsal } from '@azure/msal-react';
import { useParams } from 'react-router-dom';
import { useAccessToken } from './useAccessToken';
import { getApiV1AnalogueModelsById } from '../api/generated';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../stores/GlobalStore';

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
            'outcrops, stratigraphicgroups, fileuploads, modelareas, geologicalgroups, inifile, computecases',
        },
      }),
    enabled: !!token && analogueModel === analogueModelDefault,
  });

  return query;
};
