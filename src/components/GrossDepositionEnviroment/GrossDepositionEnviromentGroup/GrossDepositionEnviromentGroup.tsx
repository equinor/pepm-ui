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
  AnalogueModelsService,
  DeleteGeologicalGroupCommandResponse,
  GeologicalStandardDto,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { GdeSelect } from '../GdeSelect/GdeSelect';
import * as Styled from './GrossDepositionEnviromentGroup.styled';

import { validateInput } from './GDE.hooks';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../stores/GlobalStore';

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

export type GDEErrorType = {
  GDE?: string;
  DEnv?: string;
  subEnv?: string;
  AEl?: string;
};
export const GrossDepositionEnviromentGroup = ({
  modelIdParent,
  deleteGdeRow,
}: {
  modelIdParent?: string;
  deleteGdeRow: (
    geologicalGroupId: string,
  ) => Promise<DeleteGeologicalGroupCommandResponse | undefined>;
}) => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const { analogueModel, addAnalogueModelGde, deleteAnalogueModelGde } =
    usePepmContextStore();
  const [showGdeDialog, setShowGdeDialog] = useState<boolean>(false);
  const [gdeObject, setGdeObject] = useState<GdeType>(defaultGdeData);
  const [errors, setErrors] = useState<GDEErrorType>({});

  const handleGdeDialog = () => {
    setShowGdeDialog(!showGdeDialog);
  };

  const handleGdeDelete = async (id: string) => {
    const res = await deleteGdeRow(id);
    if (res?.success) deleteAnalogueModelGde(id);
  };

  const postGdeRow = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddGeologicalGroupForm;
    }) => {
      return AnalogueModelsService.postApiV1AnalogueModelsGeologicalGroups(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const handleAddGde = async () => {
    const id = modelIdParent ? modelIdParent : analogueModel.analogueModelId;
    const err = await validateInput(gdeObject);
    setErrors(err);

    if (
      id &&
      gdeObject.grossDepEnv &&
      gdeObject.depEnv &&
      gdeObject.subenv &&
      gdeObject.architecturalElements &&
      gdeObject.architecturalElements.length > 0
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
      if (rowUpload.success) {
        addAnalogueModelGde(rowUpload.data);
        setGdeObject(defaultGdeData);
        handleGdeDialog();
      }
    }
  };

  return (
    <>
      <Styled.Wrapper>
        <Typography variant="h4" as="h3">
          Gross Depositional Environment (GDE)
        </Typography>
        {analogueModel.geologicalGroups.length > 0 && (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>GDE</Table.Cell>
                <Table.Cell>Depositional environment</Table.Cell>
                <Table.Cell>Subenvironment</Table.Cell>
                <Table.Cell>Architectural element</Table.Cell>
              </Table.Row>
            </Table.Head>

            <Table.Body>
              {analogueModel.geologicalGroups.map((row) => (
                <Table.Row key={row.geologicalGroupId}>
                  <Table.Cell>
                    {isOwnerOrAdmin && (
                      <Button
                        variant="ghost_icon"
                        onClick={() => handleGdeDelete(row.geologicalGroupId)}
                      >
                        <Icon
                          data={deleteIcon}
                          title={'Delete gross deposition enviroment row'}
                        />
                      </Button>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {row.grossDepEnv.equinorCode +
                      ' ' +
                      row.grossDepEnv.identifier}
                  </Table.Cell>
                  <Table.Cell>
                    {row.grossDepEnv.equinorCode + ' ' + row.depEnv.identifier}
                  </Table.Cell>
                  <Table.Cell>
                    {row.grossDepEnv.equinorCode + ' ' + row.subenv.identifier}
                  </Table.Cell>
                  <Table.Cell>
                    {row.architecturalElements.length > 0 && (
                      <ul>
                        {row.architecturalElements.map((a) => (
                          <li key={a.geologicalStandardId}>
                            {a.equinorCode + ' ' + a.identifier}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        <div>
          {isOwnerOrAdmin && (
            <Button variant="outlined" onClick={handleGdeDialog}>
              Add GDE…
            </Button>
          )}
        </div>
      </Styled.Wrapper>

      <StyledDialog.DialogWindow open={showGdeDialog}>
        <Dialog.Header>Add Gross Deposition Enviroment</Dialog.Header>
        <Dialog.CustomContent>
          <GdeSelect
            gdeObject={gdeObject}
            setGdeObject={setGdeObject}
            error={errors}
            setErrors={setErrors}
          />
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
