/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
/* eslint-disable max-lines-per-function */

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Input,
  Label,
  Snackbar,
  Typography,
} from '@equinor/eds-core-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  AddAnalogueModelAreaCommandForm,
  CoordinateDto,
  ModelAreaTypeDto,
  ModelAreaTypeService,
  UpdateAnalogueModelAreaCommandForm,
} from '../../api/generated';
import { AnalogueModelsService } from '../../api/generated/services/AnalogueModelsService';
import * as Styled from './AreaCoordinates.styled';

type ErrorType = {
  area?: string;
  x0?: string;
  y0?: string;
  x1?: string;
  y1?: string;
};

type AreaCoordinateType = {
  modelAreaId: string;
  coordinates: CoordinateDto[];
};

const defaultState: AreaCoordinateType = {
  modelAreaId: '',
  coordinates: [
    {
      x: 0,
      y: 0,
      m: 0,
    },
    {
      x: 0,
      y: 0,
      m: 1,
    },
  ],
};

export const AreaCoordinates = ({ modelId }: { modelId: string }) => {
  const [showSaveAlert, setSaveAlert] = useState(false);
  const [activeArea, setActiveArea] = useState<ModelAreaTypeDto>();
  const [updated, setUpdated] = useState(1);
  const [errors, setErrors] = useState<ErrorType>({});
  const [submitting, setSubmitting] = useState(false);
  const [areaCoodrinate, setAreaCoodrinate] = useState<
    AreaCoordinateType | undefined
  >(defaultState);

  const model = useQuery({
    queryKey: ['analogue-models', modelId, updated],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels1(modelId),
  });

  const modelAreas = useQuery({
    queryKey: ['model-area'],
    queryFn: () => ModelAreaTypeService.getApiModelareatype(),
  });

  const postAreaCoordinates = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelAreaCommandForm;
    }) => {
      return AnalogueModelsService.postApiAnalogueModelsModelAreas(
        id,
        requestBody,
      );
    },
  });

  const putAreaCoordinates = useMutation({
    mutationFn: ({
      id,
      modelAreaId,
      requestBody,
    }: {
      id: string;
      modelAreaId: string;
      requestBody: UpdateAnalogueModelAreaCommandForm;
    }) => {
      return AnalogueModelsService.putApiAnalogueModelsModelAreas(
        id,
        modelAreaId,
        requestBody,
      );
    },
  });

  function clearStatus() {
    setSaveAlert(false);
  }

  function isNumber(value: any) {
    return isNaN(value);
  }

  const validateCoordinates = (area: AreaCoordinateType | undefined) => {
    const errors: ErrorType = {};
    if (area && area.coordinates[0].x === area.coordinates[1].x) {
      errors.x0 = 'X coodridnates can´t be equal.';
      errors.x1 = 'X coodridnates can´t be equal.';
    }
    if (area && area.coordinates[0].y === area.coordinates[1].y) {
      errors.y0 = 'X coodridnates can´t be equal.';
      errors.y1 = 'X coodridnates can´t be equal.';
    }
    if (area && isNumber(area.coordinates[0].x)) {
      errors.x0 = 'Coodridnates can´t be string, just numbers is alowed.';
    }
    if (area && isNumber(area.coordinates[0].y)) {
      errors.y0 = 'Coodridnates can´t be string, just numbers is alowed.';
    }
    if (area && isNumber(area.coordinates[1].x)) {
      errors.x1 = 'Coodridnates can´t be string, just numbers is alowed.';
    }
    if (area && isNumber(area.coordinates[1].y)) {
      errors.y1 = 'Coodridnates can´t be string, just numbers is alowed.';
    }
    if (area && area.coordinates[1].x === 0) {
      errors.x1 = 'Bottom right conrner can not be 0.';
    }
    if (area && area.coordinates[1].y === 0) {
      errors.y1 = 'Bottom right conrner can not be 0.';
    }
    return errors;
  };

  const postModelArea = async () => {
    if (activeArea && areaCoodrinate) {
      const postRequestBody: AddAnalogueModelAreaCommandForm = {
        modelAreaTypeId: activeArea.modelAreaTypeId,
        coordinates: areaCoodrinate.coordinates,
      };

      const coordinateRes = await postAreaCoordinates.mutateAsync({
        id: modelId,
        requestBody: postRequestBody,
      });

      if (coordinateRes.success) {
        setUpdated(updated + 1);
        setActiveArea(undefined);
        setAreaCoodrinate(defaultState);
        setSaveAlert(true);
      }
    }
  };

  const handleSubmit = () => {
    setErrors(validateCoordinates(areaCoodrinate));
    setSubmitting(true);
  };

  const handleSave = async () => {
    if (!areaCoodrinate || !areaCoodrinate.coordinates) {
      return;
    }

    if (activeArea) {
      postModelArea();
    } else {
      const coordinateRes = await putAreaCoordinates.mutateAsync({
        id: modelId,
        modelAreaId: areaCoodrinate.modelAreaId,
        requestBody: { coordinates: areaCoodrinate.coordinates },
      });
      if (coordinateRes.success) {
        setUpdated(updated + 1);
        setAreaCoodrinate(defaultState);
        setSaveAlert(true);
      }
    }
  };

  const handleSelectChange = async (
    changes: AutocompleteChanges<ModelAreaTypeDto>,
  ) => {
    setSubmitting(false);
    setErrors({});
    if (changes.selectedItems.length <= 0) {
      setAreaCoodrinate(defaultState);
      return;
    }

    const areasWithCoordinates =
      model.data?.data?.modelAreas && model.data?.data?.modelAreas;

    const selectedArea = areasWithCoordinates?.filter(
      (area) => area.modelAreaType === changes.selectedItems[0].name,
    );

    if (selectedArea?.length === 0) {
      setActiveArea(changes.selectedItems[0]);
    }

    if (selectedArea && selectedArea?.length > 0) {
      const newState: AreaCoordinateType = {
        modelAreaId: selectedArea[0].modelAreaId,
        coordinates: [
          {
            x: selectedArea[0].coordinates[0].x,
            y: selectedArea[0].coordinates[0].y,
            m: 0,
          },
          {
            x: selectedArea[0].coordinates[1].x,
            y: selectedArea[0].coordinates[1].y,
            m: 1,
          },
        ],
      };
      setAreaCoodrinate(newState);
    } else {
      setAreaCoodrinate(defaultState);
    }
  };

  const setCoodrinates = (target: any, index: number, axis: string) => {
    if (!areaCoodrinate) return;

    const uppdatedArea = {
      ...areaCoodrinate?.coordinates[index],
      [axis]: target.value,
    };
    const newCoordinates = { ...areaCoodrinate };
    newCoordinates.coordinates[index] = uppdatedArea;
    setAreaCoodrinate(newCoordinates);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      handleSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, submitting]);

  if (modelAreas.isLoading || modelAreas.data === undefined || model.isLoading)
    return <p>Loading.....</p>;

  return (
    <>
      <Styled.SideSheet>
        {model.data?.success && (
          <Typography variant="h2">{model.data.data.name}</Typography>
        )}
        <Typography variant="h3">Set coordinates: </Typography>
        <Styled.Form>
          <Styled.CoordinateGroup className={'autocomplete-error'}>
            <Typography variant="h6">Area to define</Typography>

            <Autocomplete
              className={errors?.area && 'autocomplete-error'}
              label={'Select area'}
              options={modelAreas.data.data}
              optionLabel={(option) => option.name}
              onOptionsChange={handleSelectChange}
            ></Autocomplete>
            <div className={'autocomplete-error'}>{errors?.area}</div>
          </Styled.CoordinateGroup>

          <Styled.CoordinateGroup>
            <Typography variant="h6">Top Left Corner</Typography>
            <div className={errors?.x0 && 'input-error'}>
              <Label label="X-coordinate" />
              <Input
                value={areaCoodrinate?.coordinates[0].x}
                onChange={(input: { target: any }) =>
                  setCoodrinates(input.target, 0, 'x')
                }
              />
              {errors?.x0}
            </div>
            <div className={errors?.y0 && 'input-error'}>
              <Label label="Y-coordinate" />
              <Input
                value={areaCoodrinate?.coordinates[0].y}
                onChange={(input: { target: any }) =>
                  setCoodrinates(input.target, 0, 'y')
                }
              />
              {errors?.y0}
            </div>

            {/* <CoordinateInput
              errors={errors}
              areaCoodrinate={areaCoodrinate}
              setCoodrinates={setCoodrinates}
              position={0}
              axis="x"
            />
            <CoordinateInput
              errors={errors}
              areaCoodrinate={areaCoodrinate}
              setCoodrinates={setCoodrinates}
              position={0}
              axis="y"
            /> */}
          </Styled.CoordinateGroup>
          <Styled.CoordinateGroup>
            <Typography variant="h6">Bottom Right Corner </Typography>
            <div className={errors?.x1 && 'input-error'}>
              <Label label="X-coordinate" />
              <Input
                value={areaCoodrinate?.coordinates[1].x}
                onChange={(input: { target: any }) =>
                  setCoodrinates(input.target, 1, 'x')
                }
              />
              {errors?.x1}
            </div>
            <div className={errors?.y1 && 'input-error'}>
              <Label label="Y-coordinate" />
              <Input
                value={areaCoodrinate?.coordinates[1].y}
                onChange={(input: { target: any }) =>
                  setCoodrinates(input.target, 1, 'y')
                }
              />
              {errors?.y1}
            </div>
            {/* <CoordinateInput
              errors={errors}
              areaCoodrinate={areaCoodrinate}
              setCoodrinates={setCoodrinates}
              position={1}
              axis="x"
            />
            <CoordinateInput
              errors={errors}
              areaCoodrinate={areaCoodrinate}
              setCoodrinates={setCoodrinates}
              position={1}
              axis="y"
            /> */}
          </Styled.CoordinateGroup>

          <Button onClick={handleSubmit}>Save</Button>
        </Styled.Form>
      </Styled.SideSheet>
      <Snackbar
        open={!!showSaveAlert}
        autoHideDuration={3000}
        onClose={clearStatus}
      >
        {'Area coordinates saved'}
      </Snackbar>
    </>
  );
};

// const CoordinateInput = ({
//   errors,
//   areaCoodrinate,
//   setCoodrinates,
//   position,
//   axis,
// }: {
//   errors: ErrorType;
//   areaCoodrinate: AreaCoordinateType | undefined;
//   setCoodrinates: (target: any, index: number, axis: string) => void;
//   position: number;
//   axis: string;
// }) => {
//   return (
//     <div className={errors.y1 && 'input-error'}>
//       <Label label="Y-coordinate" />
//       <Input
//         value={
//           axis === 'x'
//             ? areaCoodrinate?.coordinates[position].x
//             : areaCoodrinate?.coordinates[position].y
//         }
//         onChange={(input: { target: any }) =>
//           setCoodrinates(input.target, position, axis)
//         }
//       />
//       {errors?.y1}
//     </div>
//   );
// };
