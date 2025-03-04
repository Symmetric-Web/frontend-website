import React from 'react';
import './Contact.css';

const Contact = () => {
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
          </div>
          <div className="contact-image">
            <img src="/images/Contact us.webp" alt="Contact Us" loading="eager" width="800" height="400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;