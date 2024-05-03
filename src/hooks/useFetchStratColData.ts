import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { MetadataService } from '../api/generated';
import { useAccessToken } from './useAccessToken';

export const useFetchSmdaCountries = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['smda-countries'],
    queryFn: () => MetadataService.getApiMetadataSmdaMetadataCountries(),
    enabled: !!token,
  });

  return query;
};

export const useFetchSmdaFields = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['smda-fields'],
    queryFn: () => MetadataService.getApiMetadataSmdaMetadataFields(),
    enabled: !!token,
  });

  return query;
};

export const useFetchSmdaStratigraphicColumns = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['smda-strat-columns'],
    queryFn: () =>
      MetadataService.getApiMetadataSmdaMetadataStratigraphicColumns(),
    enabled: !!token,
  });

  return query;
};

export const useFetchSmdaMetadataStratigraphicUnits = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);

  const query = useQuery({
    queryKey: ['smda-strat-units'],
    queryFn: () =>
      MetadataService.getApiMetadataSmdaMetadataStratigraphicUnits(),
    enabled: !!token,
  });

  return query;
};
