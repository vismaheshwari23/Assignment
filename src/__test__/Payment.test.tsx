import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Payment from '../pages/Payment';
import mockData from '../Utils/MockData';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockSetCartItems = jest.fn();

const mockCartContextValue = {
  cartItems: mockData.slice(0, 2),
  setCartItems: mockSetCartItems,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
};

describe('Payment Component', () => {
  let renderMock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    renderMock = jest.fn();
    window.paypal = {
      Buttons: jest.fn().mockImplementation(() => ({
        render: renderMock,
      })),
    };
  });

  it('renders PayPal button', () => {
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <Router>
          <Payment />
        </Router>
      </CartContext.Provider>,
    );

    expect(window.paypal.Buttons).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalled();
  });

  it('navigates back to cart page when the return back button is clicked', () => {
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <Router>
          <Payment />
        </Router>
      </CartContext.Provider>,
    );
    const backButton = screen.getByText('RETURN BACK');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
