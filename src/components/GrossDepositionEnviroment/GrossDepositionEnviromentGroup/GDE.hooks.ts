import { GDEErrorType, GdeType } from './GrossDepositionEnviromentGroup';

export const validateInput = async (gdeObject: GdeType) => {
  const errorObject: GDEErrorType = {};

  if (gdeObject.grossDepEnv === undefined) {
    errorObject.GDE = 'Must be set';
  }
  if (gdeObject.depEnv === undefined) {
    errorObject.DEnv = 'Must be set';
  }
  if (gdeObject.subenv === undefined) {
    errorObject.subEnv = 'Must be set';
  }
  if (gdeObject.architecturalElements?.length === 0) {
    errorObject.AEl = 'Must be set';
  }

  return errorObject;
};
