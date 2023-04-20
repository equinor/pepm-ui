import { TopBar } from '@equinor/eds-core-react'
import * as Styled from './AppBar.styled'
import { Icons } from './Icons/Icons'
import { Navigation } from './Navigation/Navigation'

const AppBar = ({ title }: { title: string }) => {
  return (
    <Styled.TopBar>
      <TopBar.Header>{title}</TopBar.Header>
      <Navigation />
      <TopBar.Actions>
        <Icons />
      </TopBar.Actions>
    </Styled.TopBar>
  )
}

export default AppBar
