import { Typography } from '@equinor/eds-core-react'
import * as Styled from './InfoPageComponent.style'

export const InfoPageComponent = ({
  title,
  children,
}: {
  title: string
  children?: JSX.Element | JSX.Element[]
}) => {
  return (
    <Styled.Page className="about-container">
      <Styled.InnerWrapper>
        <Typography variant="h1">{title}</Typography>
        {children}
      </Styled.InnerWrapper>
    </Styled.Page>
  )
}
