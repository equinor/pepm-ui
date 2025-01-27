import { useEffect } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ErrorType, FilesProps } from './HandleModelComponent';
export const useHandleModelComponent = (
  setMetadata: (analogueModel: AnalogueModelDetail) => void,
  existingData?: AnalogueModelDetail,
) => {
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
    errors.name = 'You must name your model';
  }

  if (
    inputValues?.description === undefined ||
    inputValues?.description === ''
  ) {
    errors.description = 'You must add a description';
  }

  if (files && !isEdit) {
    if (!(files.NC && files.INI)) {
      errors.file = 'You must select an NC file and an INI file to upload';
    }
  }

  return errors;
};
