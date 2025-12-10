/* eslint-disable camelcase */
import { Button, Dialog, Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';

const TemplateDetailsDialog = (props: {
  tooltipTitle: string;
  description: string;
  picture: string;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}) => {
  const openDialog = () => props.setIsOpen(true);
  const closeDialog = () => props.setIsOpen(false);

  const dialogActionButton = () => {
    return (
      <Button
        aria-haspopup
        aria-expanded={props.isOpen}
        variant="outlined"
        onClick={openDialog}
      >
        View template details
        <Icon data={external_link}></Icon>
      </Button>
    );
  };

  const dialogTitle = () => {
    return (
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
          Template details for {props.tooltipTitle}
        </Typography>
      </Dialog.Title>
    );
  };

  const dialog = () => {
    return (
      <Dialog
        onClose={closeDialog}
        open={props.isOpen}
        style={{ width: '100%' }}
      >
        <Dialog.Header style={{ marginBottom: '-0.9rem' }}>
          {dialogTitle()}
        </Dialog.Header>
        <Dialog.Content style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography style={{ margin: '1rem' }}>
            {props.description}
          </Typography>
          <img
            src={props.picture}
            alt="Template details"
            style={{ margin: '1rem', maxWidth: '100%' }}
          />
        </Dialog.Content>
        <Button
          variant="outlined"
          onClick={closeDialog}
          style={{ margin: '1rem', width: '60px ' }}
        >
          Close
        </Button>
      </Dialog>
    );
  };

  return (
    <div>
      {dialogActionButton()}
      {dialog()}
    </div>
  );
};

export default TemplateDetailsDialog;
