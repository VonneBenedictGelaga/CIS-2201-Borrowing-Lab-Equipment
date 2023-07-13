import React from 'react';
import 'src\styles\dashboardStyle.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <div className="widget">
          <h2>Widget 1</h2>
          {/* Add content for the first widget */}
        </div>
        <div className="widget">
          <h2>Widget 2</h2>
          {/* Add content for the second widget */}
        </div>
        {/* Add more widgets as needed */}
      </div>
    </div>
  );
};

export default Dashboard;