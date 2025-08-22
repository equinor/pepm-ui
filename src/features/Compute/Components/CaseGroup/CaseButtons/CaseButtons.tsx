/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import {
  copy as COPY,
  delete_to_trash as DELETE,
  file_description as FILEDESC,
  play as PLAY,
  save as SAVE,
} from '@equinor/eds-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComputeJobStatus,
  ListComputeCasesByAnalogueModelIdQueryResponse,
} from '../../../../../api/generated';
import { ConfirmDialog } from '../../../../../components/ConfirmDialog/ConfirmDialog';
import * as Styled from './CaseButtons.styled';
import { useIsOwnerOrAdmin } from '../../../../../hooks/useIsOwnerOrAdmin';
import { usePepmContextStore } from '../../../../../stores/GlobalStore';
import { LogSideSheet } from '../../LogSideSheet/LogSideSheet';

export const CaseButtons = ({
  id,
  caseType,
  saved,
  caseStatus,
  hasUnsavedCase,
  logFileExists,
  saveCase,
  runCase,
  deleteCase,
  setAlertMessage,
  duplicateCase,
}: {
  id: string;
  caseType: string;
  saved: boolean;
  caseStatus: ComputeJobStatus;
  hasUnsavedCase: boolean;
  logFileExists: boolean;
  runCase?: () => void;
  saveCase: () => void;
  deleteCase: (
    computeCaseId: string,
  ) => Promise<ListComputeCasesByAnalogueModelIdQueryResponse | undefined>;
  setAlertMessage: (message: string) => void;
  duplicateCase: () => void;
}) => {
  const { analogueModel } = usePepmContextStore();
  const isOwnerOrAdmin = useIsOwnerOrAdmin();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
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

  const deleteTooltip = () => {
    if (!isOwnerOrAdmin)
      return 'Can not delete because you are not owner or admin.';
    return 'Can not delete unsaved case.';
  };

  const duplicateTooltip = () => {
    if (!isOwnerOrAdmin)
      return 'Can not duplicate because you are not owner or admin.';
  };

  return (
    <Styled.ButtonDiv>
      {!isOwnerOrAdmin ? (
        <Tooltip title={deleteTooltip()}>
          <Button disabled variant="ghost_icon" aria-label="remove">
            <Icon data={DELETE} size={24}></Icon>
          </Button>
        </Tooltip>
      ) : (
        <Button
          variant="ghost_icon"
          onClick={() =>
            id.length < 3 ? handleConfirmDelete() : setDeleteConfirm(true)
          }
          aria-label="remove"
        >
          <Icon data={DELETE} size={24}></Icon>
        </Button>
      )}

      {caseType === 'Variogram' && (
        <>
          {id.length < 3 || !isOwnerOrAdmin ? (
            <Tooltip title={duplicateTooltip()}>
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
          {caseStatus === 'Succeeded' ? (
            <Styled.Button
              variant="outlined"
              onClick={() => {
                navigate('../results/object');
              }}
            >
              View Results{' '}
            </Styled.Button>
          ) : saved ? (
            <Tooltip
              title={
                !analogueModel.isProcessed
                  ? 'Model not finished processed.'
                  : caseStatus === 'Created' ||
                    caseStatus === 'Waiting' ||
                    caseStatus === 'Running'
                  ? 'Case is running.'
                  : caseStatus === 'Failed'
                  ? 'The area selected for the script does not include architectural element that was provided when computing a case.'
                  : ''
              }
            >
              <Button
                color={
                  caseStatus === 'Created' ||
                  caseStatus === 'Failed' ||
                  caseStatus === 'Waiting' ||
                  caseStatus === 'Running'
                    ? 'danger'
                    : undefined
                }
                variant="outlined"
                onClick={saved ? runCase : saveCase}
                disabled={
                  !analogueModel.isProcessed ||
                  caseStatus === 'Created' ||
                  !isOwnerOrAdmin
                }
              >
                <Icon data={PLAY} size={18}></Icon>
                {caseStatus === 'Created' ||
                caseStatus === 'Waiting' ||
                caseStatus === 'Running'
                  ? 'Cancel'
                  : caseStatus === 'Failed'
                  ? 'Re-run'
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
              !analogueModel.isProcessed
                ? 'Model not finished processed.'
                : caseStatus === 'Created' ||
                  caseStatus === 'Waiting' ||
                  caseStatus === 'Running'
                ? 'Case are running.'
                : caseStatus === 'Failed'
                ? 'The area selected for the script does not include architectural element that was provided when computing a case.'
                : ''
            }
          >
            {caseStatus === 'Succeeded' ? (
              <Styled.Button
                variant="outlined"
                onClick={() => {
                  navigate('../results/variogram');
                }}
              >
                View Results{' '}
              </Styled.Button>
            ) : (
              <Styled.Button
                color={
                  caseStatus === 'Created' ||
                  caseStatus === 'Failed' ||
                  caseStatus === 'Waiting' ||
                  caseStatus === 'Running'
                    ? 'danger'
                    : undefined
                }
                variant="outlined"
                onClick={runCase}
                disabled={
                  !analogueModel.isProcessed ||
                  id.length < 3 ||
                  caseStatus === 'Created' ||
                  !isOwnerOrAdmin
                }
              >
                <Icon data={PLAY} size={18}></Icon>
                {caseStatus === 'Created' ||
                caseStatus === 'Waiting' ||
                caseStatus === 'Running'
                  ? 'Cancel'
                  : caseStatus === 'Failed'
                  ? 'Re-run'
                  : 'Run'}
              </Styled.Button>
            )}
          </Tooltip>
          {(caseStatus === 'Succeeded' || caseStatus === 'Failed') && (
            <Tooltip
              title={
                logFileExists === false
                  ? 'Log file does not exist. Rerun the case to see the log file'
                  : undefined
              }
            >
              <Styled.Button
                variant="outlined"
                onClick={() => setToggle(!toggle)}
                disabled={!logFileExists}
              >
                <Icon data={FILEDESC} size={18}></Icon>
                Log
              </Styled.Button>
            </Tooltip>
          )}
          <Button
            disabled={
              !isOwnerOrAdmin ||
              caseStatus === 'Created' ||
              caseStatus === 'Waiting' ||
              caseStatus === 'Running'
            }
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
          danger={true}
          confirmAction={handleConfirmDelete}
          setIsOpen={setDeleteConfirm}
        ></ConfirmDialog>
      )}
      {saveConfirm && (
        <ConfirmDialog
          isOpen={saveConfirm}
          message="By pressing OK, the current case will be overwritten, deleting old
      results."
          danger={false}
          confirmAction={handleConfirmSave}
          setIsOpen={setSaveConfirm}
        ></ConfirmDialog>
      )}
      {logFileExists && (
        <LogSideSheet
          toggle={toggle}
          setToggle={setToggle}
          computeCaseId={id}
        ></LogSideSheet>
      )}
    </Styled.ButtonDiv>
  );
};
