import { useEffect } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ErrorType, FilesProps } from './HandleModelComponent';
export const useHandleModelComponent = (
  setFileSize: React.Dispatch<React.SetStateAction<number>>,
  setMetadata: React.Dispatch<React.SetStateAction<AnalogueModelDetail>>,
  files: FilesProps,
  rawFile?: File,
  existingData?: AnalogueModelDetail,
) => {
  useEffect(() => {
    if (rawFile === undefined) return;
    setFileSize(rawFile.size);
  }, [rawFile, setFileSize]);

  useEffect(() => {
    if (files.NC === undefined) setFileSize(0);
  }, [files, setFileSize]);

  useEffect(() => {
    if (existingData) setMetadata(existingData);
  }, [existingData, setMetadata]);
};

export const validateValues = (
  inputValues: Partial<AnalogueModelDetail> | undefined,
  files?: FilesProps,
  isEdit?: boolean,
) => {
  const errors: ErrorType = {};

  if (inputValues?.name === undefined || inputValues?.name === '') {
    errors.name = 'Name not provided';
  }

  if (
    inputValues?.description === undefined ||
    inputValues?.description === ''
  ) {
    errors.description = 'Description not provided';
  }

  if (files && !isEdit) {
    if (!files.NC) {
      errors.file = 'NC file missing';
    }
  }

  return errors;
};
