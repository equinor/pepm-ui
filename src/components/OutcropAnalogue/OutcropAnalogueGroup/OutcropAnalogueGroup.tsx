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
import {
  AddAnalogueModelOutcropForm,
  AnalogueModelDetail,
  OutcropDto,
} from '../../../api/generated';
import { useOutcropAnalouge } from '../../../hooks/useOutcropAnalogue';
import * as StyledDialog from '../../../styles/addRowDialog/AddRowDialog.styled';
import { OutcropSelect } from '../OutcropSelect/OutcropSelect';
import * as Styled from './OutcropAnalogueGroup.styled';

export interface OutcropType {
  outcropId?: string;
  name?: string;
  outcropCategory?: string;
  region?: string;
  basins?: Array<string>;
}

const defaultOutcropData: OutcropType = {
  outcropId: undefined,
  name: undefined,
  outcropCategory: undefined,
  region: undefined,
  basins: [],
};

export const OutcropAnalogueGroup = ({
  modelIdParent,
  defaultMetadata,
  outcropGroup,
}: {
  modelIdParent?: string;
  defaultMetadata: AnalogueModelDetail;
  outcropGroup: OutcropDto[];
}) => {
  const [showOutcropDialog, setShowOutcropDialog] = useState<boolean>(false);
  const [outcropObject, setOutcropObject] =
    useState<OutcropType>(defaultOutcropData);
  const useOutcrop = useOutcropAnalouge();

  const handleOutcropDialog = () => {
    setShowOutcropDialog(!showOutcropDialog);
    setOutcropObject(defaultOutcropData);
  };

  const handleAddOutcropAnalogue = async () => {
    const id = modelIdParent ? modelIdParent : defaultMetadata.analogueModelId;

    if (id && outcropObject.outcropId) {
      const postRequestBody: AddAnalogueModelOutcropForm = {
        outcropId: outcropObject.outcropId,
      };
      const rowUpload = await useOutcrop.postOutcropRow.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.success) handleOutcropDialog();
    }
  };

  const handleDeleteOutcropAnalogue = async (stratigraphicGroupId: string) => {
    const id = modelIdParent ? modelIdParent : defaultMetadata.analogueModelId;
    const res = await useOutcrop.deleteOutcropAnalogue.mutateAsync({
      id: id,
      outcropId: stratigraphicGroupId,
    });
    return res;
  };

  return (
    <Styled.Wrapper>
      <Typography variant="h4" as="h3">
        Outcrop Analogue
      </Typography>
      {outcropGroup.length > 0 && (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Analogue</Table.Cell>
              <Table.Cell>Region</Table.Cell>
              <Table.Cell>Basin</Table.Cell>
              <Table.Cell>Category</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {outcropGroup.map((row) => (
              <Table.Row key={row.outcropId}>
                <Table.Cell>
                  <Button
                    variant="ghost_icon"
                    onClick={() =>
                      handleDeleteOutcropAnalogue(
                        row.outcropId ? row.outcropId : 'none',
                      )
                    }
                  >
                    <Icon data={deleteIcon} title={'Delete strat column row'} />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Styled.StratColCell>{row.name}</Styled.StratColCell>
                </Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
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
        <Button variant="outlined" onClick={handleOutcropDialog}>
          Add outcrop analogue…
        </Button>
      </div>
      <StyledDialog.DialogWindow open={showOutcropDialog}>
        <Dialog.Header>Add Outcrop Analogue</Dialog.Header>
        <Dialog.CustomContent>
          <OutcropSelect
            outcropObject={outcropObject}
            outcropGroup={outcropGroup}
            setOutcropObject={setOutcropObject}
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
