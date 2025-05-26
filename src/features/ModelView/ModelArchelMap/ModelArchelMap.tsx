import { ModelArchelMapDialog } from './components/ModelArchelMapDialog';
import { ModelArchelMapTable } from './components/ModelArchelMapTable';
import { ArchelMapContainer } from './ModelArchelMap.styled';
import { usePepmContextStore } from '../../../stores/GlobalStore';
export const ModelArchelMap = () => {
  const { analogueModel } = usePepmContextStore();
  return (
    <ArchelMapContainer>
      {analogueModel.iniParameters.archels
        .filter((a) => a.analogueModelComputeSettingArchelMap !== null)
        .map((a) => a.analogueModelComputeSettingArchelMap).length !== 0 && (
        <ModelArchelMapTable />
      )}
      <ModelArchelMapDialog />
    </ArchelMapContainer>
  );
};
