import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

//Layouts
import NavbarBorrower from './layouts/navbarBorrower';
import NavbarUser from './layouts/navbarUser';

const App = () => {
  return (
    <div>
      <NavbarUser>
      </NavbarUser>
    </div>
  );
  
};

export default App;