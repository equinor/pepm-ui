import { Button, Dialog, Typography } from '@equinor/eds-core-react';
import * as Styled from './JobInspectionDialog.styled';

export interface SimulationJob {
  jobId: string;
  name: string;
  status: string;
  createdDate?: string;
  completedDate?: string;
  progress?: number;
  modelId?: string;
  errorMessage?: string;
}

interface JobInspectionDialogProps {
  isOpen: boolean;
  job: SimulationJob | null;
  onClose: () => void;
}

export const JobInspectionDialog = ({
  isOpen,
  job,
  onClose,
}: JobInspectionDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Header>
        <Dialog.Title>Job Details</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        {job && (
          <Styled.Content>
            <Styled.Title>
              <Typography variant="h6">{job.name}</Typography>
            </Styled.Title>
            <Styled.Details>
              <Typography>
                <strong>Job ID:</strong> {job.jobId}
              </Typography>
              <Typography>
                <strong>Status:</strong> {job.status}
              </Typography>
              {job.modelId && (
                <Typography>
                  <strong>Model ID:</strong> {job.modelId}
                </Typography>
              )}
              {job.createdDate && (
                <Typography>
                  <strong>Created:</strong>{' '}
                  {new Date(job.createdDate).toLocaleString()}
                </Typography>
              )}
              {job.completedDate && (
                <Typography>
                  <strong>Completed:</strong>{' '}
                  {new Date(job.completedDate).toLocaleString()}
                </Typography>
              )}
              {job.progress !== undefined && (
                <Typography>
                  <strong>Progress:</strong> {job.progress}%
                </Typography>
              )}
              {job.errorMessage && (
                <Styled.ErrorMessage>
                  <Typography>
                    <strong>Error:</strong> {job.errorMessage}
                  </Typography>
                </Styled.ErrorMessage>
              )}
            </Styled.Details>
          </Styled.Content>
        )}
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={onClose}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
