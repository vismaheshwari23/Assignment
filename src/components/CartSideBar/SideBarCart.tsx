import React, { useState } from 'react';
import './SideBarCart.css';
import { GoToCheckOut } from '../../assests';
import { useCartContext } from '../../context/CartContext.tsx';
import InputBox from '../InputBox/InputBox.tsx';
import { useNavigate } from 'react-router-dom';

const CartSideBar: React.FC = () => {
  const { cartItems } = useCartContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate=useNavigate();

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const filteredCartItems = cartItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = filteredCartItems.reduce((total, item) => total + (item.discountedPrice || item.price), 0);
  const navigatetoCheckout=()=>{
     navigate('/checkout')
  }

  return (
    <div>
      <InputBox onSearch={handleSearch} />
      <div className="cart-sidebar">
        <h3 className="cart-heading">YOUR CART DETAILS</h3>
        <div className="cart-items">
          {filteredCartItems.length === 0 && (
            <p className="placeHolder">Your cart is empty right now. Please add courses to the cart from the list</p>
          )}
          {filteredCartItems.map(item => (
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
          <p>Total Cart Value: Rs {totalPrice}/-</p>
          <button className="checkout-button" onClick={()=>navigatetoCheckout()}>
            <img src={GoToCheckOut} alt="checkout" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
