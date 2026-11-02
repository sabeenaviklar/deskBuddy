import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Desk Buddy login page initially', () => {
  render(<App />);
  const welcomeText = screen.getByText(/Desk Buddy/i);
  expect(welcomeText).toBeInTheDocument();
  const loginHeader = screen.getByRole('heading', { name: /Login/i });
  expect(loginHeader).toBeInTheDocument();
});
