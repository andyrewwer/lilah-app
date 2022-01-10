import { render, screen } from '@testing-library/react';
import Bathroom from './Bathroom';

test('renders learn react link', () => {
  render(<Bathroom />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
