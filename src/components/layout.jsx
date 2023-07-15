import React from 'react';
import '../styles/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ navbar, display, home }) => {
  return (
    <div className="layout">
      <div className="navbar">{navbar}</div>
      {/* <div className="display">{display}</div>  */}
      <div className="home">{home}</div> 
    </div>
  );
};

export default Layout;