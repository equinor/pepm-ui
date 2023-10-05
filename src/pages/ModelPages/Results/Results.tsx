import { Typography } from '@equinor/eds-core-react'
import { InfoPageComponent } from '../../../components/InfoPageComponent/InfoPageComponent'
import NoResultPicture from './NoResults.jpeg'
import * as Styled from './Results.styled'

export const Results = () => {
  return (
    <InfoPageComponent scaleHight="true">
      <img src={NoResultPicture} alt="altText" />
      <Styled.TextDiv>
        <Typography variant="h4">
          Oh no! It seems we don’t have any results for this model yet
        </Typography>
        <Typography variant="body_long">
          To get started, try adding cases to the variogram or object page
        </Typography>
      </Styled.TextDiv>
    </InfoPageComponent>
  )
}
