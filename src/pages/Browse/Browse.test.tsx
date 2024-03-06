/*

import { MsalProvider } from '@azure/msal-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { queryClient } from '../../auth/queryClient';
import { Browse } from './Browse';

let msalTester: MsalReactTester;
beforeEach(() => {
  // new instance of msal tester for each test
  msalTester = new MsalReactTester();

  // spy all required msal things
  msalTester.spyMsal();
});

afterEach(() => {
  cleanup();
  msalTester.resetSpyMsal();
});

// function setup() {
//   const utils = render(
//     <MsalProvider instance={msalInstance}>
//       <QueryClientProvider client={queryClient}>
//         <Browse />
//       </QueryClientProvider>
//     </MsalProvider>,
//     { wrapper: BrowserRouter },
//   );

//   const add = screen.getByRole('button');
//   const clickAdd = () => fireEvent.click(add);
//   return { ...utils, add, clickAdd };
// }


jest.mock('../../pages/Browse/Browse', () => ({
  __esModule: true,
  HomePage: () => <div data-testid="HomePageMock" />,
}));

function wrapper({ children }: PropsWithChildren<unknown>) {
  const setRoute = '/';

  return (
    <MsalProvider instance={msalTester.client}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[setRoute]}>{children}</MemoryRouter>
      </QueryClientProvider>
    </MsalProvider>
  );
}

test('should render main page', async () => {
  msalTester.isLogged();
  render(<Browse></Browse>, { wrapper });
  await msalTester.waitForRedirect();

  expect(
    screen.getByRole('h1', { name: /Browse all models/i }),
  ).toBeInTheDocument();
});

*/

// Er her for at fila skal kunne committes, bare fjern sammen med det utkommenterte over
import { cleanup, render, screen } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import { App } from '../../App';

let msalTester: MsalReactTester;
beforeEach(() => {
  // new instance of msal tester for each test
  msalTester = new MsalReactTester();

  // spy all required msal things
  msalTester.spyMsal();
});

afterEach(() => {
  cleanup();
  msalTester.resetSpyMsal();
});

test('renders what we want', () => {
  render(<App />);

  expect(screen.getByText(/You are not authorized/i)).toBeInTheDocument();
});
