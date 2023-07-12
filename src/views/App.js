import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

//Layouts
import NavbarBorrower from './layouts/navbarBorrower';

const App = () => {
  return (
    <div>
      <NavbarBorrower>
        <button className="btn btn-primary">Click me</button>
      </NavbarBorrower>
    </div>
  );
  
};

export default App;