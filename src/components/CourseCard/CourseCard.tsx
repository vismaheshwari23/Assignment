import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CourseCard.css';
import {
  ArrowLogo,
  DeleteIcon,
  WishListLogo,
  WishListLogoActive,
} from '../../assests';
import { useWishlistContext } from '../../context/WishlistContext';

interface Course {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  educator: string;
}

interface CourseCardProps {
  course: Course;
  addToCart: (course: Course) => void;
  addToWishlist?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems, toggleWishlistItem } = useWishlistContext();

  const navigateToCourseDetails = (id: number) => {
    navigate(`/course-details/${id}`);
  };

  const isCourseInWishlist = wishlistItems.some(
    (item) => item.id === course.id,
  );
  const [showAddToWishlist, setShowAddToWishlist] = useState(true);

  useEffect(() => {
    if (location.pathname === '/wishlist' || location.pathname === '/cart') {
      setShowAddToWishlist(false);
    } else {
      setShowAddToWishlist(true);
    }
  }, [location.pathname]);

  return (
    <div className="course-card">
      <div className="logo-div"></div>
      <div className="course-info">
        <div className="course-title">
          <h2>{course.title}</h2>
          <div className="course-title-button">
            <button>React</button>
            <button>React</button>
          </div>
        </div>
        <p className="educator">{course.educator}</p>
        {showAddToWishlist && (
          <button
            className="add-to-wishlist"
            onClick={() => toggleWishlistItem(course)}
          >
            {isCourseInWishlist ? (
              <img src={WishListLogoActive} alt="added to wishlist" />
            ) : (
              <img src={WishListLogo} alt="add to wishlist" />
            )}
          </button>
        )}
        <p>
          {course.discountedPrice ? (
            <div className="price">
              <strong>Rs {course.discountedPrice}/-</strong>
              <s>Rs {course.price}/-</s>
            </div>
          ) : (
            <div className="price">
              Rs {course.price}/- <s>{' - '}</s>
            </div>
          )}
        </p>
      </div>
      <div className="actions add-to-cart">
        <button onClick={() => addToCart(course)}>ADD TO CART</button>
      </div>
      {location.pathname === '/wishlist' && (
        <button
          className="removeWishlist"
          onClick={() => toggleWishlistItem(course)}
        >
          <img src={DeleteIcon} alt="remove-wishlist" />
        </button>
      )}
      <button
        className="navigate-arrow"
        onClick={() => navigateToCourseDetails(course.id)}
      >
        <img src={ArrowLogo} alt="navigate" />
      </button>
    </div>
  );
};

export default CourseCard;
