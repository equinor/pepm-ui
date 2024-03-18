// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.ResizeObserver = class ResizeObserver {
  observe() {
    // You can fill in the details of what you want observe to do
  }
  unobserve() {
    // You can fill in the details of what you want unobserve to do
  }
  disconnect() {
    // You can fill in the details of what you want disconnect to do
  }
};

jest.mock('./auth/msalClient.ts', () => ({
  getActiveAccount: () => ({}),
  aquireTokenSilent: () => Promise.resolve({ accessToken: '' }),
}));
