import { notifications } from '@equinor/eds-icons';
import { fireEvent, render, screen } from '@testing-library/react';
import IconButton from './IconButton';

test('calls onClick callback when clicked', () => {
  const handleClick = jest.fn();
  render(
    <IconButton title={'Title'} icon={notifications} onClick={handleClick} />,
  );
  const iconButton = screen.getByRole('button');
  fireEvent.click(iconButton);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
