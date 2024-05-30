/* eslint-disable max-lines-per-function */
import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import { AnalogueModelSourceType } from '../../../api/generated';
import { useFetchAnalogues } from '../../../hooks/useFetchAnalogues';
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

jest.mock('../../../hooks/useFetchAnalogues');

const Render = () => {
  const testQueryClient = new QueryClient();

  // @ts-ignore because of error
  useFetchAnalogues.mockReturnValue({
    data: {
      data: [
        {
          analogueId: 'test12',
          description: 'string122',
          name: 'stringA1',
        },
        {
          analogueId: 'test13',
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

  const nameLable = screen.getByLabelText('Model Name');
  expect(nameLable).toBeInTheDocument();
  expect(nameLable).toHaveValue('');
});

test('Name field to be present and empty after render', async () => {
  render(<Render />);

  const nameLable = screen.getByLabelText('Model Name');
  expect(nameLable).toBeInTheDocument();
  expect(nameLable).toHaveValue('');
});

test('Description field to be present after render', async () => {
  render(<Render />);

  const descriptionLable = screen.getByLabelText('Model description');
  expect(descriptionLable).toBeInTheDocument();
});
