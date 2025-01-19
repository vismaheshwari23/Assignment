import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CartSideBar from '../components/CartSideBar/SideBarCart';
import mockData from '../Utils/MockData';
import { CartContext } from '../context/CartContext';

const mockCartContextValue = {
  cartItems: [mockData[0], mockData[1]],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  setCartItems: jest.fn(),
};

describe('CartSideBar Component', () => {
  it('renders cart items and total price correctly', () => {
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <Router>
          <CartSideBar />
        </Router>
      </CartContext.Provider>,
    );

    expect(screen.getByText('YOUR CART DETAILS')).toBeInTheDocument();

    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Advanced React')).toBeInTheDocument();

    const totalPrice = mockCartContextValue?.cartItems?.reduce(
      (total, item) => total + (item.discountedPrice || item.price),
      0,
    );
    expect(screen.getByText(`Rs ${totalPrice}/-`)).toBeInTheDocument();
    expect(screen.getByAltText('Go-to-Checkout')).toBeVisible();
  });

  it('renders placeholder text when cart is empty', () => {
    render(
      <CartContext.Provider value={{ ...mockCartContextValue, cartItems: [] }}>
        <Router>
          <CartSideBar />
        </Router>
      </CartContext.Provider>,
    );

    expect(
      screen.getByText(
        'Your cart is empty right now. Please add courses to the cart from the list',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByAltText('Go-to-Checkout')).not.toBeVisible();
  });
});
