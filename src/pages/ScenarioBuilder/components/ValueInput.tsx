import { Icon, TextField } from '@equinor/eds-core-react';
import { error_filled } from '@equinor/eds-icons';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ScenarioTemplateParameters,
  useScenarioStore,
} from '../stores/ScenarioStore';
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
Icon.add({ error_filled });

interface Props {
  variable: variable;
  onSubmit?: (value: React.SetStateAction<string | number | undefined>) => void;
}

type validators = { min?: number; max?: number; allowedValues: number[] };
type variable = {
  name: string;
  validators: validators;
  units: string;
  type: string;
  id: string;
  default: number;
  factor: boolean;
};

export const ValueInputMinMax = ({ variable }: Props) => {
  const updateParameter = useScenarioStore((state) => state.updateParameter);
  const { currentTemplate } = useScenarioStore();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      data: variable.default,
    },
  });

  // Reset form when variable.default changes (e.g., when a new template is loaded)
  useEffect(() => {
    reset({ data: variable.default });
  }, [variable.default, reset, currentTemplate]);

  const handleFormSubmit = (data: { data: number }) => {
    // Update the store with the parameter value
    updateParameter(
      variable.id as keyof ScenarioTemplateParameters,
      data.data as number,
    );
  };

  return (
    <form
      onChange={handleSubmit(handleFormSubmit)}
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
    </form>
  );
};

export const ValueInputAllowedValues = ({ variable }: Props) => {
  const updateParameter = useScenarioStore((state) => state.updateParameter);
  const { currentTemplate } = useScenarioStore();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      data: variable.default,
    },
  });

  // Reset form when variable.default changes (e.g., when a new template is loaded)
  useEffect(() => {
    reset({ data: variable.default });
  }, [variable.default, reset, currentTemplate]);

  const handleFormSubmit = (data: { data: number }) => {
    // Update the store with the parameter value
    updateParameter(
      variable.id as keyof ScenarioTemplateParameters,
      data.data as number,
    );
  };

  return (
    <form
      onChange={handleSubmit(handleFormSubmit)}
      style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
    >
      <Controller
        name="data"
        control={control}
        rules={{
          required: 'Enter value within range',
          validate: (value) =>
            variable.validators.allowedValues.includes(value)
              ? true
              : `Value must be one of: ${variable.validators.allowedValues.join(
                  ', ',
                )}`,
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
    </form>
  );
};
