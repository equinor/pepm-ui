/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable max-lines-per-function */
import { MsalProvider } from '@azure/msal-react';
import * as ReactQuery from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, renderHook, screen, waitFor } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import { AnalogueModelSourceType } from '../../../api/generated';
import { useFetchAnalogues } from '../../../hooks/useFetchAnalogues';
import { useFetchMetadata } from '../../../hooks/useFethcMetadata';
import { ModelMetadata } from './ModelMetadata';

let msalTester: MsalReactTester;
const mockMetadata = {
  analogueModelId: '',
  name: '',
  description: '',
  isProcessed: false,
  sourceType: AnalogueModelSourceType.DELTARES,
  fileUploads: [],
  parameters: [],
  metadata: [],
  analogues: [],
  modelAreas: [],
  stratigraphicGroups: [],
  geologicalGroups: [],
};
const errors = {};
function wrapper(props: { children: React.ReactNode }) {
  const testQueryClient = new QueryClient();
  return (
    <MsalProvider instance={msalTester.client}>
      <QueryClientProvider client={testQueryClient}>
        {props.children}
        <ModelMetadata
          errors={errors}
          metadata={mockMetadata}
          setMetadata={jest.fn()}
        />
      </QueryClientProvider>
    </MsalProvider>
  );
}

const mockMetadataDto = {
  metadataId: 'test',
  metadataType: 'string',
  value: 'string',
  success: true,
};

const mockAnalogueList = {
  analogueId: 'test2',
  name: 'string',
  description: 'string',
  success: true,
};

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

test('Calls Mocked metadata api with mock data', async () => {
  const mock = await mockGetData(mockMetadataDto);

  const { result } = renderHook(() => useFetchMetadata(), { wrapper });

  const res = await result.current;

  await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(res.data).toBe(mockMetadataDto));
});

test('Calls Mocked analogue api with mock data', async () => {
  const mock = await mockGetData(mockAnalogueList);

  const { result } = renderHook(() => useFetchAnalogues(), { wrapper });

  const res = await result.current;

  await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(res.data).toBe(mockAnalogueList));
});

test('renders ModelMetadata component in loading state', async () => {
  await mockGetData(mockMetadataDto);

  const { result } = renderHook(() => useFetchMetadata(), { wrapper });
  await result.current;

  const loading = screen.getByText('Loading ...');
  expect(loading).toBeVisible();
});
