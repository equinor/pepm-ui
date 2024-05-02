/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import {
  Autocomplete,
  AutocompleteChanges,
  Banner,
  Button,
  Typography,
} from '@equinor/eds-core-react';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AddAnalogueModelAreaCommandForm,
  CoordinateDto,
  ModelAreaTypeDto,
} from '../../api/generated';
import Img from '../../features/ModelView/image.png';
import { useFetchCases } from '../../hooks/useFetchCases';
import { useFetchModel } from '../../hooks/useFetchModel';
import { useFetchModelAreas } from '../../hooks/useFetchModelAreas';
import { useMutateAreaCoordinates } from '../../hooks/useMutateAreaCoordinates';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ImageView } from '../ImageView/ImageView';
import * as Styled from './AreaCoordinates.styled';
import { CoordinateInput } from './CoordinateInput/CoordinateInput';
import {
  CoordinateErrorType,
  validateCoordinates,
} from './hooks/AreaCoordinates.hooks';
import { useModelResults } from './hooks/useModelResults';

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

export const AreaCoordinates = ({
  setSaveAlert,
}: {
  setSaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeArea, setActiveArea] = useState<ModelAreaTypeDto>(defaultArea);
  const [newArea, setNewArea] = useState<ModelAreaTypeDto>();
  const [errors, setErrors] = useState<CoordinateErrorType>({});
  const [edit, setEdit] = useState<boolean>(false);
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
  const [fallbackAreaCoordinate, setfallbackAreaCoordinate] =
    useState<AreaCoordinateType>();
  const { modelId } = useParams();
  const { data, isLoading } = useFetchModel(modelId);
  const cases = useFetchCases();
  const { activeAreaResultList } = useModelResults(
    activeArea.name,
    cases.data?.data,
  );
  const modelAreas = useFetchModelAreas();
  const mutateAreaCoordinates = useMutateAreaCoordinates();

  const handleSelectChange = async (
    changes: AutocompleteChanges<ModelAreaTypeDto>,
  ) => {
    setEdit(false);
    setErrors({});

    // If area dropdown is set to empty:
    //    Active area is set to default
    //    Coordinates are set to default
    if (changes.selectedItems.length <= 0) {
      setActiveArea(defaultArea);
      setAreaCoordinate(defaultState);
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

      if (
        fallbackAreaCoordinate === undefined ||
        activeArea.modelAreaTypeId !== fallbackAreaCoordinate.modelAreaId
      ) {
        setfallbackAreaCoordinate(cloneDeep(newState));
      }

      setAreaCoordinate(cloneDeep(newState));
    } else {
      setNewArea(undefined);
      setActiveArea(changes.selectedItems[0]);
      setAreaCoordinate(defaultState);
    }
  };

  const clearAndUpdate = async () => {
    setEdit(false);
    return 'success';
  };

  const setCoordinates = (value: string, index: number, axis: string) => {
    if (!areaCoordinate) return;

    const uppdatedArea = {
      ...areaCoordinate?.coordinates[index],
      [axis]: value,
    };
    const newCoordinates = { ...areaCoordinate };
    newCoordinates.coordinates[index] = uppdatedArea;
    setAreaCoordinate(newCoordinates);
  };

  const postModelArea = async () => {
    if (modelId) {
      if (activeArea && areaCoordinate) {
        const postRequestBody: AddAnalogueModelAreaCommandForm = {
          modelAreaTypeId: activeArea.modelAreaTypeId,
          coordinates: areaCoordinate.coordinates,
        };

        const coordinateRes =
          await mutateAreaCoordinates.postAreaCoordinates.mutateAsync({
            id: modelId,
            requestBody: postRequestBody,
          });

        if (coordinateRes.success) {
          const res = await clearAndUpdate();
          if (res === 'success') setSaveAlert(true);
        }
      }
    }
  };

  const putModelArea = async () => {
    if (modelId) {
      const coordinateRes =
        await mutateAreaCoordinates.putAreaCoordinates.mutateAsync({
          id: modelId,
          modelAreaId: areaCoordinate.modelAreaId,
          requestBody: { coordinates: areaCoordinate.coordinates },
        });
      if (coordinateRes.success) {
        const res = await clearAndUpdate();
        if (res === 'success') setSaveAlert(true);
      }
    }
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
  const handleSubmit = async () => {
    const err = await validateCoordinates(areaCoordinate, activeArea);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      handleSave();
    }
  };

  const handleEditChange = () => {
    setEdit(!edit);
  };

  const handleCancleEdit = () => {
    fallbackAreaCoordinate &&
      setAreaCoordinate(cloneDeep(fallbackAreaCoordinate));

    setErrors({});
    setEdit(!edit);
  };

  if (modelAreas.isLoading || modelAreas.data === undefined || isLoading)
    return <p>Loading.....</p>;

  return (
    <>
      <Styled.ContentSplitter>
        <Styled.Selects>
          <Styled.CoordinateGroup className={'autocomplete-error'}>
            <Autocomplete
              className={errors?.area && 'autocomplete-error'}
              label={'Select area'}
              options={modelAreas.data.data}
              optionLabel={(option) => option.name}
              onOptionsChange={handleSelectChange}
              selectedOptions={[activeArea]}
              variant={errors.area ? 'error' : undefined}
            ></Autocomplete>
          </Styled.CoordinateGroup>

          {activeArea.name !== '' && (
            <Styled.CoordinateFields>
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
                    edit={edit}
                  />
                  <CoordinateInput
                    label="Y start"
                    error={errors.y0 ? true : false}
                    areaCoordinate={areaCoordinate}
                    setCoordinates={setCoordinates}
                    position={0}
                    axis="y"
                    edit={edit}
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
                    edit={edit}
                  />
                  <CoordinateInput
                    label="Y end"
                    error={errors.y1 ? true : false}
                    areaCoordinate={areaCoordinate}
                    setCoordinates={setCoordinates}
                    position={1}
                    axis="y"
                    edit={edit}
                  />
                </Styled.CoordinateInputs>

                {errors && <ErrorMessage errors={errors}></ErrorMessage>}
              </Styled.CoordinateGroup>
              {activeAreaResultList &&
                activeAreaResultList?.length > 0 &&
                edit && (
                  <Styled.Warning elevation="none">
                    <Banner.Message>
                      IMPORTANT - this model area has one or more results in
                      object or variogram cases. Changing the coordinates will
                      discard any associated result.
                    </Banner.Message>
                  </Styled.Warning>
                )}

              <Styled.Buttons>
                {edit ? (
                  <>
                    <Button onClick={handleSubmit}>Save coordinates</Button>
                    <Button variant="outlined" onClick={handleCancleEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outlined" onClick={handleEditChange}>
                    Edit coordinates
                  </Button>
                )}
              </Styled.Buttons>
            </Styled.CoordinateFields>
          )}
        </Styled.Selects>

        <ImageView
          text="Model placeholder image"
          img={Img}
          altText="Model placeholder image"
        />
      </Styled.ContentSplitter>
    </>
  );
};
