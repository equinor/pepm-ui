import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import { GdeSelect } from '../GdeSelect';

export const GrossDepositionEnviromentGroup = ({
  showGdeDialog,
  setShowGdeDialog,
}: {
  showGdeDialog: boolean;
  setShowGdeDialog: (arg0: boolean) => void;
}) => {
  const handleGdeDialog = () => {
    setShowGdeDialog(!showGdeDialog);
  };

  const handleAddGdeRow = () => {
    console.log('added');
  };

  return (
    <>
      <div>
        <Typography variant="h3">Gross Depositional Environment</Typography>
        <Button variant="outlined" onClick={handleGdeDialog}>
          Add Row
        </Button>
      </div>

      <Dialog open={showGdeDialog}>
        <Dialog.Header>Add stratigraphic column</Dialog.Header>
        <Dialog.CustomContent>
          <GdeSelect />
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button onClick={handleAddGdeRow}>Add</Button>
          <Button variant="outlined" onClick={handleGdeDialog}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
