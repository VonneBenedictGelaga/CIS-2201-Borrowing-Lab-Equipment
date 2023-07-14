import React from 'react';
import { Login } from "./components/login/login.jsx"
import Layout from  "./components/layout";
import Navbar from "./components/navbar"
import MainPage from "./components/main"


const App = () => {
  return (
    //<div className='App'><Login/></div>
    <Layout
      navbar={<Navbar />}
      main={<MainPage />}
      // login={<Login />}
    />
  );
};

export default App;