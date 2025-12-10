/* eslint-disable camelcase */
import { Table, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { ValueInput } from './ValueInput';
import TooltipPopover from './TooltipPopover';
// import { tokens } from '@equinor/eds-tokens';

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
        <Table.Cell>
          {variable.name}{' '}
          {
            <Typography variant="meta">
              {variable.validators.min} - {variable.validators.max}
            </Typography>
          }
        </Table.Cell>
        <Table.Cell>
          {<ValueInput variable={variable} onSubmit={setCurrentValue} />}
        </Table.Cell>
        <Table.Cell>{variable.units}</Table.Cell>
        <Table.Cell>
          {TooltipPopover({
            tooltipTitle: variable.name,
            description:
              'Add superlong description here just to see how it behaves when i hit da buttooooon',
          })}
        </Table.Cell>
      </Table.Row>
    );
};
