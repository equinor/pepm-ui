import { Typography } from '@equinor/eds-core-react';
import { ModelArchelMapDialog } from './components/ModelArchelMapDialog';
import { ModelArchelMapTable } from './components/ModelArchelMapTable';
import { ArchelMapContainer } from './ModelArchelMap.styled';
export const ModelArchelMap = () => {
  return (
    <ArchelMapContainer>
      <Typography variant="h3">Architectural Elements</Typography>
      <ModelArchelMapTable />
      <ModelArchelMapDialog />
    </ArchelMapContainer>
  );
};
