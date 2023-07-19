import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../../config/firebase.js";
import './navbar.css';
import logo from '../../images/DCISM.png';

import { BsBoxArrowRight } from "react-icons/bs";
import { BsColumnsGap } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { BsDisplay } from "react-icons/bs";
import { BsInboxFill } from "react-icons/bs";

import Dashboard from '../dashboard/dashboard.jsx';
import Display from '../equipment/display.jsx';
import Equipments from '../equipment/equipment.jsx';
import Requests from '../request/request.jsx';
import ReleaseForm from '../release/releaseform.jsx';

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
    <nav className="navbar navbar-expand-sm navbar-light bg-light custom-navbar">
      <img src={logo} alt="Logo" width="200" height="40" />

      <div className="ml-auto"> {/* Add this div to push the content to the right */}
        <ul className="nav navbar-default">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleTabClick('dashboard')}
            >
              <BsColumnsGap />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'equipments' ? 'active' : ''}`}
              onClick={() => handleTabClick('equipments')}
            >
              <BsPlusCircle />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'display' ? 'active' : ''}`}
              onClick={() => handleTabClick('display')}
            >
              <BsDisplay />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => handleTabClick('requests')}
            >
              <BsInboxFill />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'releaseform' ? 'active' : ''}`}
              onClick={() => handleTabClick('releaseform')}
            >
              <BsInboxFill />
            </button>
          </li>
        </ul>
      </div>

      <ul className="nav navbar-nav right">
        <li className="nav-item">
          <a className="nav-link" onClick={handleSignOutClick}>
            <BsBoxArrowRight />
          </a>
        </li>
      </ul>
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
        ) : activeTab === 'releaseform' ? (
          <ReleaseForm />
      ) : null}
    </>
  );
};

export default NavbarSignedIn;

