import { Table } from '@equinor/eds-core-react';
import { useState } from 'react';
import { ValueInput } from './ValueInput';

interface Props {
  variable: variable;
}

type variable = {
  name: string;
  validators: {
    max: number;
    min: number;
  };
  units: string;
  type: string;
  id: string;
  default: number;
  factor: boolean;
};

export const TableRow = ({ variable }: Props) => {
  const isInput = (v: variable) => {
    return ['numeric', 'text', 'semver'].includes(v.type) || v.factor;
  };

  const [currentValue, setCurrentValue] = useState<string | number>();

  if (currentValue === undefined || currentValue === null) {
    setCurrentValue(variable.default);
  }

  if (isInput(variable))
    return (
      <Table.Row key={variable.id}>
        <Table.Cell>{variable.name}</Table.Cell>
        <Table.Cell>{currentValue}</Table.Cell>
        <Table.Cell>{variable.units}</Table.Cell>
        <Table.Cell>
          {variable.validators.min} / {variable.validators.max}
        </Table.Cell>
        <Table.Cell>
          {<ValueInput variable={variable} onSubmit={setCurrentValue} />}
        </Table.Cell>
      </Table.Row>
    );
};
