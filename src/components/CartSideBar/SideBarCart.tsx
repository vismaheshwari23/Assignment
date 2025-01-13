import React from 'react';
import './SideBarCart.css';
import { GoToCheckOut } from '../../assests';
import { useCartContext } from '../../context/CartContext';
import InputBox from '../InputBox/InputBox';
import { useNavigate, useLocation } from 'react-router-dom';
interface CartSideBarProps {
  handleSearch: (searchTerm: string) => void;
}
const CartSideBar: React.FC<CartSideBarProps> = ({ handleSearch }) => {
  const { cartItems } = useCartContext();
  const navigate = useNavigate();
  const location = useLocation();


  const totalPrice = cartItems?.reduce((total, item) => total + (item?.discountedPrice || item?.price), 0);
  const navigatetoCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      {location.pathname !== '/wishlist' && <InputBox onSearch={handleSearch} />}
      <div className="cart-sidebar">
        <h3 className="cart-heading">YOUR CART DETAILS</h3>
        <div className="cart-items">
          {cartItems?.length === 0 && (
            <p className="placeHolder">Your cart is empty right now. Please add courses to the cart from the list</p>
          )}
          {cartItems?.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item">
                <div className="item-div"></div>
                <div className="item-details">
                  <p className="item-title">{item.title}</p>
                </div>
                <p className="item-price">Rs {item.discountedPrice || item.price}/-</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <p><p>Total Cart Value </p><strong>Rs {totalPrice}/-</strong></p>
          <button className="checkout-button" onClick={navigatetoCheckout}>
            <img src={GoToCheckOut} alt="checkout" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
