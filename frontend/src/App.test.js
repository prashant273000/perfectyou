import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar title', () => {
  render(<App />);
  const linkElement = screen.getByText(/PerfectYou AI/i);
  expect(linkElement).toBeInTheDocument();
});