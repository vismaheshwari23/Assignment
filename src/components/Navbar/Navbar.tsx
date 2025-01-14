import React from 'react';
import { HashedlnLogo, ProfileLogo, shopingCart } from '../../assests';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useCartContext } from '../../context/CartContext';
const Navbar: React.FC = () => {
  const { cartItems } = useCartContext();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={HashedlnLogo} alt="Hashedln-logo" />
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/wishlist">My Wishlist</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="cart-link">
            <img src={shopingCart} alt="shopingCart" />
            {cartItems.length > 0 && <sup>{cartItems?.length}</sup>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <img src={ProfileLogo} alt="ProfileLogo" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
