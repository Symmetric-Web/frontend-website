import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsProductsOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/images/Logo/Symm Logo.png" alt="Symmetric IT Services" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About Us</Link>
          </li>
          <li className="nav-item dropdown">
            <span>Our Products</span>
            <div className="dropdown-content">
              <Link to="/networking">Networking Solutions</Link>
              <Link to="/building-tech">Building Technologies</Link>
              <Link to="/audio-visual">AV and Automation Solutions</Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/solutions" className="nav-link">Our Solutions</Link>
          </li>
          <li className="nav-item">
            <Link to="/case-study" className="nav-link">Case Study</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link">Blog</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <button className="close-button" onClick={closeMenu}>
            ✕
          </button>

          <div className="menu-items">
            <Link to="/" className="menu-item" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/about" className="menu-item" onClick={closeMenu}>
              About Us
            </Link>

            <div className="menu-item dropdown">
              <button 
                className="dropdown-toggle"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                Our Products
                <span className={`arrow ${isProductsOpen ? 'open' : ''}`}>▼</span>
              </button>

              <div className={`dropdown-menu ${isProductsOpen ? 'open' : ''}`}>
                <Link to="/networking" onClick={closeMenu}>
                  Networking Solutions
                </Link>
                <Link to="/building-tech" onClick={closeMenu}>
                  Building Technologies
                </Link>
                <Link to="/audio-visual" onClick={closeMenu}>
                  AV and Automation Solutions
                </Link>
              </div>
            </div>

            <Link to="/solutions" className="menu-item" onClick={closeMenu}>
              Our Solutions
            </Link>

            <Link to="/case-study" className="menu-item" onClick={closeMenu}>
              Case Study
            </Link>

            <Link to="/blog" className="menu-item" onClick={closeMenu}>
              Blog
            </Link>

            <Link to="/contact" className="menu-item" onClick={closeMenu}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 