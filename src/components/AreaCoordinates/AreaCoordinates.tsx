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

// const areaSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1, { message: 'Ares is required' }),
// });

const schema = z.object({
  // area: z.array(
  //   z.object({
  //     id: z.number(),
  //     name: z.string().min(1, { message: 'Ares is required' }),
  //   }),
  // ),
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

// type innput = z.input<typeof schema>;
// type output = z.infer<typeof schema>;

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

  // const selectedArea: optionTypes[] = [{ id: 10, name: 'Proximal' }];
  const areaCoordinats = {
    area: '',
    topX: '43',
    topY: '4133',
    bottomX: '89754',
    bottomY: '53345',
  };

  const { control, register, handleSubmit, formState } = useForm({
    defaultValues: areaCoordinats,
    resolver: zodResolver(schema),
  });
  const { field } = useController({ name: 'area', control });

  const { errors } = formState;

  const handleSelectChange = (changes: AutocompleteChanges<optionTypes>) => {
    console.log(changes);
    console.log(changes.selectedItems);
    console.log(changes.selectedItems[0]);

    field.onChange(changes);
    console.log(field.onChange);
    console.log(field.value);
    console.log(typeof field.value);
    console.log(field.value);
  };

  const handleSave = (formValues: FieldValues) => {
    console.log(formValues);
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
              className={errors.area && 'autocomplete-error'}
              {
                ...register('area')
                // ,
                // {
                //   setValueAs: (value: any) => Array(value),
                // }
              }
              label={'Select area'}
              options={modelAreas}
              optionLabel={(option) => option.name}
              onOptionsChange={handleSelectChange}
            ></Autocomplete>
            <div className={errors.area && 'autocomplete-error'}>
              {errors.area && errors.area?.message}
            </div>
          </Styled.CoordinateGroup>

          <Styled.CoordinateGroup>
            <Typography variant="h6">Top Left Corner</Typography>
            <div className={errors.topX && 'input-error'}>
              <Label label="X-coordinate" />
              <Input {...register('topX')} />
              {errors.topX && errors.topX?.message}
            </div>
            <div className={errors.topY && 'input-error'}>
              <Label label="Y-coordinate" />
              <Input {...register('topY')} />
              {errors.topY && errors.topY?.message}
            </div>
          </Styled.CoordinateGroup>
          <Styled.CoordinateGroup>
            <Typography variant="h6">Bottom Right Corner </Typography>
            <div className={errors.bottomX && 'input-error'}>
              <Label label="X-coordinate" />
              <Input {...register('bottomX')} />
              {errors.bottomX && errors.bottomX?.message}
            </div>
            <div className={errors.bottomY && 'input-error'}>
              <Label label="Y-coordinate" />
              <Input {...register('bottomY')} />
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
