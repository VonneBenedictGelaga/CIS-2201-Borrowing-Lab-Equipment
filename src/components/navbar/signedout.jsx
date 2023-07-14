import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/DCISM.jpg'

const NavbarSignedOut = ({ handleEquipmentsClick, children  }) => {
  return (
    <>
      <img src={logo} width={200} height={40} alt="DCISM-logo" />
      <div className="navbar container navbar-dark bg-dark mr-auto" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Equipments</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarSignedOut;