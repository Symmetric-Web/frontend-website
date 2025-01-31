import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const scrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={scrollToTop}>
          <img src="/images/Logo/Symm Logo.png" alt="Company Logo" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={scrollToTop}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/networking" className="nav-link">
              Networking Solutions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/building-tech" className="nav-link">
              Building Technologies
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/audio-visual" className="nav-link">
              Audio-Visual and Automation Solutions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 