import { Icon, Input, Label } from '@equinor/eds-core-react';
import { error_filled as ERROR_FILLED } from '@equinor/eds-icons';
import { AreaCoordinateType } from '../AreaCoordinates';

export const CoordinateInput = ({
  label,
  error,
  areaCoordinate,
  setCoordinates,
  position,
  axis,
  edit,
}: {
  label: string;
  error: boolean;
  areaCoordinate: AreaCoordinateType | undefined;
  setCoordinates: (value: string, index: number, axis: string) => void;
  position: number;
  axis: string;
  edit: boolean;
}) => {
  return (
    <div>
      <Label label={label} />
      <Input
        value={
          axis === 'x'
            ? areaCoordinate?.coordinates[position].x
            : areaCoordinate?.coordinates[position].y
        }
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setCoordinates(e.currentTarget.value, position, axis)
        }
        rightAdornments={
          error ? (
            <Icon data={ERROR_FILLED} color="red" size={24}></Icon>
          ) : (
            'meters'
          )
        }
        variant={error ? 'error' : undefined}
        disabled={!edit}
      />
    </div>
  );
};
