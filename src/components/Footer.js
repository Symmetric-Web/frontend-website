import React, { useState } from 'react';
import './Footer.css';
import { FaFacebook, FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const scriptURL = "https://script.google.com/macros/s/AKfycbwOO6giPyd2B7fDb2Leas10Ag80APvA27kgiqS4XcRStKU_PEkBhUjMMRUO2XMTEvxo/exec";
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    const final_form = JSON.stringify(Object.fromEntries(form.entries()));
    console.log("final_form: ", final_form);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: final_form
      });
      if (response.type === "opaque") {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error!", error.message);
      setStatus("error");
    }
  };

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
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Contact Number" value={formData.phone} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit">Send Message</button>
          </form>
          {status === "sending" && <p>Please wait, submitting your request...</p>}
          {status === "success" && <p>Your data has been sent. Thank you!</p>}
          {status === "error" && <p>There was an error submitting the form. Please try again later.</p>}
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
            <a href="https://maps.app.goo.gl/ny2q9H5yJYeVy4RM6" target="_blank" rel="noopener noreferrer">
              308, De-Elmas Premises. Sonawala Cross Lane No.2, <br /> Goregoan East, Mumbai -400063
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
      <div className="footer-bottom">
        <div className="footer-branding">
          <img src="/images/Logo/Symm Logo.png" alt="Symmetric IT Services" className="footer-logo" />
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
          <a href="https://www.facebook.com/symmetricsols/" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://wa.me/919820053236" className="social-icon" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://www.linkedin.com/company/symmetric-it-services/" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/symmetric_it_services/" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
