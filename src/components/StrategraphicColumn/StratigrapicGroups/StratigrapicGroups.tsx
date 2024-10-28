/* eslint-disable max-lines-per-function */
import {
  Button,
  Dialog,
  Icon,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  AddStatigraphicGroupForm,
  AnalogueModelDetail,
  AnalogueModelsService,
  CountryDto,
  DeleteStratigraphicGroupCommandResponse,
  FieldDto,
  StratColumnDto,
  StratUnitDto,
  // eslint-disable-next-line sort-imports
  StratigraphicGroupDto,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { StratigraphicColumnSelect } from '../StratigraphicColumnSelect/StratigraphicColumnSelect';
import { validateInput } from './StratigrapicGroups.hooks';
import * as Styled from './StratigrapicGroups.styled';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';

export interface StratColumnType {
  country?: CountryDto;
  field?: FieldDto;
  stratColumn?: StratColumnDto;
  level1?: StratUnitDto;
  level2?: StratUnitDto;
  level3?: StratUnitDto;
}
export const defaultStratColumnData: StratColumnType = {
  country: undefined,
  field: undefined,
  stratColumn: undefined,
  level1: undefined,
  level2: undefined,
  level3: undefined,
};

export type StratColumnErrorType = {
  country?: string;
  field?: string;
  stratColumn?: string;
  level1?: string;
  level2?: string;
  level3?: string;
};

export const StratigrapicGroups = ({
  modelIdParent,
  defaultMetadata,
  stratColumnGroups,
  deleteStratColRow,
}: {
  modelIdParent?: string;
  defaultMetadata: AnalogueModelDetail;
  stratColumnGroups: StratigraphicGroupDto[];
  deleteStratColRow: (
    stratigraphicGroupId: string,
  ) => Promise<DeleteStratigraphicGroupCommandResponse | undefined>;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [stratColumnObject, setStratColumnObject] = useState<StratColumnType>(
    defaultStratColumnData,
  );
  const [showStratColDialog, setShowStratColDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<StratColumnErrorType>({});

  const filterUnitLevel = (row: StratigraphicGroupDto, level: number) => {
    return row.stratUnits.filter((unit) => unit.level === level);
  };

  const deleteRow = async (id: string) => {
    await deleteStratColRow(id);
  };

  const postSmdaMetadataRow = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddStatigraphicGroupForm;
    }) => {
      return AnalogueModelsService.postApiAnalogueModelsStratigraphicGroups(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const handleAddStratCol = async () => {
    const id = modelIdParent ? modelIdParent : defaultMetadata.analogueModelId;
    const err = await validateInput(stratColumnObject);
    setErrors(err);
    if (
      id &&
      stratColumnObject.country &&
      stratColumnObject.field &&
      stratColumnObject.stratColumn &&
      stratColumnObject.level1 &&
      stratColumnObject.level2
    ) {
      const stratUnitList: string[] = [];
      if (stratColumnObject.level1 !== undefined)
        stratUnitList.push(stratColumnObject.level1.stratUnitId);
      if (
        stratColumnObject.level1 !== undefined &&
        stratColumnObject.level2 !== undefined
      )
        stratUnitList.push(stratColumnObject.level2.stratUnitId);
      if (
        stratColumnObject.level1 !== undefined &&
        stratColumnObject.level2 !== undefined &&
        stratColumnObject.level3 !== undefined
      )
        stratUnitList.push(stratColumnObject.level3.stratUnitId);

      const postRequestBody: AddStatigraphicGroupForm = {
        countryId: stratColumnObject.country.countryId,
        fieldId: stratColumnObject.field.fieldId,
        stratigraphicColumnId: stratColumnObject.stratColumn.stratColumnId,
        stratigraphicUnitIds: stratUnitList.length > 0 ? stratUnitList : [],
      };

      const rowUpload = await postSmdaMetadataRow.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.success) handleStratColDialog();
    }
  };

  const handleStratColDialog = () => {
    setShowStratColDialog(!showStratColDialog);
    setStratColumnObject(defaultStratColumnData);
  };

  return (
    <Styled.Wrapper>
      <Typography variant="h4" as="h3">
        Stratigraphic column
      </Typography>

      {stratColumnGroups.length > 0 && (
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
                  {isOwnerOrAdmin && (
                    <Button
                      variant="ghost_icon"
                      onClick={() => deleteRow(row.stratigraphicGroupId)}
                    >
                      <Icon
                        data={deleteIcon}
                        title={'Delete strat column row'}
                      />
                    </Button>
                  )}
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
      )}

      <div>
        {isOwnerOrAdmin && (
          <Button variant="outlined" onClick={handleStratColDialog}>
            Add stratigraphic column…
          </Button>
        )}
      </div>
      <StyledDialog.DialogWindow open={showStratColDialog}>
        <Dialog.Header>Add stratigraphic column</Dialog.Header>
        <Dialog.CustomContent>
          <StratigraphicColumnSelect
            stratColumnObject={stratColumnObject}
            setStratColumnObject={setStratColumnObject}
            error={errors}
            setErrors={setErrors}
          />
        </Dialog.CustomContent>
        <StyledDialog.Actions>
          <Button onClick={handleAddStratCol}>Add</Button>
          <Button variant="outlined" onClick={handleStratColDialog}>
            Close
          </Button>
        </StyledDialog.Actions>
      </StyledDialog.DialogWindow>
    </Styled.Wrapper>
  );
};
