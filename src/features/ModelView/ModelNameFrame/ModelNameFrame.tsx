import { Typography } from '@equinor/eds-core-react';
import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from './ModelNameFrame.styled';

export const ModelNameFrame = ({ model }: { model?: AnalogueModelDetail }) => {
  return (
    <Styled.NameFrame className="metadata-name-frame">
      {model ? (
        <Typography variant="h2">{model.name}</Typography>
      ) : (
        <Typography variant="h2">Loading ....</Typography>
      )}
    </Styled.NameFrame>
  );
};
