/* eslint-disable max-lines-per-function */
import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Input,
  Label,
  Typography,
} from '@equinor/eds-core-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AnalogueModelsService } from '../../api/generated/services/AnalogueModelsService';
import optionTypes from '../../features/Compute/ComputeVariogram/CaseCard/CaseCard';
import * as Styled from './AreaCoordinates.styled';

interface CoordinateType {
  top: {
    X?: string;
    Y?: string;
  };
  bottom: {
    X?: string;
    Y?: string;
  };
}

type AreaErrorType = {
  area?: string;
  coordinateTop?: string;
  coordinateBottom?: string;
};
export const AreaCoordinates = ({ modelId }: { modelId: string }) => {
  const [selectedArea, setSelectedArea] = useState<optionTypes>();
  const [areaCoordinats, setAreaCoordinats] = useState<CoordinateType>({
    top: {
      X: undefined,
      Y: undefined,
    },
    bottom: {
      X: undefined,
      Y: undefined,
    },
  });
  const [errors, setErrors] = useState<AreaErrorType>({});
  const [submitting, setSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['analogue-models', modelId],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels1(modelId),
  });

  const modelAreas: optionTypes[] = [
    { id: 10, name: 'Proximal' },
    { id: 11, name: 'Left' },
    { id: 12, name: 'Distal' },
  ];

  const validateValues = (
    selectedArea?: optionTypes,
    areaCoordinats?: CoordinateType,
  ) => {
    const errors: AreaErrorType = {};
    if (selectedArea === undefined) {
      errors.area = 'Area to define coordinates for not selected';
    }

    if (
      areaCoordinats?.top.X === undefined ||
      areaCoordinats?.top.Y === undefined ||
      areaCoordinats?.top.X.length < 1 ||
      areaCoordinats?.top.Y.length < 1
    ) {
      errors.coordinateTop = 'Top coordinates not selected';
    }

    if (
      areaCoordinats?.bottom.X === undefined ||
      areaCoordinats?.bottom.Y === undefined ||
      areaCoordinats?.bottom.X.length < 1 ||
      areaCoordinats?.bottom.Y.length < 1
    ) {
      errors.coordinateBottom = 'Bottom coordinates not selected';
    }
    console.log(errors);

    return errors;
  };

  const finishSubmit = () => {
    console.log(selectedArea);
    console.log(areaCoordinats);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, submitting]);

  const saveChange = () => {
    setErrors(validateValues(selectedArea, areaCoordinats));
    setSubmitting(true);
  };

  if (isLoading) <p>Loading.....</p>;

  return (
    <Styled.SideSheet>
      {data?.success && <Typography variant="h2">{data.data.name}</Typography>}
      <Typography variant="h3">Set coordinates: </Typography>
      <Styled.Form>
        <Styled.CoordinateGroup>
          <Typography variant="h6">Area to define</Typography>

          <Autocomplete
            className={errors.area && 'autocomplete-error'}
            label={'Select area'}
            options={modelAreas}
            optionLabel={(option) => option.name}
            onOptionsChange={(changes: AutocompleteChanges<optionTypes>) =>
              setSelectedArea(changes.selectedItems[0])
            }
          ></Autocomplete>
        </Styled.CoordinateGroup>

        <Styled.CoordinateGroup>
          <Typography variant="h6">Top Left Corner</Typography>
          <div className={errors.coordinateTop && 'input-error'}>
            <Label label="X-coordinate" />
            <Input
              type="string"
              value={areaCoordinats.top.X}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAreaCoordinats({
                  ...areaCoordinats,
                  top: { ...areaCoordinats.top, X: e.currentTarget.value },
                })
              }
            />
          </div>
          <div className={errors.coordinateTop && 'input-error'}>
            <Label label="Y-coordinate" />
            <Input
              type="string"
              value={areaCoordinats.top.Y}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAreaCoordinats({
                  ...areaCoordinats,
                  top: { ...areaCoordinats.top, Y: e.currentTarget.value },
                })
              }
            />
          </div>
        </Styled.CoordinateGroup>
        <Styled.CoordinateGroup>
          <Typography variant="h6">Bottom Right Corner </Typography>
          <div className={errors.coordinateBottom && 'input-error'}>
            <Label label="X-coordinate" />
            <Input
              type="string"
              value={areaCoordinats.bottom.X}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAreaCoordinats({
                  ...areaCoordinats,
                  bottom: {
                    ...areaCoordinats.bottom,
                    X: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
          <div className={errors.coordinateBottom && 'input-error'}>
            <Label label="Y-coordinate" />
            <Input
              type="string"
              value={areaCoordinats.bottom.Y}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAreaCoordinats({
                  ...areaCoordinats,
                  bottom: {
                    ...areaCoordinats.bottom,
                    Y: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
        </Styled.CoordinateGroup>
        {(errors.area || errors.coordinateBottom || errors.coordinateTop) && (
          <Styled.ErrorMessage variant="h4">
            Highlighted fields required
          </Styled.ErrorMessage>
        )}
        <Button onClick={saveChange}>Save</Button>
      </Styled.Form>
    </Styled.SideSheet>
  );
};

/**
 * 
 * <CoordinateSet
        label="Top Left Corner"
        position={areaCoordinats.top}
        areaCoordinats={areaCoordinats}
        setAreaCoordinats={setAreaCoordinats}
      ></CoordinateSet>
 * 
const CoordinateSet = ({
  label,
  position,
  areaCoordinats,
  setAreaCoordinats,
}: {
  label: string;
  position: {
    X: string;
    Y: string;
  };
  areaCoordinats: CoordinateType;
  setAreaCoordinats: (areaCoordinats: CoordinateType) => void;
}) => {
  return (
    <div>
      <Typography variant="h6">{label}</Typography>
      <div>
        <Label label="X-coordinate" />
        <Input
          type="string"
          value={areaCoordinats.top.X}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setAreaCoordinats({
              ...areaCoordinats,
              [position.X]: {
                ...[position],
                X: e.currentTarget.value,
              },
            })
          }
        />
      </div>
      <div>
        <Label label="Y-coordinate" />
        <Input
          type="string"
          value={areaCoordinats.top.Y}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setAreaCoordinats({
              ...areaCoordinats,
              [position.Y]: {
                ...[position],
                Y: e.currentTarget.value,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
 */
