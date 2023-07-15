import React from 'react';
import '../../styles/Dashboard.css'
import equipmentImage from '../../images/dashboard images/equipment-icon.png';
import requestImage from '../../images/dashboard images/request-icon.png';
import archiveImage from '../../images/dashboard images/archive-icon.png';

const Dashboard = () => {

  return (
    <div className="dashboard">
        <div className='dashboard-header'>
            <div className='childDivHeader'>
                <h1>Dashboard</h1>
                <h2>Welcome to Your Dashboard: Where Data Comes Alive and Possibilities Begin</h2>
            </div>
        </div>
      <div className="dashboard-content">
        <div className="widget">
        <div className="image-container">
          <img src={equipmentImage} alt="Equipment" />
        </div>
          <h2 className='hover-text'>Equipments</h2>
        </div>
        <div className="widget">
        <div className="image-container">
          <img src={requestImage} alt="Request Image" />
        </div>
          <h2 className='hover-text'>Requests</h2>
        </div>
        <div className="widget">
        <div className="image-container">
          <img src={archiveImage} alt="Archive Image" />
        </div>
          <h2 className='hover-text'>Archive</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;