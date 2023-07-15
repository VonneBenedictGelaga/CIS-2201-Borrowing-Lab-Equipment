import React from 'react'
import Layout from  "./components/layout"
import Navbar from "./components/navbar"
import MainPage from "./components/main"
import Sidebar from "./components/sidebar"
import Display from "./components/display"
import Equipment from './components/equipment'

import Login from './components/login/login';

const App = () => {
  return (
    //<div className='App'><Login/></div>
    <Layout
      navbar={<Navbar />}
      display={<Equipment />}
      home={<Display />}
    />
  );
};

export default App;
