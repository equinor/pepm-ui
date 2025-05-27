import { Typography } from '@equinor/eds-core-react';
import { spacings } from '../../../tokens/spacings';
import { theme } from '../../../tokens/theme';
import { styled } from 'styled-components';
import {
  analogueModelDefault,
  usePepmContextStore,
} from '../../../stores/GlobalStore';

const ModelNameDescription = styled.header`
  display: flex;
  flex-direction: column;
  row-gap: ${spacings.SMALL};
`;

const ModelCreatedBy = styled(Typography)`
  color: ${theme.light.text.staticIconsTertiary};
`;

export const ModelNameFrameDetail = () => {
  const { analogueModel } = usePepmContextStore();
  const date = analogueModel?.createdDate
    ? new Date(analogueModel.createdDate).toDateString().slice(4)
    : '';

  return (
    <>
      {analogueModel !== analogueModelDefault ? (
        <ModelNameDescription>
          <Typography variant="h2" as="h1" className="model-title">
            {analogueModel.name}
          </Typography>
          <ModelCreatedBy group="navigation" variant="breadcrumb">
            Added by {analogueModel.createdBy} on {date}
          </ModelCreatedBy>
        </ModelNameDescription>
      ) : (
        <Typography variant="h2" as="h1">
          Loading ....
        </Typography>
      )}
    </>
  );
};
