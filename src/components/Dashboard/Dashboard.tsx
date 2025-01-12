import React from 'react';
import './Dashboard.css';
import { ReactLogo } from '../../assests';

interface DashboardProps {
  text: string;
}

const Dashboard: React.FC<DashboardProps> = ({ text }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="dashboard-text">{text}</div>
        <img src={ReactLogo} alt="react-logo" />
      </div>
    </div>
  );
};

export default Dashboard;
