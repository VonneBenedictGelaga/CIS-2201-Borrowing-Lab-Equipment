<<<<<<< HEAD
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from "react";

import Layout from  "./components/layout";
import Navbar from "./components/navbar";
import MainPage from "./components/main";
=======
import React from 'react'
import Layout from  "./components/layout"
import Navbar from "./components/navbar"
import MainPage from "./components/main"
import Sidebar from "./components/sidebar"
import Display from "./components/display"
import Equipment from './components/equipment'
import DisplayBorrower from './components/displayborrower'
import ReqBorrower from './components/reqborrower'
import Request from './components/request'
import AccSettings from './components/accsettings'

import Login from './components/login/login';
import RequestBorrower from './components/reqborrower'
>>>>>>> f1c24b278bdbd51c52dbecc9a280c3b121fb9cd6

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
<<<<<<< HEAD
      navbar={<Navbar isSignedIn={isSignedIn} />}
      main={<MainPage isSignedIn={isSignedIn} />}
=======
      navbar={<Navbar />}
      display={<Equipment />}
      // equipmentborrower={<EquipmentBorrower />}
      reqborrower={<Request />}
>>>>>>> f1c24b278bdbd51c52dbecc9a280c3b121fb9cd6
    />
  );
};

export default App;