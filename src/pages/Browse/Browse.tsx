/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  Button,
  Dialog,
  Snackbar,
  Tabs,
  Typography,
} from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModelTable } from '../../features/ModelTable/ModelTable';
import { SimulationTable } from '../../features/SimulationTable/SimulationTable';
import * as Styled from './Browse.styled';
import { useIsOwnerOrAdmin } from '../../hooks/useIsOwnerOrAdmin';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../stores/GlobalStore';
import { getFetchAnaloguesExcelAxios } from '../../hooks/useFetchAnaloguesExcel';
import * as StyledDialog from '../../styles/addRowDialog/AddRowDialog.styled';

export const Browse = () => {
  const { analogueModel, setAnalogueModelDefault, exportModels } =
    usePepmContextStore();
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [uploadStatus, setUploadStatus] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    tabParam === 'simulations' ? 1 : 0,
  );

  useEffect(() => {
    if (analogueModel !== analogueModelDefault) {
      setAnalogueModelDefault();
    }
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

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSearchParams(index === 1 ? { tab: 'simulations' } : {});
  };

  return (
    <>
      <Styled.BrowseWrapper>
        <Tabs activeTab={activeTab} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab>Models</Tabs.Tab>
            <Tabs.Tab>Simulations</Tabs.Tab>
          </Tabs.List>
          {isOwnerOrAdmin && activeTab === 0 && (
            <div className="actions">
              <Button disabled={!isOwnerOrAdmin} onClick={navigateAddModel}>
                Add new model
              </Button>
              <Button onClick={() => setIsOpen(!isOpen)} download>
                {exportModels.length === 0
                  ? 'Export all to Excel...'
                  : 'Export to Excel...'}
              </Button>
              {exportModels.length === 0
                ? ''
                : exportModels.length + '   selected'}
            </div>
          )}
          <Tabs.Panels>
            <Tabs.Panel>
              <ModelTable />
            </Tabs.Panel>
            <Tabs.Panel>
              <SimulationTable />
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
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
