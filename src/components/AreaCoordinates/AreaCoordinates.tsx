/* eslint-disable max-lines */
/* eslint-disable react/prop-types */
/* eslint-disable max-lines-per-function */

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
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
import { CoordinateInput } from './CoordinateInput/CoordinateInput';

type ErrorType = {
  area?: string;
  x0?: string;
  y0?: string;
  x1?: string;
  y1?: string;
};

export type AreaCoordinateType = {
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

  function NotANumber(value: any) {
    return isNaN(value);
  }

  const { data, isLoading } = useFetchModel(modelId);

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
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['analogue-model'] });
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
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['analogue-model'] });
    },
  });

  const handleSelectChange = async (
    changes: AutocompleteChanges<ModelAreaTypeDto>,
  ) => {
    setSubmitting(false);
    setErrors({});

    // If area dropdown is set to empty:
    //    Active area is set to default
    //    Coordinates are set to default
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

    const selectableAreas = data?.data?.modelAreas && data?.data?.modelAreas;

    const selectedArea = selectableAreas?.filter(
      (area) => area.modelAreaType === changes.selectedItems[0].name,
    );

    // Area has no previous coordinates set
    //    Initialize
    if (selectedArea?.length === 0) {
      if (activeArea) {
        // Clear possible old states, set default coordinates
        // Set Active area to the selected area
        // Set new area to send a POST request
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
    }
    // Model has previous coordinates
    // New area is undefint, PUT request will be sendt
    // Populate state with existing data
    else if (selectedArea && selectedArea?.length > 0) {
      setNewArea(undefined);

      const m0 = selectedArea[0].coordinates.filter((c) => c.m === 0);
      const m1 = selectedArea[0].coordinates.filter((c) => c.m === 1);

      const newState: AreaCoordinateType = {
        modelAreaId: selectedArea[0].modelAreaId,
        coordinates: [
          {
            x: m0[0].x,
            y: m0[0].y,
            m: 0,
          },
          {
            x: m1[0].x,
            y: m1[0].y,
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

  const clearAndUpdate = () => {
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
        clearAndUpdate();
      }
    }
  };

  const putModelArea = async () => {
    const coordinateRes = await putAreaCoordinates.mutateAsync({
      id: modelId,
      modelAreaId: areaCoordinate.modelAreaId,
      requestBody: { coordinates: areaCoordinate.coordinates },
    });
    if (coordinateRes.success) {
      clearAndUpdate();
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
      putModelArea();
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

  if (modelAreas.isLoading || modelAreas.data === undefined || isLoading)
    return <p>Loading.....</p>;

  return (
    <>
      <Styled.SideSheet>
        <Typography variant="h2">Model areas</Typography>
        <Styled.Form>
          <Styled.Info>
            <Typography variant="h6">
              {data?.success && data.data.name}
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
              <CoordinateInput
                label="X start"
                error={errors.x0 ? true : false}
                areaCoordinate={areaCoordinate}
                setCoordinates={setCoordinates}
                position={0}
                axis="x"
                activeArea={activeArea}
              />
              <CoordinateInput
                label="Y start"
                error={errors.y0 ? true : false}
                areaCoordinate={areaCoordinate}
                setCoordinates={setCoordinates}
                position={0}
                axis="y"
                activeArea={activeArea}
              />
            </Styled.CoordinateInputs>
          </Styled.CoordinateGroup>
          <Styled.CoordinateGroup>
            <Typography variant="h6">Bottom Right Corner </Typography>
            <Styled.CoordinateInputs>
              <CoordinateInput
                label="X end"
                error={errors.x1 ? true : false}
                areaCoordinate={areaCoordinate}
                setCoordinates={setCoordinates}
                position={1}
                axis="x"
                activeArea={activeArea}
              />
              <CoordinateInput
                label="Y end"
                error={errors.y1 ? true : false}
                areaCoordinate={areaCoordinate}
                setCoordinates={setCoordinates}
                position={1}
                axis="y"
                activeArea={activeArea}
              />
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
