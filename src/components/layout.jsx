import React from 'react';
// import '../styles/layout.css';

const Layout = ({ navbar, sidebar, main}) => {
  return (
    <div className="layout">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">{navbar}</nav>
      <main className="">{main}</main>
    </div>
  );
};

export default Layout;