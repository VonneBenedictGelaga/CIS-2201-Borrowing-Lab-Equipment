import React from 'react';
//import { Login } from "./components/login/login.jsx"
import Layout from  "./components/layout";
import Navbar from "./components/navbar"
import MainPage from "./components/main"
import Sidebar from "./components/sidebar"
import Dashboard from "./components/dashboard/dashboard.jsx"

const App = () => {
  return (
    //<div className='App'><Login/></div>
    <Layout
      navbar={<Navbar />}
      sidebar={<Sidebar />}
      main={<Dashboard />}
    />
  );
};

export default App;