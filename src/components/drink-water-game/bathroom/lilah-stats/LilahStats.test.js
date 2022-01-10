import { render, screen } from '@testing-library/react';
import LilahStats from './LilahStats';

test('renders learn react link', () => {
  render(<LilahStats />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
