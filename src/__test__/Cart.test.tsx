import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import Cart from '../components/Cart/Cart';

const mockCourse = {
  id: 1,
  title: 'React Basics',
  price: 100,
  discountedPrice: 80,
  educator: 'John Doe',
};

const mockWishlistContextValue = {
  wishlistItems: [],
  toggleWishlistItem: jest.fn(),
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
};

const mockCartContextValue = {
  cartItems: [mockCourse],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const CartWrapper = () => (
  <WishlistContext.Provider value={mockWishlistContextValue}>
    <CartContext.Provider value={mockCartContextValue}>
      <Router>
        <Cart course={mockCourse} />
      </Router>
    </CartContext.Provider>
  </WishlistContext.Provider>
);

describe('Cart Component', () => {
  it('renders cart details correctly', () => {
    render(<CartWrapper />);

    expect(screen.getByText('1 Courses in Cart')).toBeInTheDocument();
    expect(screen.getAllByText('React Basics')[0]).toBeInTheDocument();
    expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Rs 80/-')[0]).toBeInTheDocument();
  });

  it('calls removeFromCart when the remove button is clicked', () => {
    render(<CartWrapper />);
    fireEvent.click(screen.getByAltText('removeFromCart'));

    expect(mockCartContextValue.removeFromCart).toHaveBeenCalledWith(
      mockCourse.id,
    );
  });

  it('calls handleMoveToWishlist when the "Move to Wishlist" button is clicked', () => {
    render(<CartWrapper />);
    fireEvent.click(screen.getByText('Move to Wishlist'));
    expect(mockWishlistContextValue.toggleWishlistItem).toHaveBeenCalledWith(
      mockCourse,
    );
    expect(mockCartContextValue.removeFromCart).toHaveBeenCalledWith(
      mockCourse.id,
    );
  });

  it('navigates to payment page when the checkout button is clicked', () => {
    render(<CartWrapper />);
    fireEvent.click(screen.getByTestId('checkout-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/payment');
  });
});
