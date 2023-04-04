import { render, screen } from '@testing-library/react'
import AppBar from './AppBar'

test('has title', () => {
  render(<AppBar title={'Title'} />)
  const title = screen.getByText('Title')
  expect(title).toBeDefined()
})

test('has navigation tabs', () => {
  render(<AppBar title={'Title'} />)
  const tabs = screen.getAllByRole('tab')
  expect(tabs).toBeDefined()
})

test('has action icons', () => {
  render(<AppBar title={'Title'} />)
  const actionIcons = screen.getAllByTestId('eds-icon-path')
  expect(actionIcons).toBeDefined()
})
