import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const Year: any = new Date();
  return (
    <div className="footer">
      <p>@ Hashedln By Deloitte. {Year.getFullYear()}</p>
    </div>
  );
};

export default Footer;
