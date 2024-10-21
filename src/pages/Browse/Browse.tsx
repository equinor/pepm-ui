/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Snackbar, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelTable } from '../../features/ModelTable/ModelTable';
import * as Styled from './Browse.styled';
import { isOwnerOrAdmin } from '../../utils/IsOwnerOrAdmin';

export const Browse = () => {
  const [uploadStatus, setUploadStatus] = useState<string>();

  function clearStatus() {
    setUploadStatus(undefined);
  }

  const navigate = useNavigate();

  function navigateAddModel() {
    navigate('/add-model');
  }

  function disableButton() {
    return isOwnerOrAdmin();
  }

  return (
    <>
      <Styled.BrowseWrapper>
        <Typography variant="h1">Browse all models</Typography>
        {disableButton() ? (
          <div className="btn-div">
            <Button disabled={!disableButton()} onClick={navigateAddModel}>
              Add new model
            </Button>
          </div>
        ) : (
          <></>
        )}
        <ModelTable />
      </Styled.BrowseWrapper>
      <Snackbar
        open={!!uploadStatus}
        autoHideDuration={15000}
        onClose={clearStatus}
      >
        {uploadStatus}
      </Snackbar>
    </>
  );
};
