import { useEffect } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import { ErrorType, FilesProps } from './AddModelDialog';
export const useAddModelDialog = (
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
  files: FilesProps,
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

  if (
    inputValues?.metadata === undefined ||
    inputValues?.metadata?.filter((m) => m.metadataType === 'Field').length <= 0
  ) {
    errors.field = 'Field not selected';
  }

  if (
    inputValues?.analogues === undefined ||
    inputValues?.analogues?.length <= 0
  ) {
    errors.analogues = 'Analogues not selected';
  }

  if (
    inputValues?.metadata === undefined ||
    inputValues?.metadata?.filter((m) => m.metadataType === 'Zone').length <= 0
  ) {
    errors.zone = 'Zone not selected';
  }

  if (!files.NC && !isEdit) {
    errors.file = 'NC file missing';
  }

  return errors;
};
