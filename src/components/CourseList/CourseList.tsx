import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard.tsx';
import './CourseList.css';
import mockData from '../../Utils/MockData.tsx';
import Popup from '../Pops/Popup.tsx';
import CartSideBar from '../CartSideBar/SideBarCart.tsx';
import { PaginationArrow, PaginationArrow2 } from '../../assests/index.js';
import { useCartContext } from '../../context/CartContext.tsx';

interface Course {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  educator: string;
}

const mockCourses: Course[] = mockData;

const CourseList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [sortOption, setSortOption] = useState('');
  const coursesPerPage = 4;

  const { cartItems, addToCart } = useCartContext();
 

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const getEffectivePrice = (course: Course) => {
    return course.discountedPrice && course.discountedPrice < course.price
      ? course.discountedPrice
      : course.price;
  };

  const sortedCourses = [...mockCourses].sort((a, b) => {
    const priceA = getEffectivePrice(a);
    const priceB = getEffectivePrice(b);

    if (sortOption === 'low_to_high') {
      return priceA - priceB;
    } else if (sortOption === 'high_to_low') {
      return priceB - priceA;
    }
    return 0;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  const handleAddToCart = (course: Course) => {
    const isAlreadyInCart = cartItems.some(item => item.id === course.id);
    if (isAlreadyInCart) {
      setPopupMessage(`Course "${course.title}" is already in the cart`);
    } else {
      addToCart(course);
      setPopupMessage(`Course "${course.title}" successfully added to the cart`);
    }
    setShowPopup(true);
  };

  const addToWishlist = (course: Course) => {
    console.log(`Course added to wishlist: ${course.title}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const renderPaginationButtons = () => {
    const buttons: JSX.Element[] = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 1);

    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          <img src={PaginationArrow2} alt="previous" />
        </button>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          <img src={PaginationArrow} alt="next" />
        </button>
      );
    }
    return buttons;
  };
  return (
    <div className="course-list-container">
      <div className="course-list-wrapper">
        <div className={`course-list ${showPopup ? 'blurred' : ''}`}>
          <div className="course-top-box">
            <h3 className="course-heading">All Courses</h3>
            <select name="CoursePrice" className="course-select-box" onChange={handleSortChange}>
              <option value="">Sort by Price</option>
              <option value="low_to_high">Low to High</option>
              <option value="high_to_low">High to Low</option>
            </select>
          </div>
          {currentCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              addToCart={handleAddToCart}
              addToWishlist={addToWishlist}
            />
          ))}
          <div className="pagination">
            {renderPaginationButtons()}
          </div>
        </div>
        <Popup message={popupMessage} isVisible={showPopup} onClose={handleClosePopup} />
      </div>
      <div className="sidebar-container">
        <CartSideBar />
      </div>
    </div>
  );
};

export default CourseList;
