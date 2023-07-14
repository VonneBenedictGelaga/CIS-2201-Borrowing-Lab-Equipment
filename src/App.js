import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from "react";

import Layout from  "./components/layout";
import Navbar from "./components/navbar"
import MainPage from "./components/main"
import Sidebar from "./components/sidebar"

const App = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });

    return () => {
      unsubscribe(); // Cleanup the event listener on unmount
    };
  }, []);

  return (
    <Layout
      navbar={<Navbar isSignedIn={isSignedIn} />}
      sidebar={<Sidebar user={user} />}
      main={<MainPage isSignedIn={isSignedIn} />}
    />
  );
};

export default App;