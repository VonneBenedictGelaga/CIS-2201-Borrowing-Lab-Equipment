import React from 'react';
import './navbar.css'
import logo from '../../images/DCISM.jpg'
import { BsBoxArrowRight } from "react-icons/bs";

const NavbarSignedIn = ({ handleDashboardClick, handleRequestsClick, handleEquipmentsClick, handleSettingsClick, handleSignOutClick }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <img src={logo} alt="Logo" width="200" height="40"/>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">DASHBOARD</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">EQUIPMENTS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">REQUESTS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">SETTINGS</a>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#"><BsBoxArrowRight /></a>
            </li>
          </ul>

        </div>
      </nav>
    </>
  );
};

export default NavbarSignedIn;