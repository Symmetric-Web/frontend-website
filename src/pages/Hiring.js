import React, { useState } from 'react';
import './Hiring.css';

const Hiring = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          resume: file
        }));
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF or image file'
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      setSubmitStatus({
        status: 'success',
        message: 'Thank you for your application! We will get back to you soon.'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null
      });
    }
  };

  return (
    <div className="hiring-page">
      <div className="container">
        <div className="hiring-content">
          <div className="hiring-text">
            <h1>Join Our Team</h1>
            <p>
              We're always looking for talented individuals to join our team. 
              If you're passionate about technology and innovation, we'd love to 
              hear from you.
            </p>
          </div>
          <div className="hiring-form-container">
            <form onSubmit={handleSubmit} className="hiring-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="resume">Upload Resume (PDF or Image)</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  className={errors.resume ? 'error' : ''}
                />
                {errors.resume && <span className="error-message">{errors.resume}</span>}
              </div>

              <button type="submit" className="submit-button">
                Submit Application
              </button>

              {submitStatus.message && (
                <div className={`submit-status ${submitStatus.status}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hiring;