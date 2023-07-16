import React from 'react';
import '../styles/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ navbar, display, equipmentborrower, reqborrower }) => {
  return (
    <div className="layout">
      {navbar}
      <div className="reqborrower">{reqborrower}</div>
    </div>
  );
};

export default Layout;
