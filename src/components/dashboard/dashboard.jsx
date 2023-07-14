import React from 'react';
import '../../styles/Dashboard.css'



const Dashboard = () => {
  return (
    <div className="dashboard">
        <div className='dashboard-header'>
            <div className='childDivHeader'>
                <h1>Dashboard</h1>
            </div>
        </div>
      <div className="dashboard-content">
        <div className="widget">
          <div className='image-container'>
              <img src="src\images\dashboard images\Equipment.png" alt="Requests Image" />
          </div>
          <h2>Equipment</h2>
        </div>
        <div className="widget">
          <div className='image-container'>
            <img src="src\images\dashboard images\Equipment.png" alt="Requests Image" />
          </div>
          <h2>Requests</h2>
        </div>
        <div className="widget">
          <div className='image-container'>
              <img src="src\images\dashboard images\Equipment.png" alt="Requests Image" />
          </div>
          <h2>Archive</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;