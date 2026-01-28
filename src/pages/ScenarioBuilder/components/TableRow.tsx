/* eslint-disable camelcase */
import { Table, Typography } from '@equinor/eds-core-react';
import { ValueInputAllowedValues, ValueInputMinMax } from './ValueInput';
import TooltipPopover from './TooltipPopover';

interface Props {
  variable: variable;
}

type variable = {
  name: string;
  validators: {
    max: number;
    min: number;
    allowedValues: number[];
  };
  units: string;
  type: string;
  id: string;
  default: number;
  factor: boolean;
  description: string;
};

export const TableRow = ({ variable }: Props) => {
  const isInput = (v: variable) => {
    return ['numeric', 'text', 'semver'].includes(v.type) || v.factor;
  };

  if (isInput(variable))
    return (
      <Table.Row key={variable.id}>
        <Table.Cell>
          {variable.name}{' '}
          {variable.validators.min !== undefined &&
            variable.validators.max !== undefined && (
              <Typography variant="meta">
                {variable.validators.min} - {variable.validators.max}
              </Typography>
            )}
          {variable.validators.allowedValues !== undefined && (
            <Typography variant="meta">
              {variable.validators.allowedValues.join(' or ')}
            </Typography>
          )}
        </Table.Cell>
        <Table.Cell>
          {variable.validators.min !== undefined &&
            variable.validators.max !== undefined && (
              <ValueInputMinMax variable={variable} />
            )}
          {variable.validators.allowedValues !== undefined && (
            <ValueInputAllowedValues variable={variable} />
          )}
        </Table.Cell>
        <Table.Cell>{variable.units}</Table.Cell>
        <Table.Cell>
          {TooltipPopover({
            tooltipTitle: variable.name,
            description: variable.description || 'No description available.',
          })}
        </Table.Cell>
      </Table.Row>
    );
};
