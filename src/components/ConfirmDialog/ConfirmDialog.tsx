import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import * as Styled from './ConfirmDialog.styled';

export const ConfirmDialog = ({
  isOpen,
  message,
  danger,
  confirmAction,
  setIsOpen,
}: {
  isOpen: boolean;
  message: string;
  danger: boolean;
  confirmAction: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen}>
      <Dialog.CustomContent>
        <Typography variant="body_short">{message}</Typography>
      </Dialog.CustomContent>
      <Styled.Actions>
        <Button
          variant="outlined"
          color={danger ? 'danger' : undefined}
          onClick={() => setIsOpen(false)}
        >
          {'Cancle'}
        </Button>
        <Button color={danger ? 'danger' : undefined} onClick={confirmAction}>
          {danger ? 'Delete' : 'Ok'}
        </Button>
      </Styled.Actions>
    </Dialog>
  );
};
