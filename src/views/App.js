import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

//Layouts
import NavbarBorrower from './layouts/navbarBorrower';
import NavbarUser from './layouts/navbarUser';
import ViewRequests from './layouts/viewRequests'

const App = () => {
  return (
    <>
      <NavbarUser />
      <ViewRequests />
    </>
  );
  
};

export default App;