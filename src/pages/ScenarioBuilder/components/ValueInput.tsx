import { Button, Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { Controller, useForm } from 'react-hook-form';
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
Icon.add({ error_filled });

interface Props {
  variable: variable;
  onSubmit: (value: React.SetStateAction<string | number | undefined>) => void;
}

type validators = { min?: number; max?: number };
type variable = {
  name: string;
  validators: validators;
  units: string;
  type: string;
  id: string;
  default: number;
  factor: boolean;
};

export const ValueInput = ({ variable, onSubmit }: Props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      data: variable.default,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.data))}
      style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
    >
      <Controller
        name="data"
        control={control}
        rules={{
          required: 'Enter value within range',
          min: {
            value: variable.validators.min ?? Number.NEGATIVE_INFINITY,
            message:
              variable.validators.min != null
                ? `Enter value of at least ${variable.validators.min}`
                : '',
          },
          max: {
            value: variable.validators.max ?? Number.POSITIVE_INFINITY,
            message:
              variable.validators.max != null
                ? `Enter value of at most ${variable.validators.max}`
                : '',
          },
        }}
        render={({ field: { ref, ...props }, fieldState: { error } }) => (
          <TextField
            {...props}
            id={props.name}
            inputRef={ref}
            inputIcon={
              error ? <Icon data={error_filled} title="error" /> : undefined
            }
            helperText={error?.message}
            variant={error ? 'error' : undefined}
            style={{
              minWidth: '60px',
              maxWidth: '140px',
              alignContent: 'center',
            }}
          />
        )}
      />
      <Button type="submit" variant="outlined">
        Add
      </Button>
    </form>
  );
};
