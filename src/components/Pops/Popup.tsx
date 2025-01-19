import React from 'react';
import './Popup.css';
import { alreadyExist, PopupCircle } from '../../assests';
import { useLocation, useNavigate } from 'react-router-dom';
import { PopupProps } from '../../Utils/interface';

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  function navigateToHome() {
    navigate('/');
  }
  return isVisible ? (
    <div className="popup-overlay">
      <div className="popup">
        {location.pathname !== '/payment' && (
          <>
            <div className="popup-header">
              <button className="close-button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="popup-message">
              <img
                src={
                  message === 'Course successfully added to the cart'
                    ? PopupCircle
                    : alreadyExist
                }
                alt="sucess"
              />
              {message === 'Course successfully added to the cart'
                ? message
                : 'Already Exist in cart!'}
            </div>
          </>
        )}
        {location.pathname === '/payment' && (
          <>
            <div className="popup-header">
              <button className="close-button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="popup-message">{message}</div>
            <button
              className="navigate-button"
              onClick={() => {
                navigateToHome();
              }}
            >
              OK
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Popup;
