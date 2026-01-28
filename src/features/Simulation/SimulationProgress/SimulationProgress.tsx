import { close } from '@equinor/eds-icons';
import {
  Button,
  Chip,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as Styled from './SimulationProgress.styled';

Icon.add({ close });

interface SimulationProgressProps {
  percentComplete: number;
  stepsGenerated: number;
  totalSteps: number;
  timeRemaining: string;
  onStop: () => void;
  isProcessing: boolean;
  status: 'not-started' | 'running' | 'completed';
}

export const SimulationProgress = ({
  percentComplete,
  stepsGenerated,
  totalSteps,
  timeRemaining,
  onStop,
  isProcessing,
  status,
}: SimulationProgressProps) => {
  const statusText =
    status === 'not-started'
      ? 'Not started'
      : status === 'running'
      ? 'Running...'
      : 'Completed';
  const chipVariant = status === 'running' ? 'active' : 'default';

  return (
    <Styled.Container>
      <Styled.Header>
        <Typography variant="h4">Simulation progress</Typography>
        <Chip variant={chipVariant}>{statusText}</Chip>
      </Styled.Header>

      <Styled.ProgressSection>
        <LinearProgress variant="determinate" value={percentComplete} />

        <Styled.ProgressInfo>
          <Typography variant="body_short">
            {percentComplete.toFixed(1)}% complete • {stepsGenerated} of{' '}
            {totalSteps} steps generated • {timeRemaining} remaining
          </Typography>

          {isProcessing && (
            <Button variant="ghost" onClick={onStop}>
              <Icon name="close" size={16} />
              Stop simulation...
            </Button>
          )}
        </Styled.ProgressInfo>
      </Styled.ProgressSection>
    </Styled.Container>
  );
};
