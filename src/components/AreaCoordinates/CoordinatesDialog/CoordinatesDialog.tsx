/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import { Button, Dialog, Snackbar } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoordinateDto } from '../../../api/generated';
import { useFetchModel } from '../../../hooks/useFetchModel';
import { useFetchModelAreas } from '../../../hooks/useFetchModelAreas';
import { AreaCoordinates } from '../AreaCoordinates';
import * as Styled from '../AreaCoordinates.styled';

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

  const { modelId } = useParams();

  const { data, isLoading } = useFetchModel(modelId);
  const modelAreas = useFetchModelAreas();

  // const [activeModelArea, setActiveModelArea] = useState(null);

  // const {data, isLoading} = useFetch

  function clearStatus() {
    setSaveAlert(false);
  }

  const handleCloseDialog = () => {
    toggleOpen();
  };

  if (modelAreas.isLoading || modelAreas.data === undefined || isLoading)
    return <p>Loading.....</p>;

  return (
    <>
      <Styled.Dialog open={open}>
        <Dialog.Header>
          <Dialog.Title>Manage model areas for {data?.data.name}</Dialog.Title>
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
