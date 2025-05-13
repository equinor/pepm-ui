import { Typography } from '@equinor/eds-core-react';
import { ModelArchelMapDialog } from './components/ModelArchelMapDialog';
import { ModelArchelMapTable } from './components/ModelArchelMapTable';
import { ArchelMapContainer } from './ModelArchelMap.styled';
import { usePepmContextStore } from '../../../stores/GlobalStore';
export const ModelArchelMap = () => {
  const { analogueModel } = usePepmContextStore();
  return (
    <ArchelMapContainer>
      <Typography variant="h4" as="h3">
        Architectural Elements
      </Typography>
      {analogueModel.iniParameters.archels
        .filter((a) => a.analogueModelComputeSettingArchelMap !== null)
        .map((a) => a.analogueModelComputeSettingArchelMap).length !== 0 && (
        <ModelArchelMapTable />
      )}
      <ModelArchelMapDialog />
    </ArchelMapContainer>
  );
};
