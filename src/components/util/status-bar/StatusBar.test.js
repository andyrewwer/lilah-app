import { render, screen } from '@testing-library/react';
import StatusBar from './StatusBar';

test('renders learn react link', () => {
  render(<StatusBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
