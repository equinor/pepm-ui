import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type IErrorStore = {
  errors: ErrorMessage[];
};

export type ErrorMessage = {
  message: string;
};

type IErrorStoreActions = {
  addError: (message: string) => void;
  addErrors: (errors: ErrorMessage[]) => void;
  removeError: (error: ErrorMessage) => void;
};

export const useErrorStore = create<IErrorStore & IErrorStoreActions>()(
  immer((set) => ({
    errors: [],
    addError: (message: string) =>
      set((state) => {
        if (state.errors.find((x) => x.message === message) === undefined)
          state.errors.push({ message });
      }),
    addErrors: (errors: ErrorMessage[]) =>
      set((state) => {
        if (errors) {
          errors.forEach((error) => {
            state.errors.push(error);
          });
        }
      }),
    removeError: (error: ErrorMessage) =>
      set((state) => {
        state.errors = state.errors.filter(
          (otherError) => otherError.message !== error.message,
        );
      }),
  })),
);
