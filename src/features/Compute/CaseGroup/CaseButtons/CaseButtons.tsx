/* eslint-disable max-lines-per-function */
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import {
  copy as COPY,
  delete_to_trash as DELETE,
  play as PLAY,
  save as SAVE,
} from '@equinor/eds-icons';
import { useState } from 'react';
import {
  ComputeJobStatus,
  ListComputeCasesByAnalogueModelIdQueryResponse,
} from '../../../../api/generated';
import { ConfirmDialog } from '../../../../components/ConfirmDialog/ConfirmDialog';
import * as Styled from './CaseButtons.styled';

export const CaseButtons = ({
  id,
  caseType,
  saved,
  isProcessed,
  caseStatus,
  hasUnsavedCase,
  saveCase,
  runCase,
  deleteCase,
  setAlertMessage,
  duplicateCase,
}: {
  id: string;
  caseType: string;
  saved: boolean;
  isProcessed?: boolean;
  caseStatus: ComputeJobStatus;
  hasUnsavedCase: boolean;
  runCase?: () => void;
  saveCase: () => void;
  deleteCase: (
    computeCaseId: string,
  ) => Promise<ListComputeCasesByAnalogueModelIdQueryResponse | undefined>;
  setAlertMessage: (message: string) => void;
  duplicateCase: () => void;
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [saveConfirm, setSaveConfirm] = useState(false);

  const handleConfirmSave = () => {
    saveCase();
    setSaveConfirm(false);
  };

  const handleConfirmDelete = async () => {
    const res = await deleteCase(id);
    if (res?.success) {
      setAlertMessage('Case deleted');
    }
    setDeleteConfirm(false);
  };

  return (
    <Styled.ButtonDiv>
      {id.length < 3 ? (
        <Tooltip title={'Can not delete unsaved case.'}>
          <Button disabled variant="ghost_icon" aria-label="remove">
            <Icon data={DELETE} size={24}></Icon>
          </Button>
        </Tooltip>
      ) : (
        <Button
          variant="ghost_icon"
          onClick={() => setDeleteConfirm(true)}
          aria-label="remove"
        >
          <Icon data={DELETE} size={24}></Icon>
        </Button>
      )}

      {caseType === 'Variogram' && (
        <>
          {id.length < 3 ? (
            <Tooltip title={'Can not duplicate unsaved case.'}>
              <Button disabled variant="ghost_icon" aria-label="duplicate">
                <Icon data={COPY} size={24}></Icon>
              </Button>
            </Tooltip>
          ) : (
            <>
              {hasUnsavedCase ? (
                <Tooltip
                  title={'Only one unsaved case per method at the time.'}
                >
                  <Button disabled variant="ghost_icon" aria-label="duplicate">
                    <Icon data={COPY} size={24}></Icon>
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  disabled={hasUnsavedCase}
                  variant="ghost_icon"
                  aria-label="duplicate"
                  onClick={() => duplicateCase()}
                >
                  <Icon data={COPY} size={24}></Icon>
                </Button>
              )}
            </>
          )}
        </>
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
                  ? 'Case is running.'
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
            onClick={id.length > 3 ? () => setSaveConfirm(true) : saveCase}
          >
            <Icon data={SAVE} size={18}></Icon>
            Save
          </Button>
        </>
      )}
      {deleteConfirm && (
        <ConfirmDialog
          isOpen={deleteConfirm}
          message="By pressing OK, the case and belonging results will be deleted."
          confirmAction={handleConfirmDelete}
          setIsOpen={setDeleteConfirm}
        ></ConfirmDialog>
      )}
      {saveConfirm && (
        <ConfirmDialog
          isOpen={saveConfirm}
          message="By pressing OK, the current case will be overwritten, deleting old
      results."
          confirmAction={handleConfirmSave}
          setIsOpen={setSaveConfirm}
        ></ConfirmDialog>
      )}
    </Styled.ButtonDiv>
  );
};
