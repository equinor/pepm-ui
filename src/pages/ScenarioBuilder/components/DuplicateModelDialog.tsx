/* eslint-disable camelcase */
import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router-dom';

const DuplicateModelDialog = (props: {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  duplicateId?: string;
}) => {
  const navigate = useNavigate();
  const closeDialog = () => props.setIsOpen(false);

  const openDuplicateModel = () => {
    if (props.duplicateId) {
      navigate(`/model/${props.duplicateId}/details`);
    }
    closeDialog();
  };

  return (
    <Dialog
      onClose={closeDialog}
      open={props.isOpen}
      style={{ width: '500px' }}
    >
      <Dialog.Header style={{ marginBottom: '-0.9rem' }}>
        <Dialog.Title
          style={{
            display: 'flex',
            flexGrow: '1',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '0.5rem',
          }}
        >
          <Typography variant="h6" as="h5">
            Duplicate model detected
          </Typography>
        </Dialog.Title>
      </Dialog.Header>
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
        <Button
          variant="outlined"
          onClick={openDuplicateModel}
          disabled={!props.duplicateId}
          style={{ marginLeft: '1rem', marginBottom: '1rem' }}
        >
          Open duplicate model
        </Button>
        <Button variant="ghost" onClick={closeDialog}>
          Back to parameters
        </Button>
      </div>
    </Dialog>
  );
};

export default DuplicateModelDialog;
