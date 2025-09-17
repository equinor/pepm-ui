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

  const makeDigitPattern = (min?: number, max?: number) => {
    if (min != null && max != null) return new RegExp(`^\\d{${min},${max}}$`);
    if (min != null) return new RegExp(`^\\d{${min},}$`);
    if (max != null) return new RegExp(`^\\d{0,${max}}$`);
    return /^\d+$/; // default: one or more digits
  };

  // Tip: avoid /g (global) flag — it makes .test() stateful and causes flaky validation.
  const buildDigitLengthRules = (v?: validators) => {
    const { min, max } = v ?? {};
    const message =
      min != null && max != null
        ? `Enter ${min}-${max} digits`
        : min != null
        ? `Enter at least ${min} digits`
        : max != null
        ? `Enter at most ${max} digits`
        : 'Digits only';

    return {
      required: 'Required',
      pattern: {
        value: makeDigitPattern(min, max),
        message,
      },
    } as const;
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.data))}>
      <Controller
        name="data"
        control={control}
        rules={buildDigitLengthRules(variable.validators)}
        render={({ field: { ref, ...props }, fieldState: { error } }) => (
          <TextField
            {...props}
            id={props.name}
            label="Digits only"
            inputRef={ref}
            inputIcon={
              error ? <Icon data={error_filled} title="error" /> : undefined
            }
            helperText={error?.message}
            variant={error ? 'error' : undefined}
          />
        )}
      />
      <Button
        type="submit"
        style={{
          marginTop: '14px',
        }}
      >
        Submit
      </Button>
    </form>
  );
};
