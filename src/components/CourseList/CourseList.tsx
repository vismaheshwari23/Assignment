import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard.tsx';
import './CourseList.css';
import mockData from '../../Utils/MockData.tsx';
import Popup from '../Pops/Popup.tsx';
import CartSideBar from '../CartSideBar/SideBarCart.tsx';
import { PaginationArrow, PaginationArrow2 } from '../../assests/index.js';
import { useCartContext } from '../../context/CartContext.tsx';
import { useLocation } from 'react-router-dom';
import { useWishlistContext } from '../../context/WishlistContext.tsx';
import InputBox from '../InputBox/InputBox.tsx';
import Course from '../../Utils/interface.tsx';

const CourseList: React.FC = () => {
  const [mockCourses, setMockCourse] = useState<Course[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { wishlistItems } = useWishlistContext();
  const { cartItems, addToCart } = useCartContext();

  useEffect(() => {
    if (location.pathname === '/wishlist') {
      setMockCourse(wishlistItems);
    } else {
      setMockCourse(mockData);
    }
    setCurrentPage(1);
  }, [location.pathname, wishlistItems]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const filteredCourses = (
      location.pathname === '/wishlist' ? wishlistItems : mockData
    ).filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase()),
    );
    setMockCourse(filteredCourses);
  };

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

  const coursesPerPage = 6;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );

  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  const handleAddToCart = (course: Course) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === course.id);
    if (isAlreadyInCart) {
      setPopupMessage(`Course ${course.title} already exist in the cart`);
    } else {
      addToCart(course);
      setPopupMessage(`Course successfully added to the cart`);
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
        </button>,
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
        </button>,
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          <img src={PaginationArrow} alt="next" />
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div className="course-list-container">
      <div className="course-list-wrapper">
        <div className={`course-list ${showPopup ? 'blurred' : ''}`}>
          <div className="course-top-box">
            <h3 className="course-heading">
              {location.pathname !== '/wishlist'
                ? 'All Courses'
                : 'My Wishlist'}
            </h3>
            <select
              name="CoursePrice"
              className="course-select-box"
              onChange={handleSortChange}
            >
              <option value="">Course Price</option>
              <option value="low_to_high">Low to High</option>
              <option value="high_to_low">High to Low</option>
            </select>
          </div>
          {location.pathname === '/wishlist' && wishlistItems.length === 0 && (
            <p className="wishlist-item">No course in the wishlist.</p>
          )}
          {searchTerm && mockCourses.length === 0 && (
            <p className="wishlist-item">No course found.</p>
          )}
          {location.pathname !== '/wishlist' && mockCourses.length === 0 && (
            <p className="wishlist-item">No course found.</p>
          )}
          {currentCourses.length > 0 &&
            currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                addToCart={handleAddToCart}
                addToWishlist={addToWishlist}
              />
            ))}
          <div className="pagination">{renderPaginationButtons()}</div>
        </div>
        <Popup
          message={popupMessage}
          isVisible={showPopup}
          onClose={handleClosePopup}
        />
      </div>
      <div className="sidebar-container">
        <InputBox onSearch={handleSearch} />
        <CartSideBar />
      </div>
    </div>
  );
};

export default CourseList;
