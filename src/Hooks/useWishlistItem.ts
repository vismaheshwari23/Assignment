import { useState, useEffect } from 'react';
import Course from '../Utils/interface';

const useWishlistItem = () => {
  const [wishlistItems, setWishlistItems] = useState<Course[]>(() => {
    const storedItems = localStorage.getItem('wishlistItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (course: Course) => {
    setWishlistItems((prevItems) => [...prevItems, course]);
  };

  const removeFromWishlist = (courseId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== courseId),
    );
  };

  const toggleWishlistItem = (course: Course) => {
    if (wishlistItems.some((item) => item.id === course.id)) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
  };
};

export default useWishlistItem;
