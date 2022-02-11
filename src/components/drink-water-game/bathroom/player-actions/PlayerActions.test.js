import { render, screen } from '@testing-library/react';
import PlayerActions from './PlayerActions';

test('renders learn react link', () => {
  render(<PlayerActions />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
