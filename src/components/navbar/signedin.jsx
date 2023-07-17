import React from 'react';
import './navbar.css'
import logo from '../../images/DCISM.png'
import { BsBoxArrowRight } from "react-icons/bs";

const NavbarSignedIn = ({ handleDashboardClick, handleRequestsClick, handleEquipmentsClick, handleSettingsClick, handleSignOutClick, clickPage }) => {
  return (
    <>
      <img src={logo} width={240} height={40} alt="DCISM-logo" />
      <div className="navbar container mr-auto text-uppercase bg-light navbar-light" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Equipments</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">Requests</a>
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