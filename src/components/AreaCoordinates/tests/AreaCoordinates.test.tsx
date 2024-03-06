import { cleanup } from '@testing-library/react';

// const mocArea: ListModelAreaTypesQueryResponse = {
//   success: true,
//   count: 1,
//   data: [{ modelAreaTypeId: '111', name: 'mocArea', description: 'Test' }],
// };

// jest.mock('model-area', () => ({
//   useQuery: jest
//     .fn()
//     .mockReturnValue({ data: { ...mocArea }, isLoading: false, error: {} }),
// }));

afterEach(() => cleanup());

// const wrapper = ({ children }: { children: any }) => (
//   <MsalProvider instance={msalInstance}>
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   </MsalProvider>
// );

test('on render, area select is present.', () => {
  // render(
  //   <MsalProvider instance={msalInstance}>
  //     <QueryClientProvider client={queryClient}>
  //       <AreaCoordinates setSaveAlert={jest.fn()} />
  //     </QueryClientProvider>
  //   </MsalProvider>,
  // );
  // Wait for the authentication redirect to resolve
  // const { result } = renderHook(() => useFetchModelAreas(), {
  //   wrapper,
  // });
  // await waitFor(() => expect(result.current.isSuccess).toBe(true));
  // const editButton = screen.getByRole('button', { name: /edit/i });
  // expect(editButton).toBeEnabled();
});

// test('Should render a button', async () => {
//   render(<AreaCoordinates setSaveAlert={jest.fn()} />);
// });
