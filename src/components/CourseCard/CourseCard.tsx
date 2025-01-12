import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';
import { ArrowLogo, WishListLogo, WishListLogoActive } from '../../assests';
import { useWishlistContext } from '../../context/WishlistContext.tsx';

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
}

const CourseCard: React.FC<CourseCardProps> = ({ course, addToCart }) => {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlistItem } = useWishlistContext();

  const navigateToCourseDetails = (id: number) => {
    navigate(`/course-details/${id}`);
  };

  const isCourseInWishlist = wishlistItems.some(item => item.id === course.id);

  return (
    <div className="course-card">
      <div className='logo-div'></div>
      <div className="course-info">
        <div className="course-title">
          <h2>{course.title}</h2>
          <div className="course-title-button">
            <button>React</button>
            <button>React</button>
          </div>
        </div>
        <p className="educator">{course.educator}</p>
        <button className="add-to-wishlist" onClick={() => toggleWishlistItem(course)}>
          {isCourseInWishlist ? (
            <img src={WishListLogoActive} alt="added to wishlist" />
          ) : (
            <img src={WishListLogo} alt="add to wishlist" />
          )}
        </button>
        <p>
          Price: {course.discountedPrice ? (
            <>
              Rs <s>{course.price}</s> {course.discountedPrice}/-
            </>
          ) : (
            <>Rs {course.price}/-</>
          )}
        </p>
      </div>
      <div className="actions">
        <button onClick={() => addToCart(course)}>Add to Cart</button>
      </div>
      <button className='navigate-arrow' onClick={() => navigateToCourseDetails(course.id)}>
        <img src={ArrowLogo} alt="navigate" />
      </button>
    </div>
  );
};

export default CourseCard;
