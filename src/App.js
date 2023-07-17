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

const App = () => {
  return (
    //<div className='App'><Login/></div>
    <Layout
      navbar={<Navbar />}
      display={<Equipment />}
      // equipmentborrower={<EquipmentBorrower />}
      reqborrower={<ReqBorrower />}
    />
  );
};

export default App;
