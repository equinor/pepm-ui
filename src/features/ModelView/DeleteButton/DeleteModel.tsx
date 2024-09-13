import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnalogueModelsService } from '../../../api/generated';
import { queryClient } from '../../../auth/queryClient';
import * as Styled from './DeleteModel.styled';

export const DeleteModel = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { modelId } = useParams();
  const navigate = useNavigate();

  const deleteModel = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return AnalogueModelsService.deleteApiAnalogueModels(id);
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

  return (
    <Styled.Wrapper>
      <Typography variant="h3">Delete model</Typography>
      <Typography variant="body_long">
        This will delete the model along with all related cases and results.
      </Typography>
      <Button onClick={() => setOpen(!open)} color="danger">
        Delete
      </Button>

      <Dialog open={open}>
        <Dialog.Header>DELETE</Dialog.Header>
        <Dialog.Content>
          <Typography>Are you sure you want to delete the model?</Typography>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="outlined" onClick={() => setOpen(!open)}>
            Cancel
          </Button>
          <Button color="danger" onClick={HandleModelDelete}>
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Styled.Wrapper>
  );
};
