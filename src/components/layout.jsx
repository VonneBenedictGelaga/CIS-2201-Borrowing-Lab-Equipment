import React from 'react';
// import '../styles/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ navbar, display, equipmentborrower, reqborrower }) => {
  return (
    <div className="layout">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">{navbar}</nav>
      {/* <div className="display">{display}</div>  */}
      {/* <div className="equipmentborrower">{equipmentborrower}</div>  */}
      <main className="">{reqborrower}</main> 

    </div>
  );
};

export default Layout;