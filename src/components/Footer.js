import React from 'react';
import './Footer.css';
import { FaFacebook, FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="map-section">
          <h2>Location</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7433.786492518182!2d72.84753226504!3d19.1611140866208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b766d3610ed7%3A0xa9e82e1b65ec5e7d!2sSymmetric%20IT%20Services!5e0!3m2!1sen!2sin!4v1740727335898!5m2!1sen!2sin"
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Symmetric IT Services Location"
          />
        </div>
        <div className="contact-form-section">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Contact Number" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div className="footer-info">
        <div className="info-item">
          <div className="icon">📞</div>
          <div className="text">
            <span>Phone:</span>
            <a href="tel:+91-9820053236">+91-9820053236</a>
          </div>
        </div>

        <div className="info-item">
          <div className="icon">📍</div>
          <div className="text">
            <span>Address</span>
            <a 
              href="https://maps.app.goo.gl/ny2q9H5yJYeVy4RM6"
              target="_blank"
              rel="noopener noreferrer"
            >
              308,De-Elmas Premises. Sonawala Cross Lane No.2, <br></br>Goregoan East, Mumbai -400063
            </a>
          </div>
        </div>

        <div className="info-item">
          <div className="icon">🕒</div>
          <div className="text">
            <span>Work time</span>
            <p>Monday to Saturday 10 AM to 6.30 PM</p>
          </div>
        </div>
        
      </div>
      <div>
        <br>
        </br>
      </div>

      <div className="footer-bottom">
        <div className="footer-branding">
          <img src="/images/Logo/Symm Logo.webp" alt="Symmetric IT Services" className="footer-logo" loading="lazy" width="200" height="60" />
          <p className="footer-tagline">
            We Help Companies To Build Their<br />
            <span className="highlight">Technology Infrastructure And Provide</span>
            <span className="highlight">Hassle Free Smart Solutions</span>
          </p>
        </div>
        <div className="newsletter-section">
          <h2>Newsletter</h2>
          <p>Don't miss our future updates!</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your mail here" />
            <button type="button" aria-label="Subscribe">
              <FaEnvelope />
            </button>
          </div>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/symmetricsols/" 
            className="social-icon" 
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a href="https://wa.me/919820053236" 
            className="social-icon" 
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a href="https://www.linkedin.com/company/symmetric-it-services/" 
            className="social-icon" 
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/symmetric_it_services/" 
            className="social-icon" 
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;