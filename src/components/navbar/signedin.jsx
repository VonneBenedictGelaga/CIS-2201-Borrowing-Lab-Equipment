import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../../config/firebase.js";
import './navbar.css';
import logo from '../../images/DCISM.jpg';

import { BsBoxArrowRight } from "react-icons/bs";
import { FiBarChart2 } from 'react-icons/fi';
import { BsPlusCircle } from "react-icons/bs";
import { BsDisplay } from "react-icons/bs";
import { BsInboxFill } from "react-icons/bs";
import { BsArchiveFill } from "react-icons/bs";

import Dashboard from '../dashboard/dashboard.jsx';
import Display from '../equipment/display.jsx';
import Equipments from '../equipment/equipment.jsx';
import Requests from '../request/request.jsx';
import RequestArchive from '../request/requestarchive.jsx';

const NavbarSignedIn = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignOutClick = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item leftest">
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleTabClick('dashboard')}
              >
                <FiBarChart2  style={{ color: 'blue' }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'equipments' ? 'active' : ''}`}
                onClick={() => handleTabClick('equipments')}
              >
                <BsPlusCircle style={{ color: 'blue' }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'display' ? 'active' : ''}`}
                onClick={() => handleTabClick('display')}
              >
                <BsDisplay style={{ color: 'blue' }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => handleTabClick('requests')}
              >
                <BsInboxFill style={{ color: 'blue' }} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'requestarchive' ? 'active' : ''}`}
                onClick={() => handleTabClick('requestarchive')}
              >
                <BsArchiveFill style={{ color: 'blue' }} />
              </button>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={handleSignOutClick}>
                <BsBoxArrowRight style={{ color: 'blue' }} />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Render content based on the active tab */}
      {activeTab === 'dashboard' ? (
        <Dashboard />
      ) : activeTab === 'display' ? (
        <Display />
      ) : activeTab === 'equipments' ? (
        <Equipments />
      ) : activeTab === 'requests' ? (
        <Requests />
        ) : activeTab === 'requestarchive' ? (
        <RequestArchive />
      ) : null}
    </>
  );
};

export default NavbarSignedIn;

