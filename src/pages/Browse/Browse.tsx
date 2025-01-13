/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Button, Dialog, Snackbar, Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelTable } from '../../features/ModelTable/ModelTable';
import * as Styled from './Browse.styled';
import { useIsOwnerOrAdmin } from '../../hooks/useIsOwnerOrAdmin';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../hooks/GlobalState';
import { getFetchAnaloguesExcelAxios } from '../../hooks/useFetchAnaloguesExcel';
import * as StyledDialog from '../../styles/addRowDialog/AddRowDialog.styled';

export const Browse = () => {
  const { analogueModel, setAnalogueModelDefault, exportModels } =
    usePepmContextStore();
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [uploadStatus, setUploadStatus] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (analogueModel !== analogueModelDefault) setAnalogueModelDefault();
  }, [analogueModel, setAnalogueModelDefault]);

  function clearStatus() {
    setUploadStatus(undefined);
  }

  const navigate = useNavigate();

  function navigateAddModel() {
    navigate('/add-model');
  }

  const handleOpen = () => {
    getFetchAnaloguesExcelAxios(exportModels);
    setIsOpen(false);
  };

  return (
    <>
      <Styled.BrowseWrapper>
        <Typography variant="h3" as="h1">
          Browse all models
        </Typography>
        {isOwnerOrAdmin ? (
          <div className="actions">
            <Button disabled={!isOwnerOrAdmin} onClick={navigateAddModel}>
              Add new model
            </Button>
            <Button onClick={() => setIsOpen(!isOpen)} download>
              {exportModels.length === 0
                ? 'Export all to Excel...'
                : 'Export to Excel...'}
            </Button>
            {exportModels.length === 0 ? 'All ' : exportModels.length + ' '}
            selected
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
      {isOpen && (
        <StyledDialog.DialogWindow open={isOpen}>
          <Dialog.Content>
            <Typography variant="body_short">
              Note that all case results is part of the downloaded file,
              including unpublished results. Be sure to filter your Excel file
              if you only want to work with published results.
            </Typography>
          </Dialog.Content>
          <StyledDialog.Actions>
            <Button onClick={handleOpen}>Download XSLX</Button>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </StyledDialog.Actions>
        </StyledDialog.DialogWindow>
      )}
    </>
  );
};
