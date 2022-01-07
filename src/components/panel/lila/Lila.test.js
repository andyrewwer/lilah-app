import { render, screen } from '@testing-library/react';
import Lila from './Lila';

test('renders learn react link', () => {
  render(<Lila />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
