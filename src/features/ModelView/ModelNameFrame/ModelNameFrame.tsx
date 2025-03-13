import { Typography } from '@equinor/eds-core-react';
import * as Styled from './ModelNameFrame.styled';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../stores/GlobalStore';

export const ModelNameFrame = () => {
  const { analogueModel } = usePepmContextStore();
  const date = analogueModel?.createdDate
    ? new Date(analogueModel.createdDate).toDateString().slice(4)
    : '';

  return (
    <Styled.NameFrame className="metadata-name-frame">
      {analogueModel !== analogueModelDefault ? (
        <Typography variant="h2" as="h1">
          {analogueModel.name}
          <Typography>
            Added by {analogueModel.createdBy} on {date}
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
