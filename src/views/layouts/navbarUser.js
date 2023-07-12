import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBoxArrowRight } from "react-icons/bs";
import logo from '../images/dcism-logo2.jpg'

const NavbarUser = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <img src={logo} alt="Logo" width="200" height="40"/>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">DASHBOARD</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">EQUIPMENTS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">REQUESTS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">SETTINGS</a>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#"><BsBoxArrowRight /></a>
            </li>
          </ul>

        </div>
      </nav>

      {/* Content */}
      <main>
        {children}
      </main>

      {/* Common footer */}
      <footer>
        {/* Footer content */}
      </footer>
    </>
  );
};

export default NavbarUser;
