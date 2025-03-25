import React from 'react';
import './Solutions.css';

const AVAutomationSolutions = () => {
  const avAutomationSolutions = [
    {
      title: "AUDITORIUM",
      description: "Auditorium Solution",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/Auditorium Solution.webp",
      benefits: [
        "Advanced audio systems",
        "High-brightness projection",
        "Stage lighting control",
        "Interactive presentation tools"
      ]
    },
    {
      title: "TRAINING",
      description: "AV Integrated Training Rooms",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/AV Integrated Training Room.webp",
      benefits: [
        "Interactive displays",
        "Student response systems",
        "Recording capabilities",
        "Collaborative tools"
      ]
    },
    {
      title: "CONFERENCE",
      description: "Boardroom / Conference Rooms",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/Boardroom_Conference Rooms.webp",
      benefits: [
        "Video conferencing systems",
        "Wireless presentation",
        "Room automation",
        "Audio optimization"
      ]
    },
    {
      title: "TOWN HALL",
      description: "Cafeteria and Town Hall Solutions",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/Cafeteria and town halls.webp",
      benefits: [
        "Large-scale displays",
        "Distributed audio",
        "Event management",
        "Multi-zone control"
      ]
    },
    {
      title: "HUDDLE",
      description: "Collaborative Huddle Rooms",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/collaborative Huddle rooms.webp",
      benefits: [
        "Compact AV solutions",
        "Wireless connectivity",
        "Interactive displays",
        "Easy-to-use interface"
      ]
    },
    {
      title: "HYBRID",
      description: "Hybrid Collaboration Rooms",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/hybrid collaboration rooms.webp",
      benefits: [
        "Remote collaboration tools",
        "Smart camera systems",
        "Integrated audio",
        "Content sharing"
      ]
    },
    {
      title: "VIDEO CONFERENCING",
      description: "Understanding Video Conferencing",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/video conferencing rooms.webp",
      benefits: [
        "HD video quality",
        "Clear audio pickup",
        "Network optimization",
        "Meeting management"
      ]
    },
    {
      title: "MULTIPURPOSE",
      description: "Multi-purpose Rooms",
      image: "/images/Solutions/AV and Automation Solution/Video collaboration/multipurpose rooms.webp",
      benefits: [
        "Flexible configurations",
        "Scalable solutions",
        "Multiple use cases",
        "Easy reconfiguration"
      ]
    },
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
                {solution.image && (
                  <div className="solution-image">
                    <img src={solution.image} alt={solution.title} />
                  </div>
                )}
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