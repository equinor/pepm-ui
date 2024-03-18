import { render, screen } from '@testing-library/react';
import Img from '../../features/ModelView/image.png';
import { ImageView } from './ImageView';

test('check if img is rendered', () => {
  render(<ImageView text="test" img={Img} altText="Alt test" />);
  const image = screen.getByRole('img');

  expect(image).toBeVisible();
});
