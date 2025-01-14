import React from 'react';
import './Popup.css';
import { PopupCircle } from '../../assests';

interface PopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose }) => {
  return isVisible ? (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-message">
          <img src={PopupCircle} alt="sucess" />
          {message}
        </div>
      </div>
    </div>
  ) : null;
};

export default Popup;
