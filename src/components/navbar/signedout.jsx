import React, { useState } from 'react';
import { Login } from '../login/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReqBorrower from '../request/reqborrower.jsx';
import DisplayBorrower from '../equipment/displayborrower.jsx';

import { BsHouse } from 'react-icons/bs';
import { BsFillDisplayFill } from 'react-icons/bs';
import { BsGrid1X2Fill } from 'react-icons/bs';
import logo from '../../images/DCISM.jpg'

const NavbarSignedOut = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isEquipmentsActive, setIsEquipmentsActive] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEquipmentsClick = () => {
    setIsEquipmentsActive(true);
    setActiveTab('equipments');
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <img src={logo} width={180} height={55} alt="DCISM-logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item leftest">
                <button
                  className={`text-primary nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleTabClick('home')}
                >
                  <BsHouse />
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`text-primary nav-link ${activeTab === 'equipments' ? 'active' : ''}`}
                  onClick={handleEquipmentsClick}
                >
                  <BsFillDisplayFill />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {activeTab === 'home' ? (
        <ReqBorrower />
      ) : activeTab === 'equipments' ? (
        <DisplayBorrower />
      ) : null}
    </div>
  );
};

export default NavbarSignedOut;
