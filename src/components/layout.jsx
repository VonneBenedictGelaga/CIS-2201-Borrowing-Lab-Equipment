import React from 'react';
import '../styles/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ navbar, main }) => {
  return (
    <div className="layout">
      <div className="main">{main}</div>
    </div>
  );
};

export default Layout;
