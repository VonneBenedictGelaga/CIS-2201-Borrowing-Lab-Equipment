import React from 'react';
import Layout from  "./components/layout";
import Navbar from "./components/navbar"
import MainPage from "./components/main"
import Sidebar from "./components/sidebar"

const App = () => {
  return (
    //<div className='App'><Login/></div>
    <Layout
      navbar={<Navbar />}
      display={<Display />}
      home={<Display />}
    />
  );
};

export default App;
