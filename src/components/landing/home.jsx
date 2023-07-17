import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Login } from '../login/login'

import USClogo from '../../images/University_of_San_Carlos_logo.png';

export const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div>
        <div className="gray-container">
          <img src={USClogo} alt="USC Logo" className="usc-logo" /> {/* Add the USC logo */}
          <h1 className="title">LAB EQUIPMENT BORROWING MODULE</h1>
          <h6 className="titlechild">
            <span onClick={handleLoginClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            USC staff? Sign in here.
            </span>
          </h6>
        </div>
      {showLogin && <Login />} {/* Render the Login component if showLogin is true */}
    </div>
  );
};

