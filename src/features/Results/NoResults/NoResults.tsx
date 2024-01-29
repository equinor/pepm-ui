import { Typography } from '@equinor/eds-core-react';
import { InfoPageComponent } from '../../../components/InfoPageComponent/InfoPageComponent';
import NoResultPicture from './NoResults.jpeg';
import * as Styled from './NoResults.styled';

export const NoResults = () => {
  return (
    <InfoPageComponent scaleHight="true">
      <Styled.Img src={NoResultPicture} alt="altText" />
      <Styled.TextDiv>
        <Typography variant="h4">
          Oh no! It seems we don’t have any results for this model yet
        </Typography>
        <Typography variant="body_long">
          To get started, try adding cases to the <span>&nbsp;</span>
          <Typography link href={'../compute/variogram'}>
            variogram
          </Typography>
          <span>&nbsp;</span>
          or <span>&nbsp;</span>
          <Typography link href={'../compute/object'}>
            object
          </Typography>
          <span>&nbsp;</span> page.
        </Typography>
      </Styled.TextDiv>
    </InfoPageComponent>
  );
};
