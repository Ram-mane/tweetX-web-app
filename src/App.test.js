import { render, screen } from '@testing-library/react';
import App from './App';
import { ToastContainer } from 'react-toastify';

test('renders learn react link', () => {
  render(<App />);
  <ToastContainer/>
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
