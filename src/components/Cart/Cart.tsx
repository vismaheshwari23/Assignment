import React, { useState } from 'react';
import './Cart.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../../assests';
import { useWishlistContext } from '../../context/WishlistContext';
import { useCartContext } from '../../context/CartContext';
import CourseCard from '../CourseCard/CourseCard';
import mockData from '../../Utils/MockData';
import Course, { CourseCardProps } from '../../Utils/interface';

const Cart: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems, toggleWishlistItem } = useWishlistContext();
  const { cartItems, addToCart, removeFromCart } = useCartContext();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleAddToCart = (course: Course) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === course.id);
    if (isAlreadyInCart) {
      setPopupMessage(`Course "${course.title}" is already in the cart`);
    } else {
      addToCart(course);
      setPopupMessage(
        `Course "${course.title}" successfully added to the cart`,
      );
    }
    setShowPopup(true);
  };

  const handleMoveToWishlist = (course: Course) => {
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item.id === course.id,
    );
    if (!isAlreadyInWishlist) {
      toggleWishlistItem(course);
    }
    removeFromCart(course.id);
  };

  const navigatetoCheckout = () => {
    navigate('/payment');
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + (item?.discountedPrice || item?.price),
    0,
  );
  const savePrice = cartItems?.reduce(
    (total, item) =>
      total + (item?.price - (item?.discountedPrice || item?.price)),
    0,
  );
  const getRecommendedCourses = (course: Course) => {
    return mockData.filter((item) => item.title === course.recommendedCourse);
  };
  return (
    <div className="cart-container">
      <div className="cart">
        <p className="cart-details">
          {cartItems.length === 0
            ? 'Your cart is empty right now. Please add courses to the cart from the list'
            : `${cartItems.length} Courses in Cart`}
        </p>
        {cartItems?.map((course: Course) => (
          <div className="course-card" key={course.id}>
            <div className="course-title-logo-div">
              <div className="logo-div"></div>
              <div className="course-title">
                <h2>{course.title}</h2>
                <p className="Educator">{course.educator}</p>
              </div>
            </div>
            <div>
              <div className="course-info-box">
                <button
                  className="add-to-wishlist"
                  onClick={() => handleMoveToWishlist(course)}
                >
                  Move to Wishlist
                </button>
                <div>
                  {course.discountedPrice ? (
                    <div className="price">
                      <strong>Rs {course.discountedPrice}/-</strong>
                    </div>
                  ) : (
                    <div className="price">Rs {course.price}/-</div>
                  )}
                </div>
                <button
                  className="removeFromCart"
                  onClick={() => removeFromCart(course.id)}
                >
                  <img src={DeleteIcon} alt="removeFromCart" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="recommended-course">
            <p>Recommended Courses</p>
            {cartItems
              ?.slice(0, 2)
              ?.map((course: Course) => (
                <div key={course.id}>
                  {getRecommendedCourses(course)?.map((recommendedCourse) => (
                    <CourseCard
                      key={recommendedCourse.id}
                      course={recommendedCourse}
                      addToCart={handleAddToCart}
                      addToWishlist={handleMoveToWishlist}
                    />
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="total-box">
          <p className="total-amount">Total Amount</p>
          <h3 className="total-price">Rs {totalPrice}/-</h3>
          <p className="total-saved">You have saved Rs {savePrice}/-</p>
          <button
            className="total-checkout-button"
            onClick={navigatetoCheckout}
            data-testid="checkout-button"
          ></button>
        </div>
      )}
    </div>
  );
};

export default Cart;
