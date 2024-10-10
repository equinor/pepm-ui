import { StratColumnErrorType, StratColumnType } from './StratigrapicGroups';

export const validateInput = async (stratColObject: StratColumnType) => {
  const errorObject: StratColumnErrorType = {};
  const message = 'Value missing';

  if (stratColObject.country === undefined) {
    errorObject.country = message;
  }
  if (stratColObject.field === undefined) {
    errorObject.field = message;
  }
  if (stratColObject.stratColumn === undefined) {
    errorObject.stratColumn = message;
  }
  if (stratColObject.level1 === undefined) {
    errorObject.level1 = message;
  }
  if (stratColObject.level2 === undefined) {
    errorObject.level2 = message;
  }
  if (stratColObject.level3 === undefined) {
    errorObject.level3 = message;
  }

  return errorObject;
};
