import { Menu } from '@equinor/eds-core-react';
import { notifications } from '@equinor/eds-icons';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import MenuIcon from './MenuIcon';

afterEach(() => cleanup());

function setup() {
  const notificationIcon = { title: 'Notifications', data: notifications };
  const utils = render(
    <MenuIcon icon={notificationIcon}>
      <Menu.Item>I am visible</Menu.Item>
    </MenuIcon>,
  );
  const icon = screen.getByRole('button');
  const menu = screen.getByText('I am visible');

  const clickIcon = () => fireEvent.click(icon);
  const clickOutside = () => fireEvent.mouseDown(document);
  return { ...utils, icon, menu, clickIcon, clickOutside };
}

test('opens a menu when the icon is clicked', () => {
  const utils = setup();
  utils.clickIcon();
  expect(utils.menu).toBeVisible();
});

test('closes the menu on another icon click', () => {
  const utils = setup();
  utils.clickIcon();
  expect(utils.menu).toBeVisible();
  utils.clickIcon(); // again
  expect(utils.menu).not.toBeVisible();
});
