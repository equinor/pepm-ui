/* eslint-disable max-lines-per-function */
import { ModelAreaTypeDto } from '../../../api/generated';
import { AreaCoordinateType } from '../AreaCoordinates';

export type CoordinateErrorType = {
  area?: string;
  x0?: string;
  y0?: string;
  x1?: string;
  y1?: string;
};

function NotANumber(value: any) {
  return isNaN(value);
}
export const validateCoordinates = async (
  area: AreaCoordinateType | undefined,
  activeArea: ModelAreaTypeDto,
) => {
  const errors: CoordinateErrorType = {};
  if (!activeArea || activeArea.modelAreaTypeId === '') {
    errors.area = 'You must select a model area';
  }

  if (area && area.coordinates[0].x > area.coordinates[1].x) {
    errors.x0 = 'X start cannot be greater than X end.';
  }
  if (area && area.coordinates[0].y > area.coordinates[1].y) {
    errors.y0 = 'Y start cannot be greater than Y end.';
  }
  if (area && area.coordinates[0].x === area.coordinates[1].x) {
    errors.x0 = "X start/end coordinates can't be equal.";
  }
  if (area && area.coordinates[0].y === area.coordinates[1].y) {
    errors.y0 = "Y start/end coordinates can't be equal.";
  }
  if (area && NotANumber(area.coordinates[0].x)) {
    errors.x0 = 'Coordinates must be a number';
  }
  if (area && NotANumber(area.coordinates[0].y)) {
    errors.y0 = 'Coordinates must be a number';
  }
  if (area && NotANumber(area.coordinates[1].x)) {
    errors.x1 = 'Coordinates must be a number';
  }
  if (area && NotANumber(area.coordinates[1].y)) {
    errors.y1 = 'Coordinates must be a number';
  }
  if (area && area.coordinates[1].x === 0) {
    errors.x1 = 'Bottom right corner must be greater than 0';
  }

  if (
    area &&
    (area.coordinates[0].x === null ||
      area.coordinates[0].x === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[0].x === '')
  ) {
    errors.x0 = 'You must enter all four coordinates';
  }

  if (
    area &&
    (area.coordinates[0].y === null ||
      area.coordinates[0].y === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[0].y === '')
  ) {
    errors.y0 = 'You must enter all four coordinates';
  }

  if (
    area &&
    (area.coordinates[1].x === null ||
      area.coordinates[1].x === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[1].x === '')
  ) {
    errors.x1 = 'You must enter all four coordinates';
  }

  if (
    area &&
    (area.coordinates[1].y === null ||
      area.coordinates[1].y === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[1].y === '')
  ) {
    errors.y1 = 'You must enter all four coordinates';
  }

  return errors;
};
