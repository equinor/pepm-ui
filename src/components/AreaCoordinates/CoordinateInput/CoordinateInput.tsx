import { Icon, Input, Label } from '@equinor/eds-core-react';
import { error_filled as ERROR_FILLED } from '@equinor/eds-icons';
import { ModelAreaTypeDto } from '../../../api/generated';
import { AreaCoordinateType } from '../AreaCoordinates';

export const CoordinateInput = ({
  label,
  error,
  areaCoordinate,
  setCoordinates,
  position,
  axis,
  activeArea,
}: {
  label: string;
  error: boolean;
  areaCoordinate: AreaCoordinateType | undefined;
  setCoordinates: (target: any, index: number, axis: string) => void;
  position: number;
  axis: string;
  activeArea: ModelAreaTypeDto;
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
        onChange={(input: { target: any }) =>
          setCoordinates(input.target, position, axis)
        }
        rightAdornments={
          error ? (
            <Icon data={ERROR_FILLED} color="red" size={24}></Icon>
          ) : (
            'meters'
          )
        }
        variant={error ? 'error' : undefined}
        disabled={activeArea?.modelAreaTypeId === ''}
      />
    </div>
  );
};
