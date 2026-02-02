/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@equinor/eds-core-react';
import { refresh } from '@equinor/eds-icons';
import { useFetchScenario } from '../../hooks/useFetchScenario';
import { useFetchOrchestration } from '../../hooks/useFetchOrchestration';
import { useFetchOrchestrationProgress } from '../../hooks/useFetchOrchestrationProgress';
import { useFetchCategorizedImages } from '../../hooks/useFetchCategorizedImages';
import { SimulationSidebar } from '../../features/Simulation/SimulationSidebar/SimulationSidebar';
import { SimulationProgress } from '../../features/Simulation/SimulationProgress/SimulationProgress';
import { OutputFiles } from '../../features/Simulation/OutputFiles/OutputFiles';
import { GeneratedImages } from '../../features/Simulation/GeneratedImages/GeneratedImages';
import { InputParameters } from '../../features/Simulation/InputParameters';
import * as Styled from './Simulation.styled';

Icon.add({ refresh });

export const Simulation = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'progress' | 'parameters'>(
    'progress',
  );

  const { data: scenario, isLoading: scenarioLoading } =
    useFetchScenario(simulationId);
  const { data: orchestration } = useFetchOrchestration(
    scenario?.orchestration_id,
  );
  const { data: progress } = useFetchOrchestrationProgress(
    scenario?.orchestration_id,
  );

  const isProcessing = orchestration?.phase_status === 'Running';

  const { data: categorizedImages } = useFetchCategorizedImages(
    scenario?.orchestration_id,
    isProcessing,
  );

  const handleBackToQueue = () => {
    navigate('/?tab=simulations');
  };

  const handleStopSimulation = () => {
    // TODO: Implement stop orchestration logic
  };

  if (scenarioLoading) {
    return <div>Loading scenario...</div>;
  }

  if (!scenario) {
    return <div>Scenario not found</div>;
  }

  // Extract progress data from lightweight progress endpoint
  const percentComplete = progress?.percentage_completed ?? 0;
  const currentStep = progress?.current_timestep ?? 0;
  const totalSteps = Number(progress?.total_timesteps ?? 0);
  const timeRemaining = progress?.estimated_time_remaining ?? '-';

  // Determine status based on orchestration state
  const status: 'not-started' | 'running' | 'completed' = !orchestration
    ? 'not-started'
    : orchestration.phase_status === 'Running'
    ? 'running'
    : 'completed';

  return (
    <Styled.PageContainer>
      <SimulationSidebar
        onBackToQueue={handleBackToQueue}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <Styled.MainContent>
        {activeSection === 'progress' && (
          <Styled.ContentGrid>
            <SimulationProgress
              percentComplete={percentComplete}
              stepsGenerated={currentStep}
              totalSteps={totalSteps}
              timeRemaining={timeRemaining}
              isProcessing={isProcessing}
              status={status}
              onStop={handleStopSimulation}
            />

            <OutputFiles
              orchestrationId={orchestration?.delft_orchestration_id}
            />

            <Styled.FullWidthRow>
              <GeneratedImages
                images={categorizedImages}
                orchestrationId={scenario?.orchestration_id ?? undefined}
              />
            </Styled.FullWidthRow>
          </Styled.ContentGrid>
        )}

        {activeSection === 'parameters' && (
          <InputParameters scenario={scenario} />
        )}
      </Styled.MainContent>
    </Styled.PageContainer>
  );
};
