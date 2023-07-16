import React from 'react';
// import '../styles/layout.css';

const Layout = ({ navbar, main}) => {
  return (
    <div className="layout">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">{navbar}</nav>
      <main className="">{main}</main>
    </div>
  );
};

export default Layout;