import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Desk Buddy login screen by default', () => {
  render(<App />);
  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});

test('renders account subtitle on login screen', () => {
  render(<App />);
  const subtitle = screen.getByText(/enter your account details/i);
  expect(subtitle).toBeInTheDocument();
});
