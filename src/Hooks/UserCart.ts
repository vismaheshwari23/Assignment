import { useState, useEffect } from 'react';

export interface Course {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  educator: string;
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (course: Course) => {
    const updatedCartItems = [...cartItems, course];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (courseId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== courseId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
  };
};

export default useCart;
