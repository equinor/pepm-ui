import { ModelAreaDto } from '../../../../api/generated';
import * as Styled from './CaseOptionSelects.styled';
import { ModelAreaSelect } from './ModelAreaSelect/ModelAreaSelect';

export const ObjectOptionSelect = ({
  modelAreas,
  selectedModelArea,
  setModelArea,
}: {
  modelAreas: ModelAreaDto[];
  selectedModelArea: ModelAreaDto[] | undefined;
  setModelArea: React.Dispatch<React.SetStateAction<ModelAreaDto[]>>;
}) => {
  return (
    <Styled.AutocompleteWrapper>
      <ModelAreaSelect
        modelAreas={modelAreas}
        selectedModelArea={selectedModelArea}
        setModelArea={setModelArea}
      />
    </Styled.AutocompleteWrapper>
  );
};
