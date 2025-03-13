/* eslint-disable camelcase */
import { useEffect } from 'react';
import { AnalogueModelDetail } from '../../../api/generated';
import {
  ErrorType,
  FileError,
  FilesProps,
} from '../../../pages/AddModel/stores/AddModelStore';
import { parseINIString } from '../../../utils/ParseIniFile';
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

type IniFileType = {
  template: object;
  simstoptime: object;
  outputinterval: object;
  basinslope: object;
  channelwidth: object;
  riverlength: object;
  riverdischargeini: object;
  riverdischargefin: object;
  tidalamplitude: object;
  waveheightini: object;
  waveheightfin: object;
  wavedirection: object;
  subsidenceland: object;
  subsidencesea: object;
  composition: object;
  architectural_elements: object;
};

export const validateIniFile = (iniFileString: string) => {
  const errors: FileError[] = [];
  const refIni: IniFileType = {
    template: {},
    simstoptime: {},
    outputinterval: {},
    basinslope: {},
    channelwidth: {},
    riverlength: {},
    riverdischargeini: {},
    riverdischargefin: {},
    tidalamplitude: {},
    waveheightini: {},
    waveheightfin: {},
    wavedirection: {},
    subsidenceland: {},
    subsidencesea: {},
    composition: {},
    architectural_elements: {},
  };
  if (iniFileString) {
    const parsedIni = parseINIString(iniFileString);
    const sectionErrors: string[] = [];
    Object.keys(refIni).forEach((section) => {
      const parsedSection = Object.keys(parsedIni).find((x) => x === section);
      if (parsedSection === undefined) sectionErrors.push(section);
    });
    if (sectionErrors.length !== 0)
      errors.push({
        message:
          'Ini file does not contain information about ' +
          sectionErrors.join(', '),
      });
  }

  return errors;
};
