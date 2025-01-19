import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import CourseList from '../components/CourseList/CourseList';

jest.mock('../Utils/MockData', () => [
  { id: 1, title: 'React Basics', price: 100, educator: 'John Doe' },
  { id: 2, title: 'Advanced React', price: 150, educator: 'Jane Doe' },
  { id: 3, title: 'React and Redux', price: 200, educator: 'Jim Doe' },
  { id: 4, title: 'Vue.js Fundamentals', price: 120, educator: 'Jack Doe' },
]);

describe('CourseList Component', () => {
  it('renders all courses', () => {
    render(
      <Router>
        <WishlistProvider>
          <CartProvider>
            <CourseList />
          </CartProvider>
        </WishlistProvider>
      </Router>,
    );

    const courseTitles = [
      'React Basics',
      'Advanced React',
      'React and Redux',
      'Vue.js Fundamentals',
    ];
    courseTitles.forEach((title) => {
      const courseTitleElement = screen.getByText((content, element) =>
        content.includes(title),
      );
      expect(courseTitleElement).toBeInTheDocument();
    });
  });

  it('renders the sort dropdown', () => {
    render(
      <Router>
        <WishlistProvider>
          <CartProvider>
            <CourseList />
          </CartProvider>
        </WishlistProvider>
      </Router>,
    );

    const sortDropdown = screen.getByRole('combobox');
    expect(sortDropdown).toBeInTheDocument();
  });

  it('renders pagination buttons', () => {
    render(
      <Router>
        <WishlistProvider>
          <CartProvider>
            <CourseList />
          </CartProvider>
        </WishlistProvider>
      </Router>,
    );

    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons.length).toBeGreaterThan(0);
  });

  it('shows popup message when a course is added to the cart', () => {
    render(
      <Router>
        <WishlistProvider>
          <CartProvider>
            <CourseList />
          </CartProvider>
        </WishlistProvider>
      </Router>,
    );

    const addToCartButton = screen.getAllByText(/Add to Cart/i)[0];
    fireEvent.click(addToCartButton);

    const popupMessage = screen.getByText(/successfully added to the cart/i);
    expect(popupMessage).toBeInTheDocument();
  });
});
