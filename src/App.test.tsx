import { cleanup, render, screen } from '@testing-library/react';
import { MsalReactTester } from 'msal-react-tester';
import { App } from './App';

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

test('renders without crashing', () => {
  render(<App />);
});

test('renders what we want', () => {
  render(<App />);

  expect(screen.getByText(/You are not authorized/i)).toBeInTheDocument();
});

/**
 * 

test('renders what we want when logged in', async () => {
  msalTester.isLogged();

  render(
    <MsalProvider instance={msalTester.client}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MsalProvider>,
  );
  await msalTester.waitForRedirect();

  expect(
    screen.getByRole('h1', { name: /Browse all models/i }),
  ).toBeInTheDocument();
});
 */
