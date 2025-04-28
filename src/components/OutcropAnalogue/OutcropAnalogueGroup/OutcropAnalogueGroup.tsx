/* eslint-disable max-lines-per-function */
import {
  Button,
  Dialog,
  Icon,
  Table,
  Typography,
} from '@equinor/eds-core-react';
import { delete_to_trash as deleteIcon } from '@equinor/eds-icons';
import { useState } from 'react';
import { AddAnalogueModelOutcropForm, RegionDto } from '../../../api/generated';
import { useOutcropAnalouge } from '../../../hooks/useOutcropAnalogue';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { OutcropSelect } from '../OutcropSelect/OutcropSelect';
import * as Styled from './OutcropAnalogueGroup.styled';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../stores/GlobalStore';

export interface OutcropType {
  outcropId?: string;
  name?: string;
  outcropCategory?: string;
  region?: RegionDto;
  basins?: Array<string>;
}

const defaultOutcropData: OutcropType = {
  outcropId: undefined,
  name: undefined,
  outcropCategory: undefined,
  region: undefined,
  basins: [],
};

export type OutcropErrorType = {
  Analogue?: string;
};

export const OutcropAnalogueGroup = () => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const { analogueModel, addAnalogueModelOutcrop, deleteAnalogueModelOutcrop } =
    usePepmContextStore();
  const [showOutcropDialog, setShowOutcropDialog] = useState<boolean>(false);
  const [errors, setErrors] = useState<OutcropErrorType>({});
  const [outcropObject, setOutcropObject] =
    useState<OutcropType>(defaultOutcropData);

  const useOutcrop = useOutcropAnalouge();

  const handleOutcropDialog = () => {
    setShowOutcropDialog(!showOutcropDialog);
    setOutcropObject(defaultOutcropData);
  };

  const validateInput = async (outcropObject: OutcropType) => {
    const errorObject: OutcropErrorType = {};

    if (outcropObject.outcropId === undefined) {
      errorObject.Analogue = 'Value missing';
    }

    return errorObject;
  };

  const handleAddOutcropAnalogue = async () => {
    const id = analogueModel.analogueModelId;
    const err = await validateInput(outcropObject);
    setErrors(err);

    if (id && outcropObject.outcropId) {
      const postRequestBody: AddAnalogueModelOutcropForm = {
        outcropId: outcropObject.outcropId,
      };
      const rowUpload = await useOutcrop.postOutcropRow.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.data?.success) {
        handleOutcropDialog();
        addAnalogueModelOutcrop(rowUpload.data.data);
      }
    }
  };

  const handleDeleteOutcropAnalogue = async (outcropId: string) => {
    const id = analogueModel.analogueModelId;
    const res = await useOutcrop.deleteOutcropAnalogue.mutateAsync({
      id: id,
      outcropId: outcropId,
    });
    if (res.data?.success) deleteAnalogueModelOutcrop(outcropId);
    return res;
  };

  return (
    <Styled.Wrapper>
      <Typography variant="h4" as="h3">
        Outcrop Analogue
      </Typography>
      {analogueModel.outcrops.length > 0 && (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Analogue</Table.Cell>
              <Table.Cell>Country</Table.Cell>
              <Table.Cell>Location</Table.Cell>
              <Table.Cell>Region</Table.Cell>
              <Table.Cell>Basin</Table.Cell>
              <Table.Cell>Category</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {analogueModel.outcrops.map((row) => (
              <Table.Row key={row.outcropId}>
                <Table.Cell>
                  {isOwnerOrAdmin && (
                    <Button
                      variant="ghost_icon"
                      onClick={() =>
                        handleDeleteOutcropAnalogue(
                          row.outcropId ? row.outcropId : 'none',
                        )
                      }
                    >
                      <Icon
                        data={deleteIcon}
                        title={'Delete strat column row'}
                      />
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Styled.StratColCell>{row.name}</Styled.StratColCell>
                </Table.Cell>
                {row.region?.locations &&
                row.region?.locations?.length !== 0 ? (
                  <>
                    <Table.Cell>{row.region.locations[0].country}</Table.Cell>
                    <Table.Cell>
                      {row.region.locations[0].locationName}
                    </Table.Cell>
                  </>
                ) : (
                  <>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </>
                )}
                <Table.Cell>{row.region?.name}</Table.Cell>
                <Table.Cell>
                  <Styled.StratColCell>
                    {row.basins?.map((item) => item)}
                  </Styled.StratColCell>
                </Table.Cell>
                <Table.Cell>
                  <Styled.StratColCell>
                    {row.outcropCategory}
                  </Styled.StratColCell>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <div>
        {isOwnerOrAdmin && (
          <Button variant="outlined" onClick={handleOutcropDialog}>
            Add outcrop analogue…
          </Button>
        )}
      </div>
      <StyledDialog.DialogWindow open={showOutcropDialog}>
        <Dialog.Header>Add Outcrop Analogue</Dialog.Header>
        <Dialog.CustomContent>
          <OutcropSelect
            outcropObject={outcropObject}
            setOutcropObject={setOutcropObject}
            error={errors}
          />
        </Dialog.CustomContent>
        <StyledDialog.Actions>
          <Button onClick={handleAddOutcropAnalogue}>Add</Button>
          <Button variant="outlined" onClick={handleOutcropDialog}>
            Close
          </Button>
        </StyledDialog.Actions>
      </StyledDialog.DialogWindow>
    </Styled.Wrapper>
  );
};
