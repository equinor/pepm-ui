/* eslint-disable max-lines-per-function */
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import {
  copy as COPY,
  delete_to_trash as DELETE,
  play as PLAY,
  save as SAVE,
} from '@equinor/eds-icons';
import { ComputeJobStatus } from '../../../../api/generated';
import * as Styled from './CaseButtons.styled';

export const CaseButtons = ({
  caseType,
  enableRun,
  isProcessed,
  caseStatus,
  saveCase,
  runCase,
}: {
  caseType: string;
  enableRun: boolean;
  isProcessed?: boolean;
  caseStatus: ComputeJobStatus;
  saveCase: () => void;
  runCase?: () => void;
}) => {
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
          variant="ghost_icon"
          aria-label="duplicate"
          // eslint-disable-next-line no-console
          onClick={() => console.log('Duplicate')}
        >
          <Icon data={COPY} size={24}></Icon>
        </Button>
      )}

      {enableRun ? (
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
            onClick={enableRun ? runCase : saveCase}
            disabled={
              !isProcessed ||
              caseStatus === 'Created' ||
              caseStatus === 'Waiting' ||
              caseStatus === 'Running' ||
              caseStatus === 'Succeeded'
            }
          >
            {caseStatus !== 'Succeeded' && <Icon data={PLAY} size={18}></Icon>}
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
        <Button variant="outlined" onClick={enableRun ? runCase : saveCase}>
          <Icon data={SAVE} size={18}></Icon>
          Save
        </Button>
      )}
    </Styled.ButtonDiv>
  );
};
