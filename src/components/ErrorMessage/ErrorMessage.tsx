import { CoordinateErrorType } from '../AreaCoordinates/AreaCoordinates.hooks';

export const ErrorMessage = ({ errors }: { errors: CoordinateErrorType }) => {
  return (
    <>
      {errors && (
        <div>
          {' '}
          <p>{errors.area}</p>
          <p>{errors.x0}</p>
          <p>{errors.y0}</p>
          <p>{errors.x1}</p>
          <p>{errors.y1}</p>
        </div>
      )}
    </>
  );
};
