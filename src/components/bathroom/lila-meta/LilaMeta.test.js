import { render, screen } from '@testing-library/react';
import LilaMeta from './LilaMeta';

test('renders learn react link', () => {
  render(<LilaMeta />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
