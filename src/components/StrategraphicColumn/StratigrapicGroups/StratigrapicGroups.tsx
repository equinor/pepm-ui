/* eslint-disable max-lines-per-function */
import { Button, Icon, Table, Typography } from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import {
  DeleteStratigraphicGroupCommandResponse,
  StratigraphicGroupDto,
} from '../../../api/generated';
import * as Styled from './StratigrapicGroups.styled';

export const StratigrapicGroups = ({
  stratColumnGroups,
  handleStratColDialog,
  deleteStratColRow,
}: {
  stratColumnGroups: StratigraphicGroupDto[];
  handleStratColDialog: () => void;
  deleteStratColRow: (
    stratigraphicGroupId: string,
  ) => Promise<DeleteStratigraphicGroupCommandResponse | undefined>;
}) => {
  const filterUnitLevel = (row: StratigraphicGroupDto, level: number) => {
    return row.stratUnits.filter((unit) => unit.level === level);
  };

  const deleteRow = async (id: string) => {
    await deleteStratColRow(id);
  };

  return (
    <Styled.Wrapper>
      <Typography variant="h4" as="h3">
        Stratigraphic column
      </Typography>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>Country</Table.Cell>
            <Table.Cell>Field</Table.Cell>
            <Table.Cell>Stratigraphic column</Table.Cell>
            <Table.Cell>Level 1 (group)</Table.Cell>
            <Table.Cell>Level 2 (formation)</Table.Cell>
            <Table.Cell>Level 3 (formation/subzone)</Table.Cell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {stratColumnGroups.map((row) => (
            <Table.Row key={row.stratigraphicGroupId}>
              <Table.Cell>
                <Button
                  variant="ghost_icon"
                  onClick={() => deleteRow(row.stratigraphicGroupId)}
                >
                  <Icon data={deleteIcon} title={'Delete strat column row'} />
                </Button>
              </Table.Cell>
              <Table.Cell>{row.country.identifier}</Table.Cell>
              <Table.Cell>
                <Styled.StratColCell>
                  {row.field.identifier}
                </Styled.StratColCell>
              </Table.Cell>
              <Table.Cell>
                <Styled.StratColCell>
                  {row.stratColumn.identifier}
                </Styled.StratColCell>
              </Table.Cell>
              {filterUnitLevel(row, 1).length > 0 ? (
                <Table.Cell>
                  <Styled.StratColCell>
                    {filterUnitLevel(row, 1)[0].identifier}
                  </Styled.StratColCell>
                </Table.Cell>
              ) : (
                <Table.Cell>-</Table.Cell>
              )}
              {filterUnitLevel(row, 2).length > 0 ? (
                <Table.Cell>
                  <Styled.StratColCell>
                    {filterUnitLevel(row, 2)[0].identifier}
                  </Styled.StratColCell>
                </Table.Cell>
              ) : (
                <Table.Cell>-</Table.Cell>
              )}
              {filterUnitLevel(row, 3).length > 0 ? (
                <Table.Cell>
                  <Styled.StratColCell>
                    {filterUnitLevel(row, 3)[0].identifier}
                  </Styled.StratColCell>
                </Table.Cell>
              ) : (
                <Table.Cell>-</Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div>
        <Button variant="outlined" onClick={handleStratColDialog}>
          Add stratigraphic column…
        </Button>
      </div>
    </Styled.Wrapper>
  );
};
