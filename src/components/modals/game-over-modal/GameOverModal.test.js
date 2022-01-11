import { render, screen } from '@testing-library/react';
import GameOverModal from './GameOverModal';

test('renders learn react link', () => {
  render(<GameOverModal />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
