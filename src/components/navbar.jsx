import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase.js'
import NavbarSignedIn from './navbar/signedin.jsx';
import NavbarSignedOut from './navbar/signedout.jsx';

const Navbar = ({}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(user ? true : false);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const handleEquipmentsClick = () => {
    // Logic to handle the click event when the "Equipments" button is clicked
  };

  const handleDashboardClick = () => {
    // Logic to handle the click event when the "Dashboard" button is clicked
  };

  const handleRequestsClick = () => {
    // Logic to handle the click event when the "Requests" button is clicked
  };

  const handleSettingsClick = () => {
    // Logic to handle the click event when the "Settings" button is clicked
  };

  const handleSignOutClick = () => {
    // Logic to handle the click event when the "Sign Out" button is clicked
  };

  return (
    <div className='container-fluid' >
      {isSignedIn ? (
        <NavbarSignedIn
          handleDashboardClick={handleDashboardClick}
          handleRequestsClick={handleRequestsClick}
          handleEquipmentsClick={handleEquipmentsClick}
          handleSettingsClick={handleSettingsClick}
          handleSignOutClick={handleSignOutClick}
        />
      ) : (
        <NavbarSignedOut handleEquipmentsClick={handleEquipmentsClick} />
      )}
    </div>
  );
};

export default Navbar;