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
          <h2>Equipment</h2>
          {/* Add content for the first widget */}
        </div>
        <div className="widget">
          <h2>Requests</h2>
          {/* Add content for the second widget */}
        </div>
        {/* Add more widgets as needed */}
        <div className="widget">
          <h2>Archive</h2>
          {/* Add content for the first widget */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;