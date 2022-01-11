import { render, screen } from '@testing-library/react';
import GameWonContent from './GameWonContent';

test('renders learn react link', () => {
  render(<GameWonContent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
