import { Typography } from '@equinor/eds-core-react';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../stores/GlobalStore';

export const ModelNameFrameDetail = () => {
  const { analogueModel } = usePepmContextStore();
  const date = analogueModel?.createdDate
    ? new Date(analogueModel.createdDate).toDateString().slice(4)
    : '';

  return (
    <div style={{ paddingBottom: '1rem' }}>
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
    </div>
  );
};
