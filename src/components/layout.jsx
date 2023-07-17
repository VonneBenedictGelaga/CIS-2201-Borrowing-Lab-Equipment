import React from 'react';
import '../styles/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ navbar, display, equipmentborrower, reqborrower }) => {
  return (
    <div className="layout">
      <div className="navbar">{navbar}</div>
      {/* <div className="display">{display}</div>  */}
      {/* <div className="equipmentborrower">{equipmentborrower}</div>  */}
      <div className="reqborrower">{reqborrower}</div> 

    </div>
  );
};

export default Layout;