import React from 'react';
import Layout from './components/layout';
import Navbar from './components/navbar';
import Display from './components/display';
import Equipment from './components/equipment';

const App = () => {
  return (
    <Layout
      navbar={<Navbar />}
      display={<Display />}
      equipment={<Equipment />}
    />
  );
};

export default App;
