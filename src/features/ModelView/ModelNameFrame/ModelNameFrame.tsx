import { Typography } from '@equinor/eds-core-react';
import { AnalogueModelDetail } from '../../../api/generated';
import * as Styled from './ModelNameFrame.styled';

export const ModelNameFrame = ({ model }: { model?: AnalogueModelDetail }) => {
  const date = model?.createdDate
    ? new Date(model.createdDate).toDateString().slice(4)
    : '';

  return (
    <Styled.NameFrame className="metadata-name-frame">
      {model ? (
        <Typography variant="h2" as="h1">
          {model.name}
          <Typography>
            Added by {model.createdBy} on {date}
          </Typography>
        </Typography>
      ) : (
        <Typography variant="h2" as="h1">
          Loading ....
        </Typography>
      )}
    </Styled.NameFrame>
  );
};
