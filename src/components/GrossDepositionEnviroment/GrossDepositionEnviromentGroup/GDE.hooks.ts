import { GDEErrorType, GdeType } from './GrossDepositionEnviromentGroup';

export const validateInput = async (gdeObject: GdeType) => {
  const errorObject: GDEErrorType = {};
  const message = 'Value missing';

  if (gdeObject.grossDepEnv === undefined) {
    errorObject.GDE = message;
  }
  if (gdeObject.depEnv === undefined) {
    errorObject.DEnv = message;
  }
  if (gdeObject.subenv === undefined) {
    errorObject.subEnv = message;
  }
  if (gdeObject.architecturalElements?.length === 0) {
    errorObject.AEl = message;
  }

  return errorObject;
};
