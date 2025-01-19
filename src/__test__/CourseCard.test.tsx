import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import CourseCard from '../components/CourseCard/CourseCard';

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

const mockAddToCart = jest.fn();

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CourseCard Component', () => {
  it('renders course details correctly', () => {
    render(
      <WishlistContext.Provider value={mockWishlistContextValue}>
        <Router>
          <CourseCard course={mockCourse} addToCart={mockAddToCart} />
        </Router>
      </WishlistContext.Provider>,
    );
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Rs80/-')).toBeInTheDocument();
    expect(screen.getByText('Rs100/-')).toBeInTheDocument();
  });

  it('calls addToCart when the "ADD TO CART" button is clicked', () => {
    render(
      <WishlistContext.Provider value={mockWishlistContextValue}>
        <Router>
          <CourseCard course={mockCourse} addToCart={mockAddToCart} />
        </Router>
      </WishlistContext.Provider>,
    );
    fireEvent.click(screen.getByText('ADD TO CART'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockCourse);
  });

  it('calls toggleWishlistItem when the wishlist button is clicked', () => {
    render(
      <WishlistContext.Provider value={mockWishlistContextValue}>
        <Router>
          <CourseCard course={mockCourse} addToCart={mockAddToCart} />
        </Router>
      </WishlistContext.Provider>,
    );
    fireEvent.click(screen.getByAltText('add to wishlist'));
    expect(mockWishlistContextValue.toggleWishlistItem).toHaveBeenCalledWith(
      mockCourse,
    );
  });

  it('navigates to course details when the navigate button is clicked', () => {
    render(
      <WishlistContext.Provider value={mockWishlistContextValue}>
        <Router>
          <CourseCard course={mockCourse} addToCart={mockAddToCart} />
        </Router>
      </WishlistContext.Provider>,
    );
    fireEvent.click(screen.getByAltText('navigate'));
    expect(mockNavigate).toHaveBeenCalledWith(
      `/course-details/${mockCourse.id}`,
    );
  });
});
