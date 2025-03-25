import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsProductsOpen(false);
      setIsSolutionsOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsSolutionsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/images/logo/Symm Logo.webp" alt="Symmetric IT Services" />
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
              <Link to="/networking">Networking Products</Link>
              <Link to="/building-tech">Building Technologies</Link>
              <Link to="/audio-visual">AV and Automation Products</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <span>Our Solutions</span>
            <div className="dropdown-content">
              <Link to="/networking-solutions">Networking Solutions</Link>
              <Link to="/building-tech-solutions">Building Technology Solutions</Link>
              <Link to="/av-automation-solutions">AV & Automation Solutions</Link>
            </div>
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
                  Networking Products
                </Link>
                <Link to="/building-tech" onClick={closeMenu}>
                  Building Technology Products
                </Link>
                <Link to="/audio-visual" onClick={closeMenu}>
                  AV and Automation Products
                </Link>
              </div>
            </div>

            <div className="menu-item dropdown">
              <button 
                className="dropdown-toggle"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              >
                Our Solutions
                <span className={`arrow ${isSolutionsOpen ? 'open' : ''}`}>▼</span>
              </button>

              <div className={`dropdown-menu ${isSolutionsOpen ? 'open' : ''}`}>
                <Link to="/networking-solutions" onClick={closeMenu}>
                  Networking Solutions
                </Link>
                <Link to="/building-tech-solutions" onClick={closeMenu}>
                  Building Technology Solutions
                </Link>
                <Link to="/av-automation-solutions" onClick={closeMenu}>
                  AV & Automation Solutions
                </Link>
              </div>
            </div>

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