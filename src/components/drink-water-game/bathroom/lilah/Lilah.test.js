import { render, screen } from '@testing-library/react';
import Lilah from './Lilah';

test('renders learn react link', () => {
  render(<Lilah />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
