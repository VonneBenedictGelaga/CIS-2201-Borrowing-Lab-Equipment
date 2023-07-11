import React from 'react';
import '../App.css'; // Assuming you have a CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Layouts
import NavbarBorrower from './layouts/navbarBorrower';

//Images
import USChome from '../images/USChome.jpg';
import USClogo from '../images/University_of_San_Carlos_logo.png'; // Import the USC logo

const Home = () => {
    return (
      <div>
        <NavbarBorrower />
        <div style={{ backgroundImage: `url(${USChome})` }} className="background-image">
          <div className="gray-container">
            <img src={USClogo} alt="USC Logo" className="usc-logo" /> {/* Add the USC logo */}
            <h1 className="title">LAB EQUIPMENT BORROWING MODULE</h1>
            <h6 className="titlechild">USC staff? Sign in here.</h6>
          </div>
        </div>
      </div>
    );
  }; 

export default Home;

