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
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldValues, useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AnalogueModelsService } from '../../api/generated/services/AnalogueModelsService';
import optionTypes from '../../features/Compute/ComputeVariogram/CaseCard/CaseCard';
import * as Styled from './AreaCoordinates.styled';

const schema = z.object({
  area: z.string().min(1, { message: 'Ares is required' }),

  topX: z
    .string()
    .min(1, { message: 'Coordinate is required' })
    .max(12, { message: 'Coordinate is too long, max 12 characters' }),
  topY: z
    .string()
    .min(1, { message: 'Coordinate is required' })
    .max(12, { message: 'Coordinate is too long, max 12 characters' }),
  bottomX: z
    .string()
    .min(1, { message: 'Coordinate is required' })
    .max(12, { message: 'Coordinate is too long, max 12 characters' }),
  bottomY: z
    .string()
    .min(1, { message: 'Coordinate is required' })
    .max(12, { message: 'Coordinate is too long, max 12 characters' }),
});

export const AreaCoordinates = ({ modelId }: { modelId: string }) => {
  const [showSaveAlert, setSaveAlert] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['analogue-models', modelId],
    queryFn: () => AnalogueModelsService.getApiAnalogueModels1(modelId),
  });

  function clearStatus() {
    setSaveAlert(false);
  }

  const modelAreas: optionTypes[] = [
    { id: 10, name: 'Proximal' },
    { id: 11, name: 'Left' },
    { id: 12, name: 'Distal' },
  ];

  const areaCoordinats = {
    area: '',
    topX: '',
    topY: '',
    bottomX: '',
    bottomY: '',
  };

  const { control, register, handleSubmit, formState } = useForm({
    defaultValues: areaCoordinats,
    resolver: zodResolver(schema),
  });
  const { field } = useController({ name: 'area', control });

  const { errors } = formState;

  const handleSelectChange = (changes: AutocompleteChanges<optionTypes>) => {
    field.onChange(changes);
  };

  const handleSave = (formValues: FieldValues) => {
    setSaveAlert(true);
  };

  if (isLoading) <p>Loading.....</p>;

  return (
    <>
      <Styled.SideSheet>
        {data?.success && (
          <Typography variant="h2">{data.data.name}</Typography>
        )}
        <Typography variant="h3">Set coordinates: </Typography>
        <Styled.Form onSubmit={handleSubmit(handleSave)}>
          <Styled.CoordinateGroup
            className={errors.area && 'autocomplete-error'}
          >
            <Typography variant="h6">Area to define</Typography>

            <Autocomplete
              variant={errors.area ? 'error' : undefined}
              {...register('area')}
              label={'Select area'}
              options={modelAreas}
              optionLabel={(option) => option.name}
              onOptionsChange={handleSelectChange}
            ></Autocomplete>
            <div className={errors.area && 'error'}>
              {errors.area && errors.area?.message}
            </div>
          </Styled.CoordinateGroup>

          <Styled.CoordinateGroup>
            <Typography variant="h6">Top Left Corner</Typography>
            <div className={errors.topX && 'error'}>
              <Label label="X-coordinate" />
              <Input
                {...register('topX')}
                variant={errors.topX ? 'error' : undefined}
              />
              {errors.topX && errors.topX?.message}
            </div>
            <div className={errors.topY && 'error'}>
              <Label label="Y-coordinate" />
              <Input
                {...register('topY')}
                variant={errors.topY ? 'error' : undefined}
              />
              {errors.topY && errors.topY?.message}
            </div>
          </Styled.CoordinateGroup>
          <Styled.CoordinateGroup>
            <Typography variant="h6">Bottom Right Corner </Typography>
            <div className={errors.bottomX && 'error'}>
              <Label label="X-coordinate" />
              <Input
                {...register('bottomX')}
                variant={errors.bottomX ? 'error' : undefined}
              />
              {errors.bottomX && errors.bottomX?.message}
            </div>
            <div className={errors.bottomY && 'error'}>
              <Label label="Y-coordinate" />
              <Input
                {...register('bottomY')}
                variant={errors.bottomY ? 'error' : undefined}
              />
              {errors.bottomY && errors.bottomY?.message}
            </div>
          </Styled.CoordinateGroup>

          <Button type="submit">Save</Button>
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
