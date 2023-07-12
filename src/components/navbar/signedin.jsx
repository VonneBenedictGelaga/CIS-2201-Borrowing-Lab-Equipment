import React from 'react';
import './navbar.css'

const NavbarSignedIn = ({ handleDashboardClick, handleRequestsClick, handleEquipmentsClick, handleSettingsClick, handleSignOutClick }) => {
  return (
    <nav>
      <div className="logo">
        <img src='../../images/DCISM.jpg' alt="Logo" />
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <button className="navbar-link" onClick={handleDashboardClick}>Dashboard</button>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" onClick={handleRequestsClick}>Requests</button>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" onClick={handleEquipmentsClick}>Equipments</button>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" onClick={handleSettingsClick}>Settings</button>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" onClick={handleSignOutClick}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarSignedIn;