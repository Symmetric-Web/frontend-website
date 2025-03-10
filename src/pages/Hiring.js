import React, { useState } from 'react';
import './Hiring.css';

const Hiring = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '0'
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
    if (!formData.education.trim()) newErrors.education = 'Educational qualification is required';
    if (!formData.experience) newErrors.experience = 'Years of experience is required';

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus({ status: 'sending', message: 'Please wait, submitting your application...' });
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      const final_form = JSON.stringify(Object.fromEntries(form.entries()));
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxrtFMF1RA74BJ3fzkqzTzzjNFQbizVqgngw5MMnCIO9zn1QZOOgzSIigdwNOZ-UZnz/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: final_form
        });
        if (response.type === "opaque") {
          setSubmitStatus({
            status: 'success',
            message: 'Thank you for your application! We will get back to you soon.'
          });
          setFormData({
            name: '',
            email: '',
            phone: '',
            education: '',
            experience: '0'
          });
        }
      } catch (error) {
        console.error("Error!", error.message);
        setSubmitStatus({
          status: 'error',
          message: 'There was an error submitting your application. Please try again later.'
        });
      }
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
                <label htmlFor="education">Educational Qualification</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={errors.education ? 'error' : ''}
                />
                {errors.education && <span className="error-message">{errors.education}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={errors.experience ? 'error' : ''}
                >
                  {[...Array(21)].map((_, i) => (
                    <option key={i} value={i}>{i} years</option>
                  ))}
                  <option value=">30">&gt;20 years</option>
                </select>
                {errors.experience && <span className="error-message">{errors.experience}</span>}
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