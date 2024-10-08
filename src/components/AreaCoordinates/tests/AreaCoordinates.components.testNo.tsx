// /* eslint-disable max-lines-per-function */
// import { MsalProvider } from '@azure/msal-react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { cleanup, fireEvent, render, screen } from '@testing-library/react';
// import { MsalReactTester } from 'msal-react-tester';
// import { AreaCoordinates } from '../AreaCoordinates';

// import { useFetchCases } from '../../../hooks/useFetchCases';
// import { useFetchModel } from '../../../hooks/useFetchModel';
// import { useFetchModelAreas } from '../../../hooks/useFetchModelAreas';
// import { useModelResults } from '../hooks/useModelResults';

// import {
//   mockAnalogueModelDetail,
//   mockedActiveComputeCase,
//   mockedComputeCase,
//   mockedModelAreaType,
// } from './mockedData';

// let msalTester: MsalReactTester;

// beforeEach(() => {
//   // new instance of msal tester for each test
//   msalTester = new MsalReactTester();
//   // spy all required msal things
//   msalTester.spyMsal();
// });

// afterEach(() => {
//   cleanup();
//   msalTester.resetSpyMsal();
//   jest.clearAllMocks();
// });

// jest.mock('../../../hooks/useFetchCases');
// jest.mock('../../../hooks/useFetchModel');
// jest.mock('../../../hooks/useFetchModelAreas');
// jest.mock('../hooks/useModelResults');

// const Render = () => {
//   const testQueryClient = new QueryClient();

//   // @ts-ignore because of error
//   useFetchCases.mockReturnValue({
//     data: mockedComputeCase,
//     success: true,
//     isLoading: false,
//     isSuccess: true,
//     isError: false,
//   });

//   // @ts-ignore because of error
//   useFetchModel.mockReturnValue({
//     data: mockAnalogueModelDetail,
//     success: true,
//     isLoading: false,
//     isSuccess: true,
//     isError: false,
//   });

//   // @ts-ignore because of error
//   useFetchModelAreas.mockReturnValue({
//     data: mockedModelAreaType,
//     success: true,
//     isLoading: false,
//     isSuccess: true,
//     isError: false,
//   });

//   // @ts-ignore because of error
//   useModelResults.mockReturnValue(mockedActiveComputeCase);

//   return (
//     <MsalProvider instance={msalTester.client}>
//       <QueryClientProvider client={testQueryClient}>
//         <AreaCoordinates setSaveAlert={jest.fn()} />
//       </QueryClientProvider>
//     </MsalProvider>
//   );
// };

// test('renders Area Coordinates component after loading in an empty state', async () => {
//   render(<Render />);

//   const nameLable = screen.getByLabelText('Select area', {
//     selector: 'input',
//   });
//   expect(nameLable).toBeInTheDocument();
//   expect(nameLable).toHaveValue('');

//   expect(screen.queryByText('Top Left Corner')).not.toBeInTheDocument();
//   expect(screen.queryByText('Edit coordinates')).not.toBeInTheDocument();
// });

// test('Select area Autocomplete updates correct on model area select', async () => {
//   render(<Render />);

//   const nameLable = screen.getByLabelText('Select area', {
//     selector: 'input',
//   });

//   expect(nameLable).toHaveValue('');

//   fireEvent.change(nameLable, {
//     target: {
//       value: mockedModelAreaType[0].name,
//     },
//   });
//   fireEvent.keyDown(nameLable, { key: 'Enter', code: 'Enter' });
//   expect(nameLable).toHaveValue(mockedModelAreaType[0].name);

//   fireEvent.change(nameLable, {
//     target: {
//       value: mockedModelAreaType[1].name,
//     },
//   });
//   fireEvent.keyDown(nameLable, { key: 'Enter', code: 'Enter' });
//   expect(nameLable).toHaveValue(mockedModelAreaType[1].name);
// });
