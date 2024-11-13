/* eslint-disable max-lines-per-function */
import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import {
  AnalogueModelSourceType,
  FileType,
  JobStatus,
} from '../../../api/generated';
import { useFetchOutcrops } from '../../../hooks/useFetchOutcrops';
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
  outcrops: [],
  modelAreas: [],
  stratigraphicGroups: [],
  geologicalGroups: [],
  analogueModelImage: {
    analogueModelImageId: '',
    fileName: '',
    type: FileType.JPG,
  },
  iniParameters: {},
  processingStatus: JobStatus.SUCCEEDED,
};
const errors = {};

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

jest.mock('../../../hooks/useFetchOutcrops');

const Render = () => {
  const testQueryClient = new QueryClient();

  // @ts-ignore because of error
  useFetchOutcrops.mockReturnValue({
    data: {
      data: [
        {
          outcropId: 'test12',
          description: 'string122',
          name: 'stringA1',
        },
        {
          outcropId: 'test13',
          description: 'string123',
          name: 'stringA2',
        },
      ],
      success: true,
    },
    isLoading: false,
    isSuccess: true,
    isError: false,
  });

  return (
    <MsalProvider instance={msalTester.client}>
      <QueryClientProvider client={testQueryClient}>
        <ModelMetadata
          errors={errors}
          metadata={mockMetadata}
          setMetadata={jest.fn()}
        />
      </QueryClientProvider>
    </MsalProvider>
  );
};

test('renders modelMetadata after loading', () => {
  render(<Render />);

  const nameLable = screen.getByLabelText('Model name (required)');
  expect(nameLable).toBeInTheDocument();
  expect(nameLable).toHaveValue('');
});

test('Name field to be present and empty after render', async () => {
  render(<Render />);

  const nameLable = screen.getByLabelText('Model name (required)');
  expect(nameLable).toBeInTheDocument();
  expect(nameLable).toHaveValue('');
});

test('Description field to be present after render', async () => {
  render(<Render />);

  const descriptionLable = screen.getByLabelText(
    'Model description (required)',
  );
  expect(descriptionLable).toBeInTheDocument();
});
