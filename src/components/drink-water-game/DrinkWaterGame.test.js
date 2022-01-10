import { render, screen } from '@testing-library/react';
import DrinkWaterGame from './DrinkWaterGame';

test('renders learn react link', () => {
  render(<DrinkWaterGame />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
