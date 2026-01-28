import { useFetchOrchestrationProgress } from '../../hooks/useFetchOrchestrationProgress';
import * as Styled from './ProgressCell.styled';

interface ProgressCellProps {
  orchestrationId: string | null | undefined;
  isRunning: boolean;
}

export const ProgressCell = ({
  orchestrationId,
  isRunning,
}: ProgressCellProps) => {
  const { data: progress } = useFetchOrchestrationProgress(
    isRunning ? orchestrationId : null,
  );

  const percentComplete = progress?.percentage_completed ?? 0;

  return (
    <Styled.Container>
      {orchestrationId ? (
        <>
          <Styled.StyledLinearProgress
            variant="determinate"
            value={isRunning ? percentComplete : 100}
          />
          <Styled.StyledTypography variant="caption">
            {isRunning ? `${percentComplete.toFixed(1)}%` : '100%'}
          </Styled.StyledTypography>
        </>
      ) : null}
    </Styled.Container>
  );
};
