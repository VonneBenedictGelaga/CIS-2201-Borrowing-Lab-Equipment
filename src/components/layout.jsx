import React from 'react';
import '../styles/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

<<<<<<< HEAD
const Layout = ({ navbar, main }) => {
  return (
    <div className="layout">
      <nav className="navbar">{navbar}</nav>
      <div className="main">{main}</div>
=======
const Layout = ({ navbar, display, equipmentborrower, reqborrower }) => {
  return (
    <div className="layout">
      <div className="navbar">{navbar}</div>
      {/* <div className="display">{display}</div>  */}
      {/* <div className="equipmentborrower">{equipmentborrower}</div>  */}
      <div className="reqborrower">{reqborrower}</div> 

>>>>>>> f1c24b278bdbd51c52dbecc9a280c3b121fb9cd6
    </div>
  );
};

export default Layout;