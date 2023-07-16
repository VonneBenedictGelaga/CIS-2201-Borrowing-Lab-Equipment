import React, { useState } from 'react';
import Layout from './components/layout';
import MainPage from './components/main';
import Sidebar from './components/sidebar';
import Display from './components/display';
import Equipment from './components/equipment';
import DisplayBorrower from './components/displayborrower';
import ReqBorrower from './components/reqborrower';
import Request from './components/request';

import SignedOut from './components/navbar/signedout';
import Login from './components/login/login';

const App = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = (email) => {
    setUser({ email: email });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <Layout
      navbar={<SignedOut />}
      reqborrower={user ? <MainPage /> : <Login onSignIn={handleSignIn} />}
    />
  );
};

export default App;
