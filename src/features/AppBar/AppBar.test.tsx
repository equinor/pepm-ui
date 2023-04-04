import { fireEvent, render, screen } from '@testing-library/react'
import { AppBar } from './AppBar'

test('renders navigation tabs', () => {
  render(<AppBar title={'Title'} />)
  expect(screen.getAllByRole('tab')).toBeDefined()
})

test('opens a menu when the user icon is clicked', () => {
  render(<AppBar title={'Title'} />)
  const userIconButton = screen.getByRole('button', { name: 'UserInfo' })
  const menu = screen.getByText('Logged in')

  fireEvent.click(userIconButton)
  expect(menu).toBeVisible()

  // Hide the menu again on another click
  fireEvent.click(userIconButton)
  expect(menu).not.toBeVisible()

  // TODO: Hide menu on click outside itself
  // fireEvent.click(userIconButton)
  fireEvent.click(window)
  expect(menu).not.toBeVisible()
})
