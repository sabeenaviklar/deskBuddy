import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Desk Buddy application', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/desk buddy/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
