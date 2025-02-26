import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setSolutionsOpen] = useState(false);

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
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <div 
              className="nav-item dropdown"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <span>Our Products</span>
              {isProductsOpen && (
                <div className="dropdown-content">
                  <Link to="/networking">Networking Solutions</Link>
                  <Link to="/building-tech">Building Technologies</Link>
                  <Link to="/audio-visual">AV and Automation Solutions</Link>
                </div>
              )}
            </div>
          </li>
          <li className="nav-item">
            <Link to="/solutions" className="nav-link">
              Our Solutions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/case-study" className="nav-link">
              Case Study
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">
              Blog
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
};

export default Navbar; 