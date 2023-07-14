import React, {useState} from 'react';
import { Login } from '../login/login.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarSignedOut = ({ handleEquipmentsClick, children  }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">My App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Equipments</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"  href="#" onClick={handleSignInClick}>Sign In</a>
              </li>
            </ul>
          </div>
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
    </div>
  );
};

export default NavbarSignedOut;