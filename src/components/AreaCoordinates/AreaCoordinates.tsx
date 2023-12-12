/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
/* eslint-disable max-lines-per-function */

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  Icon,
  Input,
  Label,
  Snackbar,
  Typography,
} from '@equinor/eds-core-react';
import { error_filled as ERROR_FILLED } from '@equinor/eds-icons';
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

const defaultArea: ModelAreaTypeDto = {
  description: '',
  modelAreaTypeId: '',
  name: '',
};

export const AreaCoordinates = ({ modelId }: { modelId: string }) => {
  const [showSaveAlert, setSaveAlert] = useState(false);
  const [activeArea, setActiveArea] = useState<ModelAreaTypeDto>(defaultArea);
  const [newArea, setNewArea] = useState<ModelAreaTypeDto>();
  const [updated, setUpdated] = useState(1);
  const [errors, setErrors] = useState<ErrorType>({});
  const [submitting, setSubmitting] = useState(false);
  const [areaCoordinate, setAreaCoordinate] = useState<AreaCoordinateType>({
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
  });

  function clearStatus() {
    setSaveAlert(false);
  }

  function isNumber(value: any) {
    return isNaN(value);
  }

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

  const handleSelectChange = async (
    changes: AutocompleteChanges<ModelAreaTypeDto>,
  ) => {
    setSubmitting(false);
    setErrors({});

    if (changes.selectedItems.length <= 0) {
      setActiveArea(defaultArea);
      setAreaCoordinate({
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
      });
      return;
    }

    const areasWithCoordinates =
      model.data?.data?.modelAreas && model.data?.data?.modelAreas;

    const selectedArea = areasWithCoordinates?.filter(
      (area) => area.modelAreaType === changes.selectedItems[0].name,
    );

    if (selectedArea?.length === 0) {
      if (activeArea) {
        setAreaCoordinate({
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
        });
      }
      setActiveArea(changes.selectedItems[0]);
      setNewArea(changes.selectedItems[0]);
    } else if (selectedArea && selectedArea?.length > 0) {
      setNewArea(undefined);
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

      setActiveArea(changes.selectedItems[0]);
      setAreaCoordinate(newState);
    } else {
      setNewArea(undefined);
      setActiveArea(changes.selectedItems[0]);
      setAreaCoordinate(defaultState);
    }
  };

  const validateCoordinates = (area: AreaCoordinateType | undefined) => {
    const errors: ErrorType = {};
    if (!activeArea || activeArea.modelAreaTypeId === '') {
      errors.area = 'Moedl area needs to be selected';
    }

    if (area && area.coordinates[0].x === area.coordinates[1].x) {
      errors.x0 = 'X coodridnates can´t be equal.';
    }
    if (area && area.coordinates[0].y === area.coordinates[1].y) {
      errors.y0 = 'Y coodridnates can´t be equal.';
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
    if (area && (area.coordinates[1].x === 0 || area.coordinates[1].y === 0)) {
      errors.x1 = 'Bottom right conrner can not be 0.';
      errors.y1 = 'Bottom right conrner can not be 0.';
    }

    if (
      area &&
      (area.coordinates[0].x === null ||
        area.coordinates[0].x === undefined ||
        // @ts-expect-error Autocomplete
        area.coordinates[0].x === '')
    ) {
      errors.x0 = 'All fields munst be filled in';
    }

    if (
      area &&
      (area.coordinates[0].y === null ||
        area.coordinates[0].y === undefined ||
        // @ts-expect-error Autocomplete
        area.coordinates[0].y === '')
    ) {
      errors.y0 = 'All fields munst be filled in';
    }

    if (
      area &&
      (area.coordinates[1].x === null ||
        area.coordinates[1].x === undefined ||
        // @ts-expect-error Autocomplete
        area.coordinates[1].x === '')
    ) {
      errors.x1 = 'All fields munst be filled in';
    }

    if (
      area &&
      (area.coordinates[1].y === null ||
        area.coordinates[1].y === undefined ||
        // @ts-expect-error Autocomplete
        area.coordinates[1].y === '')
    ) {
      errors.y1 = 'All fields munst be filled in';
    }

    return errors;
  };

  const postModelArea = async () => {
    if (activeArea && areaCoordinate) {
      const postRequestBody: AddAnalogueModelAreaCommandForm = {
        modelAreaTypeId: activeArea.modelAreaTypeId,
        coordinates: areaCoordinate.coordinates,
      };

      const coordinateRes = await postAreaCoordinates.mutateAsync({
        id: modelId,
        requestBody: postRequestBody,
      });

      if (coordinateRes.success) {
        setActiveArea(defaultArea);
        setAreaCoordinate({
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
        });
        setUpdated(updated + 1);
        setSaveAlert(true);
      }
    }
  };

  const handleSubmit = () => {
    setErrors(validateCoordinates(areaCoordinate));
    setSubmitting(true);
  };

  const handleSave = async () => {
    if (!areaCoordinate || !areaCoordinate.coordinates) {
      return;
    }
    if (newArea) {
      postModelArea();
    } else {
      const coordinateRes = await putAreaCoordinates.mutateAsync({
        id: modelId,
        modelAreaId: areaCoordinate.modelAreaId,
        requestBody: { coordinates: areaCoordinate.coordinates },
      });
      if (coordinateRes.success) {
        setUpdated(updated + 1);
        setActiveArea(defaultArea);
        setAreaCoordinate(defaultState);
        setSaveAlert(true);
        setNewArea(undefined);
      }
    }
  };

  const setCoordinates = (target: any, index: number, axis: string) => {
    if (!areaCoordinate) return;

    const uppdatedArea = {
      ...areaCoordinate?.coordinates[index],
      [axis]: target.value,
    };
    const newCoordinates = { ...areaCoordinate };
    newCoordinates.coordinates[index] = uppdatedArea;
    setAreaCoordinate(newCoordinates);
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
        <Typography variant="h2">Model areas</Typography>
        <Styled.Form>
          <Styled.Info>
            <Typography variant="h6">
              {model.data?.success && model.data.data.name}
            </Typography>
            <Typography variant="body_long">
              Select from predefined model areas and set the X/Y coordinates for
              each area.
            </Typography>
          </Styled.Info>
          <Styled.CoordinateGroup className={'autocomplete-error'}>
            <Autocomplete
              className={errors?.area && 'autocomplete-error'}
              label={'Select area'}
              options={modelAreas.data.data}
              optionLabel={(option) => option.name}
              onOptionsChange={handleSelectChange}
              variant={errors.area ? 'error' : undefined}
            ></Autocomplete>
          </Styled.CoordinateGroup>

          <Styled.CoordinateGroup>
            <Typography variant="h6">Top Left Corner</Typography>
            <Styled.CoordinateInputs>
              <div>
                <Label label="X start" />
                <Input
                  value={areaCoordinate?.coordinates[0].x}
                  onChange={(input: { target: any }) =>
                    setCoordinates(input.target, 0, 'x')
                  }
                  rightAdornments={
                    errors?.x0 ? (
                      <Icon data={ERROR_FILLED} color="red" size={24}></Icon>
                    ) : (
                      'meters'
                    )
                  }
                  variant={errors?.x0 ? 'error' : undefined}
                  disabled={activeArea?.modelAreaTypeId === ''}
                />
              </div>
              <div>
                <Label label="Y start" />
                <Input
                  value={areaCoordinate?.coordinates[0].y}
                  onChange={(input: { target: any }) =>
                    setCoordinates(input.target, 0, 'y')
                  }
                  rightAdornments={
                    errors?.y0 ? (
                      <Icon data={ERROR_FILLED} color="red" size={24}></Icon>
                    ) : (
                      'meters'
                    )
                  }
                  variant={errors?.y0 ? 'error' : undefined}
                  disabled={activeArea?.modelAreaTypeId === ''}
                />
              </div>
            </Styled.CoordinateInputs>
          </Styled.CoordinateGroup>
          <Styled.CoordinateGroup>
            <Typography variant="h6">Bottom Right Corner </Typography>
            <Styled.CoordinateInputs>
              <div>
                <Label label="X end" />
                <Input
                  value={areaCoordinate?.coordinates[1].x}
                  onChange={(input: { target: any }) =>
                    setCoordinates(input.target, 1, 'x')
                  }
                  rightAdornments={
                    errors?.x1 ? (
                      <Icon data={ERROR_FILLED} color="red" size={24}></Icon>
                    ) : (
                      'meters'
                    )
                  }
                  variant={errors?.x1 ? 'error' : undefined}
                  disabled={activeArea?.modelAreaTypeId === ''}
                />
              </div>
              <div>
                <Label label="Y end" />
                <Input
                  value={areaCoordinate?.coordinates[1].y}
                  onChange={(input: { target: any }) =>
                    setCoordinates(input.target, 1, 'y')
                  }
                  rightAdornments={
                    errors?.y1 ? (
                      <Icon data={ERROR_FILLED} color="red" size={24}></Icon>
                    ) : (
                      'meters'
                    )
                  }
                  variant={errors?.y1 ? 'error' : undefined}
                  disabled={activeArea?.modelAreaTypeId === ''}
                />
              </div>
            </Styled.CoordinateInputs>

            <div>
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
            </div>
          </Styled.CoordinateGroup>

          <Button onClick={handleSubmit}>Save</Button>
        </Styled.Form>
      </Styled.SideSheet>
      <Snackbar
        open={!!showSaveAlert}
        autoHideDuration={3000}
        onClose={clearStatus}
      >
        {'Saved model area'}
      </Snackbar>
    </>
  );
};
