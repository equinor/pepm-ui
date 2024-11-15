import { Typography } from '@equinor/eds-core-react';
import { CoordinateErrorType } from '../hooks/AreaCoordinates.hooks';

export const ErrorMessage = ({ errors }: { errors: CoordinateErrorType }) => {
  return (
    <>
      {/* Only render the <ul> wrapper if there are one or more errors */}
      {Object.values(errors).some((error) => !!error) && (
        <ul className="coordinate-errors">
          <li>
            <Typography group="input" variant="helper">
              {errors.area}
            </Typography>
          </li>
          <li>
            <Typography group="input" variant="helper">
              {errors.x0}
            </Typography>
          </li>
          <li>
            <Typography group="input" variant="helper">
              {errors.y0}
            </Typography>
          </li>
          <li>
            <Typography group="input" variant="helper">
              {errors.x1}
            </Typography>
          </li>
          <li>
            <Typography group="input" variant="helper">
              {errors.y1}
            </Typography>
          </li>
        </ul>
      )}
    </>
  );
};
