/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable max-lines-per-function */
import { MsalProvider } from '@azure/msal-react';
import * as ReactQuery from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, renderHook, screen, waitFor } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import {
  AnalogueModelSourceType,
  ComputeJobStatus,
  ModelAreaTypeDto,
  UploadFileCategory,
  UploadFileType,
  UploadStatus,
} from '../../api/generated';
import { useFetchCases } from '../../hooks/useFetchCases';
import { useFetchModel } from '../../hooks/useFetchModel';
import { useFetchModelAreas } from '../../hooks/useFetchModelAreas';
import { AreaCoordinates } from './AreaCoordinates';
import { useModelResults } from './hooks/useModelResults';

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

const modelId = '1234-5678-9010';

const mockAnalogueModelDetail = {
  analogueModelId: '1234-5678-9010',
  name: 'string',
  description: 'string',
  isProcessed: true,
  sourceType: AnalogueModelSourceType.RES_QML,
  analogues: [
    {
      analogueId: 'test2',
      name: 'string',
      description: 'string',
    },
  ],
  fileUploads: [
    {
      uploadId: 'string',
      analogueModelId: 'string',
      originalFileName: 'string',
      uploadStatus: UploadStatus.COMPLETED,
      uploadFileType: UploadFileType.NET_CDF,
      uploadFileCategory: UploadFileCategory.INPUT_METADATA,
    },
  ],
  parameters: [
    {
      parameterId: 'string',
      identifier: 'string',
      name: 'string',
      description: 'string',
    },
  ],
  metadata: [
    {
      metadataId: 'string',
      metadataType: 'string',
      value: 'string',
    },
  ],
  modelAreas: [
    {
      modelAreaId: 'string',
      modelAreaType: 'string',
      coordinates: [
        {
          x: 100,
          y: 200,
          m: 0,
        },
        {
          x: 100,
          y: 200,
          m: 1,
        },
      ],
    },
  ],
};

const mockedComputeCase = {
  computeCaseId: 'string',
  computeMethod: {
    computeMethodId: 'string',
    name: 'string',
  },
  modelArea: {
    modelAreaId: 'string',
    name: 'Test area',
  },
  inputSettings: [
    {
      inputSettingValueId: 'string',
      inputSettingTypeId: 'string',
      valueName: 'string',
      typeName: 'string',
    },
  ],
  jobStatus: ComputeJobStatus.SUCCEEDED,
};

const defaultArea: ModelAreaTypeDto = {
  description: 'A test area',
  modelAreaTypeId: '1111-2222-3333',
  name: 'Test area',
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

const mockedModelAreaType = [
  {
    modelAreaTypeId: 'string',
    name: 'string',
    description: 'string',
  },
  {
    modelAreaTypeId: 'string1',
    name: 'string1',
    description: 'string1',
  },
];

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
