/* eslint-disable max-lines-per-function */
import {
  Button,
  Dialog,
  Icon,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import {
  copy as COPY,
  delete_to_trash as DELETE,
  play as PLAY,
  save as SAVE,
} from '@equinor/eds-icons';
import { useState } from 'react';
import { ComputeJobStatus } from '../../../../api/generated';
import * as Styled from './CaseButtons.styled';

export const CaseButtons = ({
  caseType,
  saved,
  isProcessed,
  caseStatus,
  saveCase,
  runCase,
  id,
}: {
  caseType: string;
  saved: boolean;
  isProcessed?: boolean;
  caseStatus: ComputeJobStatus;
  saveCase: () => void;
  runCase?: () => void;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleConfirmSave = () => {
    saveCase();
    setIsOpen(false);
  };

  return (
    <Styled.ButtonDiv>
      <Tooltip title={'Functionality not implemented yet.'}>
        <Button
          disabled
          variant="ghost_icon"
          // eslint-disable-next-line no-console
          onClick={() => console.log('Delete')}
          aria-label="remove"
        >
          <Icon data={DELETE} size={24}></Icon>
        </Button>
      </Tooltip>
      {caseType === 'Variogram' && (
        <Button
          disabled
          variant="ghost_icon"
          aria-label="duplicate"
          // eslint-disable-next-line no-console
          onClick={() => console.log('Duplicate')}
        >
          <Icon data={COPY} size={24}></Icon>
        </Button>
      )}

      {caseType === 'Object' ? (
        <>
          {saved ? (
            <Tooltip
              title={
                !isProcessed
                  ? 'Model not finished processed.'
                  : caseStatus === 'Created' ||
                    caseStatus === 'Waiting' ||
                    caseStatus === 'Running'
                  ? 'Case are running.'
                  : ''
              }
            >
              <Button
                variant="outlined"
                onClick={saved ? runCase : saveCase}
                disabled={
                  !isProcessed ||
                  caseStatus === 'Created' ||
                  caseStatus === 'Waiting' ||
                  caseStatus === 'Running' ||
                  caseStatus === 'Succeeded'
                }
              >
                {caseStatus !== 'Succeeded' && (
                  <Icon data={PLAY} size={18}></Icon>
                )}
                {caseStatus === 'Created' ||
                caseStatus === 'Waiting' ||
                caseStatus === 'Running'
                  ? 'Running ... '
                  : caseStatus === 'Failed'
                  ? 'Run Failed. Re-run Case'
                  : caseStatus === 'Succeeded'
                  ? 'Success'
                  : 'Run'}
              </Button>
            </Tooltip>
          ) : (
            <Button variant="outlined" onClick={saved ? runCase : saveCase}>
              <Icon data={SAVE} size={18}></Icon>
              Save
            </Button>
          )}
        </>
      ) : (
        <>
          <Tooltip
            title={
              !isProcessed
                ? 'Model not finished processed.'
                : caseStatus === 'Created' ||
                  caseStatus === 'Waiting' ||
                  caseStatus === 'Running'
                ? 'Case are running.'
                : ''
            }
          >
            <Button
              variant="outlined"
              onClick={runCase}
              disabled={
                !isProcessed ||
                id.length < 3 ||
                caseStatus === 'Created' ||
                caseStatus === 'Waiting' ||
                caseStatus === 'Running' ||
                caseStatus === 'Succeeded'
              }
            >
              {caseStatus !== 'Succeeded' && (
                <Icon data={PLAY} size={18}></Icon>
              )}
              {caseStatus === 'Created' ||
              caseStatus === 'Waiting' ||
              caseStatus === 'Running'
                ? 'Running ... '
                : caseStatus === 'Failed'
                ? 'Run Failed. Re-run Case'
                : caseStatus === 'Succeeded'
                ? 'Success'
                : 'Run'}
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            onClick={id.length > 3 ? () => setIsOpen(true) : saveCase}
          >
            <Icon data={SAVE} size={18}></Icon>
            Save
          </Button>
          <Dialog open={isOpen}>
            <Dialog.Header>
              <Dialog.Title>Confirm overwrite</Dialog.Title>
            </Dialog.Header>
            <Dialog.CustomContent>
              <Typography variant="body_short">
                By pressing OK, the current case will be overwritten, deleting
                old results.
              </Typography>
            </Dialog.CustomContent>
            <Dialog.Actions>
              <Button onClick={handleConfirmSave}>OK</Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </>
      )}
    </Styled.ButtonDiv>
  );
};
