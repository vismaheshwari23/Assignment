import React, { createContext, useContext, ReactNode } from 'react';
import useWishlistItem from '../Hooks/useWishlistItem.ts';

interface Course {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  educator: string;
}

interface WishlistContextProps {
  wishlistItems: Course[];
  addToWishlist: (course: Course) => void;
  removeFromWishlist: (courseId: number) => void;
  toggleWishlistItem: (course: Course) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined,
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
  } = useWishlistItem();

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error(
      'useWishlistContext must be used within a WishlistProvider',
    );
  }
  return context;
};
