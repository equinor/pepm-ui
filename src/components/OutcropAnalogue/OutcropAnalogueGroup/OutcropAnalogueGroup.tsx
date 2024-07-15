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
  AddAnalogueModelOutcropForm,
  AnalogueModelDetail,
  AnalogueModelsService,
  OutcropDto,
} from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
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
}: //   deleteOutcropRow,
{
  modelIdParent?: string;
  defaultMetadata: AnalogueModelDetail;
  outcropGroup: OutcropDto[];
  //   deleteOutcropRow: (
  //     stratigraphicGroupId: string,
  //   ) => Promise<DeletedeleteOutcropRowResponse | undefined>;
}) => {
  const [showOutcropDialog, setShowOutcropDialog] = useState<boolean>(false);
  const [outcropObject, setOutcropObject] =
    useState<OutcropType>(defaultOutcropData);

  const handleOutcropDialog = () => {
    setShowOutcropDialog(!showOutcropDialog);
    setOutcropObject(defaultOutcropData);
  };

  const postOutcropRow = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: string;
      requestBody: AddAnalogueModelOutcropForm;
    }) => {
      return AnalogueModelsService.postApiAnalogueModelsOutcrops(
        id,
        requestBody,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
    },
  });

  const handleAddOutcropAnalogue = async () => {
    const id = modelIdParent ? modelIdParent : defaultMetadata.analogueModelId;

    if (id && outcropObject.outcropId) {
      const postRequestBody: AddAnalogueModelOutcropForm = {
        outcropId: outcropObject.outcropId,
      };
      const rowUpload = await postOutcropRow.mutateAsync({
        id: id,
        requestBody: postRequestBody,
      });
      if (rowUpload.success) handleOutcropDialog();
    } else {
      console.log('Can not add');
    }
  };

  const deleteRow = async (id: string) => {
    // await deleteOutcropRow(id);
    console.log('Delete Outcrop: ', id);
  };

  return (
    <>
      <Styled.Wrapper>
        <Typography variant="h3">Outcrop Analogue</Typography>

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
                      deleteRow(row.outcropId ? row.outcropId : 'none')
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
        <div>
          <Button variant="outlined" onClick={handleOutcropDialog}>
            Add Row
          </Button>
        </div>
      </Styled.Wrapper>

      <Dialog open={showOutcropDialog}>
        <Dialog.Header>Add Outcrop Analogue</Dialog.Header>
        <Dialog.CustomContent>
          <OutcropSelect
            outcropObject={outcropObject}
            setOutcropObject={setOutcropObject}
          />
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button onClick={handleAddOutcropAnalogue}>Add</Button>
          <Button variant="outlined" onClick={handleOutcropDialog}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
