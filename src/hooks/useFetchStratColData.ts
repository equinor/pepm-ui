import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';
import { MetadataService } from '../api/generated';
import { useAccessToken } from './useAccessToken';
import { usePepmContextStore } from './GlobalState';

export const useFetchSmdaCountries = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { countries } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['smda-countries'],
    queryFn: () => MetadataService.getApiMetadataSmdaMetadataCountries(),
    enabled: !!token && countries.length === 0,
  });

  return query;
};

export const useFetchSmdaFields = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { fields } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['smda-fields'],
    queryFn: () => MetadataService.getApiMetadataSmdaMetadataFields(),
    enabled: !!token && fields.length === 0,
  });

  return query;
};

export const useFetchSmdaStratigraphicColumns = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { stratigraphicColumns } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['smda-strat-columns'],
    queryFn: () =>
      MetadataService.getApiMetadataSmdaMetadataStratigraphicColumns(),
    enabled: !!token && stratigraphicColumns.length === 0,
  });

  return query;
};

export const useFetchSmdaMetadataStratigraphicUnits = () => {
  const { instance, accounts } = useMsal();
  const token = useAccessToken(instance, accounts[0]);
  const { stratigraphicUnits } = usePepmContextStore();

  const query = useQuery({
    queryKey: ['smda-strat-units'],
    queryFn: () =>
      MetadataService.getApiMetadataSmdaMetadataStratigraphicUnits(),
    enabled: !!token && stratigraphicUnits.length === 0,
  });

  return query;
};
