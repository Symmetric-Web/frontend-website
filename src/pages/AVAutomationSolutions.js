import React from 'react';
import './Solutions.css';

const AVAutomationSolutions = () => {
  const avAutomationSolutions = [
    {
      title: "Conference Room Solutions",
      description: "State-of-the-art audiovisual solutions for modern conference rooms and meeting spaces.",
      benefits: [
        "Video conferencing systems",
        "Interactive displays",
        "Room scheduling",
        "Wireless presentation"
      ]
    },
    {
      title: "Home Automation",
      description: "Smart home automation solutions for enhanced comfort, security, and entertainment.",
      benefits: [
        "Voice control integration",
        "Smart lighting control",
        "Climate automation",
        "Entertainment systems"
      ]
    },
    {
      title: "Digital Signage",
      description: "Dynamic digital signage solutions for effective communication and advertising.",
      benefits: [
        "Content management system",
        "Remote management",
        "Interactive displays",
        "Multi-location control"
      ]
    }
  ];

  return (
    <div className="solutions-page">
      <section className="hero-title-section">
        <div className="container">
          <h1>AV & Automation Solutions</h1>
          <p className="hero-description">
            Cutting-edge audiovisual and automation solutions that create immersive, 
            interactive, and efficient environments. From conference rooms to complete 
            building automation, we deliver seamless integration of technology.
          </p>
        </div>
      </section>

      <section className="solutions-section">
        <div className="container">
          <div className="solutions-grid">
            {avAutomationSolutions.map((solution, index) => (
              <div className="solution-card" key={index}>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <div className="benefits">
                  <h4>Key Benefits:</h4>
                  <ul>
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AVAutomationSolutions; 