import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Login } from './login/login.jsx';
import DisplayBorrower from './equipment/displayborrower.jsx';
import NavbarSignedOut from './navbar/signedout.jsx';
import NavbarSignedIn from './navbar/signedin.jsx';

import Dashboard from './dashboard/dashboard.jsx';
import Display from './equipment/equipment.jsx'; 
import Equipments from './equipment/display.jsx';
import Requests from './request/request.jsx';

// import { generateReleaseFormID } from "./release/releaseform.js";
import { getDocumentsWithReleaseFormID } from './release/getallreleaseform.js'

const auth = getAuth();
onAuthStateChanged(auth, (user) => {});

const MainPage = () => {

  // const documentId = 'ZzAH9A68I6srEiNYhQTs';
  // const borrowerType = 'student';
  // generateReleaseFormID(documentId, borrowerType);

  getDocumentsWithReleaseFormID();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  

  return (
    <main>
      {/* Conditionally render the appropriate navbar */}
      {isSignedIn ? (
        <NavbarSignedIn activeTab={activeTab} handleTabClick={handleTabClick} />
      ) : (
        <NavbarSignedOut activeTab={activeTab} handleTabClick={handleTabClick} />
      )}

      {/* Render content based on the active tab and user sign-in status */}
      {isSignedIn ? (
        <>
          {activeTab === 'equipments' && <Equipments />}
          {activeTab === 'display' && <Display />}
          {activeTab === 'requests' && <Requests />}
        </>
      ) : (
        <>
          {activeTab === 'equipments' && <DisplayBorrower />}
        </>
      )}
    </main>
  );
};

export default MainPage;


