/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable max-lines-per-function */
import { MsalProvider } from '@azure/msal-react';
import * as ReactQuery from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, renderHook, screen, waitFor } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import { useFetchCases } from '../../../hooks/useFetchCases';
import { useFetchModel } from '../../../hooks/useFetchModel';
import { useFetchModelAreas } from '../../../hooks/useFetchModelAreas';
import { AreaCoordinates } from '../AreaCoordinates';
import { useModelResults } from '../hooks/useModelResults';
import {
  defaultArea,
  mockAnalogueModelDetail,
  mockedComputeCase,
  mockedModelAreaType,
  modelId,
} from './mockedData';

let msalTester: MsalReactTester;

function wrapper(props: { children: React.ReactNode }) {
  const testQueryClient = new QueryClient();
  return (
    <MsalProvider instance={msalTester.client}>
      <QueryClientProvider client={testQueryClient}>
        {props.children}
        <AreaCoordinates setSaveAlert={jest.fn()} />
      </QueryClientProvider>
    </MsalProvider>
  );
}

const mockGetData = async (data: any) => {
  const mock = jest.spyOn(ReactQuery, 'useQuery');

  // @ts-ignore because of error
  mock.mockImplementation(() => {
    return data
      ? Promise.resolve({
          data: data,
          isLoading: false,
          isSuccess: true,
          isError: false,
        })
      : Promise.reject('error');
  });

  return mock;
};

beforeEach(() => {
  // new instance of msal tester for each test
  msalTester = new MsalReactTester();

  // spy all required msal things
  msalTester.spyMsal();
});

afterEach(() => {
  cleanup();
  msalTester.resetSpyMsal();
  jest.clearAllMocks();
});

test('Calls fetchModel api with mock data', async () => {
  const mock = await mockGetData(mockAnalogueModelDetail);

  const { result } = renderHook(() => useFetchModel(modelId), { wrapper });

  const res = await result.current;

  await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(res.data).toBe(mockAnalogueModelDetail));
});

test('Calls fetchCases api with mock data', async () => {
  const mock = await mockGetData(mockedComputeCase);

  const { result } = renderHook(() => useFetchCases(), { wrapper });

  const res = await result.current;

  await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(res.data).toBe(mockedComputeCase));
});

test('Calls useModelResult hook with mock data', async () => {
  const mock = await mockGetData(mockedComputeCase);

  const { result } = renderHook(
    () => useModelResults(defaultArea.name, [mockedComputeCase]),
    { wrapper },
  );

  const res = await result.current;

  await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(res.activeAreaResultList).toHaveLength(1));
});

test('Calls useFetchModelAreas hook with mock data', async () => {
  const mock = await mockGetData(mockedModelAreaType);

  const { result } = renderHook(() => useFetchModelAreas(), { wrapper });

  const res = await result.current;

  await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(res.data).toBe(mockedModelAreaType));
});

test('renders AreaCoordinates component in loading state', async () => {
  await mockGetData(mockAnalogueModelDetail);

  const { result } = renderHook(() => useFetchModel(modelId), { wrapper });
  await result.current;

  const loading = screen.getByText('Loading.....');
  expect(loading).toBeVisible();
});
