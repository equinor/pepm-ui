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
  AddGeologicalGroupForm,
  AnalogueModelDetail,
  AnalogueModelsService,
  DeleteGeologicalGroupCommandResponse,
  GeologicalGroupDto,
  GeologicalStandardDto,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { GdeSelect } from '../GdeSelect/GdeSelect';
import * as Styled from './GrossDepositionEnviromentGroup.styled';

export interface GdeType {
  grossDepEnv?: GeologicalStandardDto;
  depEnv?: GeologicalStandardDto;
  subenv?: GeologicalStandardDto;
  architecturalElements?: Array<GeologicalStandardDto>;
}
const defaultGdeData: GdeType = {
  grossDepEnv: undefined,
  depEnv: undefined,
  subenv: undefined,
  architecturalElements: [],
};
export const GrossDepositionEnviromentGroup = ({
  modelIdParent,
  defaultMetadata,
  gdeGroups,
  deleteGdeRow,
}: {
  modelIdParent?: string;
  defaultMetadata: AnalogueModelDetail;
  gdeGroups: GeologicalGroupDto[];
  deleteGdeRow: (
    geologicalGroupId: string,
  ) => Promise<DeleteGeologicalGroupCommandResponse | undefined>;
}) => {
  const [showGdeDialog, setShowGdeDialog] = useState<boolean>(false);
  const [gdeObject, setGdeObject] = useState<GdeType>(defaultGdeData);
  const handleGdeDialog = () => {
    setShowGdeDialog(!showGdeDialog);
  };

  const postGdeRow = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddGeologicalGroupForm;
    }) => {
      return AnalogueModelsService.postApiAnalogueModelsGeologicalGroups(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const handleAddGde = async () => {
    const id = modelIdParent ? modelIdParent : defaultMetadata.analogueModelId;

    if (
      id &&
      gdeObject.grossDepEnv &&
      gdeObject.depEnv &&
      gdeObject.subenv &&
      gdeObject.architecturalElements
    ) {
      const architecturalElementsList: string[] = [];
      gdeObject.architecturalElements.map((x) =>
        architecturalElementsList.push(x.geologicalStandardId),
      );

      const postRequestBody: AddGeologicalGroupForm = {
        grossDepEnvId: gdeObject.grossDepEnv.geologicalStandardId,
        depEnvId: gdeObject.depEnv.geologicalStandardId,
        subEnvId: gdeObject.subenv.geologicalStandardId,
        architecturalElements:
          gdeObject.architecturalElements.length > 0
            ? architecturalElementsList
            : [],
      };
      const rowUpload = await postGdeRow.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.success) handleGdeDialog();
    }
  };

  return (
    <>
      <Styled.Wrapper>
        <Typography variant="h3">Gross Depositional Environment</Typography>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Gross Depositional Environment (GDE)</Table.Cell>
              <Table.Cell>Depositional Environment</Table.Cell>
              <Table.Cell>Subenvironment</Table.Cell>
              <Table.Cell>Architectural Element</Table.Cell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {gdeGroups.map((row) => (
              <Table.Row key={row.geologicalGroupId}>
                <Table.Cell>
                  <Button
                    variant="ghost_icon"
                    onClick={() => deleteGdeRow(row.geologicalGroupId)}
                  >
                    <Icon
                      data={deleteIcon}
                      title={'Delete gross deposition enviroment row'}
                    />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Styled.ArcElCell>
                    {row.grossDepEnv.identifier}
                  </Styled.ArcElCell>
                </Table.Cell>
                <Table.Cell>
                  <Styled.ArcElCell>{row.depEnv.identifier}</Styled.ArcElCell>
                </Table.Cell>
                <Table.Cell>
                  <Styled.ArcElCell>{row.subenv.identifier}</Styled.ArcElCell>
                </Table.Cell>
                <Table.Cell>
                  <Styled.ArcElCell>
                    {row.architecturalElements.map((a) => (
                      <p key={a.geologicalStandardId}>{a.identifier},</p>
                    ))}
                  </Styled.ArcElCell>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div>
          <Button variant="outlined" onClick={handleGdeDialog}>
            Add Row
          </Button>
        </div>
      </Styled.Wrapper>

      <StyledDialog.DialogWindow open={showGdeDialog}>
        <Dialog.Header>Add Gross Deposition Enviroment</Dialog.Header>
        <Dialog.CustomContent>
          <GdeSelect gdeObject={gdeObject} setGdeObject={setGdeObject} />
        </Dialog.CustomContent>
        <StyledDialog.Actions>
          <Button onClick={handleAddGde}>Add</Button>
          <Button variant="outlined" onClick={handleGdeDialog}>
            Close
          </Button>
        </StyledDialog.Actions>
      </StyledDialog.DialogWindow>
    </>
  );
};
