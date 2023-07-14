import React from 'react';
import Layout from './components/layout';
import Navbar from './components/navbar';
import Display from './components/display';
import Equipment from './components/equipment';
import Request from './components/request';
import Accsettings from './components/accsettings';
import Home from './components/home';

const App = () => {
  return (
    <Layout
      navbar={<Navbar />}
      display={<Display />}
      home={<Display />}
    />
  );
};

export default App;
