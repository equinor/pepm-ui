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
    errors.area = 'Model area needs to be selected';
  }

  if (area && area.coordinates[0].x === area.coordinates[1].x) {
    errors.x0 = 'X coordinates can´t be equal.';
  }
  if (area && area.coordinates[0].y === area.coordinates[1].y) {
    errors.y0 = 'Y coordinates can´t be equal.';
  }
  if (area && NotANumber(area.coordinates[0].x)) {
    errors.x0 = 'Coordinates can´t be string, just numbers are allowed.';
  }
  if (area && NotANumber(area.coordinates[0].y)) {
    errors.y0 = 'Coordinates can´t be string, just numbers are allowed.';
  }
  if (area && NotANumber(area.coordinates[1].x)) {
    errors.x1 = 'Coordinates can´t be string, just numbers are allowed.';
  }
  if (area && NotANumber(area.coordinates[1].y)) {
    errors.y1 = 'Coordinates can´t be string, just numbers are allowed.';
  }
  if (area && area.coordinates[1].x === 0) {
    errors.x1 = 'Bottom right corner can not be 0.';
  }

  if (
    area &&
    (area.coordinates[0].x === null ||
      area.coordinates[0].x === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[0].x === '')
  ) {
    errors.x0 = 'All fields must be filled in';
  }

  if (
    area &&
    (area.coordinates[0].y === null ||
      area.coordinates[0].y === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[0].y === '')
  ) {
    errors.y0 = 'All fields must be filled in';
  }

  if (
    area &&
    (area.coordinates[1].x === null ||
      area.coordinates[1].x === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[1].x === '')
  ) {
    errors.x1 = 'All fields must be filled in';
  }

  if (
    area &&
    (area.coordinates[1].y === null ||
      area.coordinates[1].y === undefined ||
      // @ts-expect-error Autocomplete
      area.coordinates[1].y === '')
  ) {
    errors.y1 = 'All fields must be filled in';
  }

  return errors;
};
