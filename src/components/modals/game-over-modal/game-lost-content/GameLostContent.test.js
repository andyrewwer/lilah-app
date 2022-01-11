import { render, screen } from '@testing-library/react';
import GameLostContent from './GameLostContent';

test('renders learn react link', () => {
  render(<GameLostContent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
