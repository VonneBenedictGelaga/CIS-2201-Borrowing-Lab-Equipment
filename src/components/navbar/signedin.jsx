import React from 'react';
import './navbar.css'
import logo from '../../images/DCISM.jpg'
import { BsBoxArrowRight } from "react-icons/bs";

const NavbarSignedIn = ({ handleDashboardClick, handleRequestsClick, handleEquipmentsClick, handleSettingsClick, handleSignOutClick }) => {
  return (
    <>
      <img src={logo} width={200} height={50} alt="DCISM-logo" />
      <div className="navbar container navbar-dark bg-dark mr-auto" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Equipments</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="#">Requests</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Settings</a>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <a className="nav-link" href="#"><BsBoxArrowRight /></a>
            </li>
        </ul>

      </div>
    </>
  );
};

export default NavbarSignedIn;