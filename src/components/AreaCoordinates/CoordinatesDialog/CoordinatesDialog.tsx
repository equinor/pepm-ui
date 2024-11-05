/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import { Button, Dialog, Snackbar } from '@equinor/eds-core-react';
import { useState } from 'react';
import { CoordinateDto } from '../../../api/generated';
import { AreaCoordinates } from '../AreaCoordinates';
import * as Styled from '../AreaCoordinates.styled';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../hooks/GlobalState';

export type AreaCoordinateType = {
  modelAreaId: string;
  coordinates: CoordinateDto[];
};

export const CoordinatesDialog = ({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: () => void;
}) => {
  const [showSaveAlert, setSaveAlert] = useState(false);
  const { analogueModel, modelAreaTypes } = usePepmContextStore();

  function clearStatus() {
    setSaveAlert(false);
  }

  const handleCloseDialog = () => {
    toggleOpen();
  };

  if (modelAreaTypes.length === 0 || analogueModel === analogueModelDefault)
    return <p>Loading.....</p>;

  return (
    <>
      <Styled.Dialog open={open}>
        <Dialog.Header>
          <Dialog.Title>
            Manage model areas for {analogueModel.name}
          </Dialog.Title>
        </Dialog.Header>
        <Styled.Content>
          <AreaCoordinates setSaveAlert={setSaveAlert}></AreaCoordinates>
        </Styled.Content>

        <Dialog.Actions>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Close
          </Button>
        </Dialog.Actions>
      </Styled.Dialog>
      <Snackbar
        open={!!showSaveAlert}
        autoHideDuration={3000}
        onClose={clearStatus}
      >
        {'Area coordinate saved'}
      </Snackbar>
    </>
  );
};
