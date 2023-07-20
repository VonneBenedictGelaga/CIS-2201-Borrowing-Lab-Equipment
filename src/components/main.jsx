import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Dashboard } from './dashboard/dashboard.jsx';
import { Home } from './landing/home.jsx';
import { Login } from './login/login.jsx';
import  RequestBorrower  from './request/reqborrower.jsx';

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
});

const MainPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
          {isSignedIn ? (
            <Dashboard />
          ) : showLogin ? (
            <Login />
          ) : (
            <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
              <Home handleSignInClick={handleSignInClick} />
            </div>
            <div style={{ flex: '1' }}>
              <RequestBorrower />
            </div>
          </div>
          )}
        
    </main>
  );
};

export default MainPage;