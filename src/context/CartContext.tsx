import React, { createContext, useContext, ReactNode } from 'react';
import useCart, { Course } from '../Hooks/UserCart.ts';

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
