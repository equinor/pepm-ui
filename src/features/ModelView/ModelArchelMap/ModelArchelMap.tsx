import { ModelArchelMapDialog } from './components/ModelArchelMapDialog';
import { ModelArchelMapTable } from './components/ModelArchelMapTable';
import { ArchelMapContainer } from './ModelArchelMap.styled';
import { usePepmContextStore } from '../../../stores/GlobalStore';
import { Typography } from '@equinor/eds-core-react';
export const ModelArchelMap = () => {
  const { analogueModel } = usePepmContextStore();
  return analogueModel.iniParameters?.archels ? (
    <ArchelMapContainer>
      {analogueModel.iniParameters?.archels
        .filter((a) => a.analogueModelComputeSettingArchelMap !== null)
        .map((a) => a.analogueModelComputeSettingArchelMap).length !== 0 && (
        <ModelArchelMapTable />
      )}
      <ModelArchelMapDialog />
    </ArchelMapContainer>
  ) : (
    <>
      <Typography>Could not retrieve archels from this model</Typography>
    </>
  );
};
