/* eslint-disable max-lines-per-function */
import { Button, Dialog, Icon, Table } from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import { useState } from 'react';
import {
  AddGeologicalGroupForm,
  GeologicalStandardDto,
} from '../../../api/generated';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { GdeSelect } from '../GdeSelect/GdeSelect';
import * as Styled from './GrossDepositionEnviromentGroup.styled';
import { validateInput } from './GDE.hooks';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../stores/GlobalStore';
import { useGdeAnalogue } from '../../../hooks/useGdeAnalogue';

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
export const GrossDepositionEnviromentGroup = () => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const { analogueModel, addAnalogueModelGde, deleteAnalogueModelGde } =
    usePepmContextStore();
  const [showGdeDialog, setShowGdeDialog] = useState<boolean>(false);
  const [gdeObject, setGdeObject] = useState<GdeType>(defaultGdeData);
  const [errors, setErrors] = useState<GDEErrorType>({});

  const useGde = useGdeAnalogue();

  const handleGdeDialog = () => {
    setShowGdeDialog(!showGdeDialog);
  };

  const handleGdeDelete = async (id: string) => {
    const res = await useGde.deleteGde.mutateAsync({
      analogueModelId: analogueModel.analogueModelId,
      geologicalGroupId: id,
    });
    if (res?.data?.success) deleteAnalogueModelGde(id);
  };

  const handleAddGde = async () => {
    const id = analogueModel.analogueModelId;
    const err = await validateInput(gdeObject);
    setErrors(err);

    if (id && gdeObject.grossDepEnv && gdeObject.depEnv && gdeObject.subenv) {
      const postRequestBody: AddGeologicalGroupForm = {
        grossDepEnvId: gdeObject.grossDepEnv.geologicalStandardId,
        depEnvId: gdeObject.depEnv.geologicalStandardId,
        subEnvId: gdeObject.subenv.geologicalStandardId,
      };
      const rowUpload = await useGde.postGde.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.data?.success) {
        addAnalogueModelGde(rowUpload.data.data);
        setGdeObject(defaultGdeData);
        handleGdeDialog();
      }
    }
  };

  return (
    <>
      <Styled.Wrapper>
        {analogueModel.geologicalGroups.length > 0 && (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell>GDE</Table.Cell>
                <Table.Cell>Depositional environment</Table.Cell>
                <Table.Cell>Subenvironment</Table.Cell>
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
