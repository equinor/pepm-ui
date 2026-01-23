/* eslint-disable camelcase */
import { Button, Dialog, Typography } from '@equinor/eds-core-react';

const ResetParamsDialog = (props: {
  setIsOpen: (value: boolean) => void;
  updateTemplate: () => void;
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
          Loading parameters again will replace all the current values with the
          template defaults.
        </Typography>
      </Dialog.Content>
      <div>
        <Button
          onClick={() => {
            closeDialog();
            props.updateTemplate();
          }}
          style={{ margin: '1rem' }}
        >
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
