import React, { useState } from 'react';
import { Login } from '../login/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReqBorrower from '../request/reqborrower.jsx';
import DisplayBorrower from '../equipment/displayborrower.jsx';
import './navbar.css';

import { BsHouse } from 'react-icons/bs';
import { BsFillDisplayFill } from 'react-icons/bs';
import { BsGrid1X2Fill } from 'react-icons/bs';
import logo from '../../images/DCISM.png'

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
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light custom-navbar">
          <img src={logo} width="200" height="40" alt="DCISM-logo" />
          <div className="ml-auto" id="navbarNav">
            <ul className="nav navbar-default">
              <li className="nav-item">
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
      </nav>

      {activeTab === 'home' ? (
        <ReqBorrower />
      ) : activeTab === 'equipments' ? (
        <DisplayBorrower />
      ) : null}
    </>
  );
};

export default NavbarSignedOut;
