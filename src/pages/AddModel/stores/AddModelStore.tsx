import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export enum UploadingStatus {
  NotStarted,
  Success,
  Failed,
  Uploading,
}

export type ErrorType = {
  name?: string;
  description?: string;
  country?: string;
  field?: string;
  stratColumn?: string;
  level1?: string;
  level2?: string;
  level3?: string;

  formation?: string;
  file?: string;
  analogues?: string;
  zone?: string;
};

export interface FilesProps {
  NC?: File;
  INI?: File;
}

export interface FileError {
  message: string;
}

type IAddModelStore = {
  submitErrors: ErrorType;
  progress: number;
  uploading: boolean;
  uploadStatus: UploadingStatus;
  files: FilesProps;
  fileErrors: FileError[];
};

type IAddModelStoreActions = {
  setUploadStatus: (status: UploadingStatus) => void;
  setProgress: (progress: number) => void;
  setUploading: (uploading: boolean) => void;
  setSubmitErrors: (error: ErrorType) => void;
  setFiles: (files: FilesProps) => void;
  resetState: () => void;
  addFileErrors: (errors: FileError[]) => void;
  resetFileErrors: () => void;
};

export const useAddModelStore = create<
  IAddModelStore & IAddModelStoreActions
>()(
  immer((set) => ({
    files: {
      NC: undefined,
      INI: undefined,
    },
    submitErrors: {},
    progress: 0,
    uploading: false,
    uploadStatus: UploadingStatus.NotStarted,
    fileErrors: [],
    setUploadStatus: (status) =>
      set((state) => {
        state.uploadStatus = status;
      }),
    setProgress: (progress) =>
      set((state) => {
        state.progress = progress;
      }),
    setUploading: (uploading) =>
      set((state) => {
        state.uploading = uploading;
      }),
    setSubmitErrors: (error) =>
      set((state) => {
        state.submitErrors = error;
      }),
    setFiles: (files) =>
      set((state) => {
        state.files = files;
      }),
    resetState: () =>
      set((state) => {
        state.files = {};
        state.submitErrors = {};
        state.progress = 0;
        state.uploading = false;
        state.uploadStatus = UploadingStatus.NotStarted;
        state.fileErrors = [];
      }),
    addFileErrors: (errors) =>
      set((state) => {
        state.fileErrors = errors;
      }),
    resetFileErrors: () =>
      set((state) => {
        state.fileErrors = [];
      }),
  })),
);
