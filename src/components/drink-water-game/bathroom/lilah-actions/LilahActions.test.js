import { render, screen } from '@testing-library/react';
import LilahActions from './LilahActions';

test('renders learn react link', () => {
  render(<LilahActions />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
