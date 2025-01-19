import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Popup from '../components/Pops/Popup';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockOnClose = jest.fn();

describe('Popup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the popup with the success message', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course successfully added to the cart"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );

    expect(
      screen.getByText('Course successfully added to the cart'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('sucess')).toBeInTheDocument();
  });

  it('renders the popup with the already exist message', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Already Exist in cart!"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );

    expect(screen.getByText('Already Exist in cart!')).toBeInTheDocument();
    expect(screen.getByAltText('sucess')).toBeInTheDocument();
  });

  it('renders the popup with the payment message and navigate button', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/payment' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <Router>
        <Popup
          message="Payment Successful!"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );

    expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
    const okButton = screen.getByText('OK');
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('calls onClose when the close button is clicked', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course successfully added to the cart"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );

    const closeButton = screen.getByText('X');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not render the popup when isVisible is false', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course successfully added to the cart"
          isVisible={false}
          onClose={mockOnClose}
        />
      </Router>,
    );

    expect(
      screen.queryByText('Course successfully added to the cart'),
    ).not.toBeInTheDocument();
  });
});
