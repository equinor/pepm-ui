import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from './ModelNameFrame.styled';

export const ModelNameFrame = ({ model }: { model?: AnalogueModelDetail }) => {
  return (
    <Styled.NameFrame className="metadata-name-frame">
      {model ? <h1>{model.name}</h1> : <h1>Loading ....</h1>}
    </Styled.NameFrame>
  );
};
