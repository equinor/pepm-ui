/* eslint-disable camelcase */
import { Button, Dialog, Typography } from '@equinor/eds-core-react';

const ResetParamsDialog = (props: {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}) => {
  const closeDialog = () => props.setIsOpen(false);

  return (
    <Dialog
      onClose={closeDialog}
      open={props.isOpen}
      style={{ width: '500px' }}
    >
      <Dialog.Content style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography style={{ marginBottom: '1rem', marginTop: '1rem' }}>
          There is already a model in PEPM with the exact same parameters as the
          current scenario builder.
        </Typography>
        <Typography>
          Please modify at least one parameter value to create a new model.
        </Typography>
      </Dialog.Content>
      <div>
        <Button onClick={closeDialog} style={{ margin: '1rem' }}>
          Load parameters
        </Button>
        <Button variant="outlined" onClick={closeDialog}>
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};

export default ResetParamsDialog;
