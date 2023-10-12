import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from './ModelNameFrame.styled';

export const ModelNameFrame = ({ model }: { model: AnalogueModelDetail }) => {
  return (
    <Styled.NameFrame className="metadata-name-frame">
      <h1>{model.name}</h1>
    </Styled.NameFrame>
  );
};
