import { Button, Card, Dialog, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteApiV1AnalogueModelsById } from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import * as Styled from './DeleteModel.styled';
import { useIsOwnerOrAdmin } from '../../../hooks/useIsOwnerOrAdmin';

// eslint-disable-next-line max-lines-per-function
export const DeleteModel = () => {
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [open, setOpen] = useState<boolean>(false);
  const { modelId } = useParams();
  const navigate = useNavigate();

  const deleteModel = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return deleteApiV1AnalogueModelsById({ path: { id: id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analogue-model'] });
      navigate('/');
    },
  });

  const HandleModelDelete = async () => {
    if (modelId) {
      const res = await deleteModel.mutateAsync({
        id: modelId,
      });
      return res;
    }
  };

  if (!isOwnerOrAdmin) return <></>;

  return (
    <Styled.Wrapper>
      <Card>
        <Card.Content style={{ padding: '1rem' }}>
          <Typography variant="h3" as="h2">
            Delete model
          </Typography>
          <Typography variant="body_long">
            This will delete the model along with all related cases and results.
          </Typography>
          <div>
            <Button
              variant="outlined"
              onClick={() => setOpen(!open)}
              color="danger"
            >
              Delete…
            </Button>
          </div>
        </Card.Content>
      </Card>

      <Styled.DeleteDialog open={open}>
        <Dialog.Header>Delete model</Dialog.Header>
        <Dialog.Content>
          <Typography>
            Are you sure you want to delete this model? This action cannot be
            undone.
          </Typography>
        </Dialog.Content>
        <Dialog.Actions className="actions">
          <Button
            variant="outlined"
            color="danger"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </Button>
          <Button color="danger" onClick={HandleModelDelete}>
            Delete forever
          </Button>
        </Dialog.Actions>
      </Styled.DeleteDialog>
    </Styled.Wrapper>
  );
};
