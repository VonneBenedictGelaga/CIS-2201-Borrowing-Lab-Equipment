import React from 'react';

const NavbarSignedOut = ({ handleEquipmentsClick }) => {
  return (
    <nav>
      <div className="logo">
        <img src='../../images/DCISM.jpg' alt="Logo" />
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <span className="navbar-link" onClick={handleEquipmentsClick}>Equipments</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarSignedOut;