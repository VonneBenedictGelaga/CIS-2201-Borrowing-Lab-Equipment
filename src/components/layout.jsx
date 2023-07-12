import React from 'react';
import '../styles/layout.css';

const Layout = ({ navbar, sidebar, main }) => {
  return (
    <div className="layout">
      <div className="navbar">{navbar}</div>
      <div className="sidebar">{sidebar}</div>
      <div className="main">{main}</div>
    </div>
  );
};

export default Layout;