import { Button, Dialog, Typography } from '@equinor/eds-core-react';

export const ConfirmDialog = ({
  isOpen,
  message,
  confirmAction,
  setIsOpen,
}: {
  isOpen: boolean;
  message: string;
  confirmAction: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen}>
      <Dialog.Header>
        <Dialog.Title>Confirm</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Typography variant="body_short">{message}</Typography>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={confirmAction}>OK</Button>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
