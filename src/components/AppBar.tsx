/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon, TopBar } from '@equinor/eds-core-react'
import {
  account_circle as accountCircle,
  notifications,
} from '@equinor/eds-icons'

const AppBar = ({ title }: { title: string }) => {
  return (
    <TopBar>
      <TopBar.Header>{title}</TopBar.Header>
      <TopBar.CustomContent>
        <nav>
          <a href="#">Add model</a>
          <a href="#">Browse</a>
          <a href="#">API</a>
          <a href="#">About</a>
        </nav>
      </TopBar.CustomContent>
      <TopBar.Actions>
        <Icon name="notifications" data={notifications} />
        <Icon name="accountCircle" data={accountCircle} />
      </TopBar.Actions>
    </TopBar>
  )
}

export { AppBar }
