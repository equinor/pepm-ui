import { Button, Table, Typography } from '@equinor/eds-core-react';
import { StratigraphicGroupDto } from '../../api/generated';
import * as Styled from './StratigrapicGroups.styled';

export const StratigrapicGroups = ({
  stratColumnGroups,
  handleStratColDialog,
}: {
  stratColumnGroups: StratigraphicGroupDto[];
  handleStratColDialog: () => void;
}) => {
  const filterUnitLevel = (row: StratigraphicGroupDto, level: number) => {
    return row.stratUnits.filter((unit) => unit.level === level);
  };

  return (
    <Styled.Wrapper>
      <Typography variant="h3">Stratigraphic column</Typography>

      <Table>
        <Table.Head>
          <Table.Cell>Country</Table.Cell>
          <Table.Cell>Field</Table.Cell>
          <Table.Cell>Stratigraphic column</Table.Cell>
          <Table.Cell>Level 1 (group)</Table.Cell>
          <Table.Cell>Level 2 (formation)</Table.Cell>
          <Table.Cell>Level 3 (formation/subzone)</Table.Cell>
        </Table.Head>

        <Table.Body>
          {stratColumnGroups.map((row) => (
            <Table.Row key={row.stratigraphicGroupId}>
              <Table.Cell>{row.country.identifier}</Table.Cell>
              <Table.Cell>{row.field.identifier}</Table.Cell>
              <Table.Cell>{row.stratColumn.identifier}</Table.Cell>
              {filterUnitLevel(row, 1).length > 0 ? (
                <Table.Cell>{filterUnitLevel(row, 1)[0].identifier}</Table.Cell>
              ) : (
                <Table.Cell>---</Table.Cell>
              )}
              {filterUnitLevel(row, 2).length > 0 ? (
                <Table.Cell>{filterUnitLevel(row, 2)[0].identifier}</Table.Cell>
              ) : (
                <Table.Cell>---</Table.Cell>
              )}
              {filterUnitLevel(row, 3).length > 0 ? (
                <Table.Cell>{filterUnitLevel(row, 3)[0].identifier}</Table.Cell>
              ) : (
                <Table.Cell>---</Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        <Button variant="outlined" onClick={handleStratColDialog}>
          Add Row
        </Button>
      </div>
    </Styled.Wrapper>
  );
};
