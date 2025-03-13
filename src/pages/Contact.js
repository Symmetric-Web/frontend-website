import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-content">
          <div className="contact-text">
            <h1>Get in Touch</h1>
            <p>
              We'd love to hear from you. Whether you have a question about our services, 
              need a custom solution, or want to discuss your project requirements, 
              our team is ready to help you.
            </p>
            <p>
              At Symmetric IT, we believe in building lasting relationships with our clients. 
              Reach out to us today and let's discuss how we can help transform your 
              business with our innovative technology solutions.
            </p>
            <div className="contact-buttons">
              <button 
                className="contact-button join-team"
                onClick={() => navigate('/hiring')}
              >
                Join Our Team
                <span className="button-description">Explore Career Opportunities</span>
              </button>
              <button 
                className="contact-button customer-support"
                onClick={() => {
                  const contactForm = document.querySelector('.contact-form-section');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Customer Support
                <span className="button-description">Get Help with Our Products</span>
              </button>
            </div>
          </div>
          <div className="contact-image">
            <img src="/images/Contact us.webp" alt="Contact Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;