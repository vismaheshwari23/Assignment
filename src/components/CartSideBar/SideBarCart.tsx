import React from 'react';
import './SideBarCart.css';
import { useCartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { GoToCheckOut } from '../../assests';

const CartSideBar: React.FC = () => {
  const { cartItems } = useCartContext();
  const navigate = useNavigate();

  const totalPrice = cartItems?.reduce(
    (total, item) => total + (item?.discountedPrice || item?.price),
    0,
  );
  const navigatetoCheckout = () => {
    navigate('/cart');
  };

  return (
    <div className="cart-sidebar">
      <h3 className="cart-heading">YOUR CART DETAILS</h3>
      <div className="cart-items">
        {cartItems?.length === 0 && (
          <p className="placeHolder">
            Your cart is empty right now. Please add courses to the cart from
            the list
          </p>
        )}
        {cartItems?.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item">
              <div className="item-div"></div>
              <div className="item-details">
                <p className="item-title">{item.title}</p>
              </div>
              <p className="item-price">
                Rs {item.discountedPrice || item.price}/-
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <div>
          <p>Total Cart Value </p>
          <strong>Rs {totalPrice}/-</strong>
        </div>
        <button
          className="checkout-button"
          onClick={navigatetoCheckout}
          style={{
            visibility: cartItems.length === 0 ? 'hidden' : 'visible',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={GoToCheckOut} alt="Go-to-Checkout"></img>
        </button>
      </div>
    </div>
  );
};

export default CartSideBar;
