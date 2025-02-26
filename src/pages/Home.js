import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import './Home.css';
import { SuccessStoriesCarousel } from '../components/SuccessStoriesCarousel';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Suresh Kamath",
    position: "CEO",
    image: "images/team/Suresh Kamath.webp",
    description: "20+ years of experience in technology solutions"
  },
  {
    id: 2,
    name: "Vandana Kamath",
    position: "CTO",
    image: "/images/team/Vandana Kamath.webp",
    description: "Finance"
  },
  {
    id: 3,
    name: "Devendra More",
    position: "Technical Director",
    image: "/images/team/Devendra.webp",
    description: "Complex Projects"
  },
  {
    id: 4,
    name: "Prajakta",
    position: "Operations Manager",
    image: "/images/team/Prajakta.webp",
    description: "Project Management"
  }
];

function Home() {
  const scrollToServices = (e) => {
    e.preventDefault();
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="logo-small">Powering Tomorrow</div>
            <h1>Symmetric IT<br /> Services</h1>
            <p className="hero-description">
              Our commitment to innovative technology solutions is paving the way for a smarter, 
              more connected future. Join us on a journey towards transforming the way businesses operate.
            </p>
            <div className="hero-buttons">
              <a href="#services" onClick={scrollToServices} className="btn btn-primary">Our services</a>
              <Link to="/contact" className="btn btn-secondary">Get in touch</Link>
            </div>
          </div>
          <div className="hero-images">
            <div className="image-grid">
              <div className="image-item">
                <img src="/images/home/Networking.png" alt="Networking" />
                <div className="image-overlay">
                  <h3>Networking Solutions</h3>
                </div>
              </div>
              <div className="image-item">
                <img src="images/home/Building Technology.png" alt="Building Tech" />
                <div className="image-overlay">
                  <h3>Building Technologies</h3>
                </div>
              </div>
              <div className="image-item">
                <img src="images/home/home automation.jpeg" alt="Automation" />
                <div className="image-overlay">
                  <h3>Home Automation</h3>
                </div>
              </div>
              <div className="image-item">
                <img src="images/home/AV solutions.png" alt="AV Solutions" />
                <div className="image-overlay">
                  <h3>AV Solutions</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About us</h2>
              <p>At Symmetric IT Services, we're committed to delivering cutting-edge technology solutions. As a pioneering force in the IT sector, we've been at the forefront of digital transformation. Our mission is simple yet profound: to create innovative solutions that empower businesses to thrive in the digital age.</p>
            </div>
            <div className="about-stats">
              <div className="stat-grid">
                <div className="stat-item">
                  <h3>
                    <CountUp
                      end={500}
                      suffix="+"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>
                    <CountUp
                      end={100}
                      suffix="+"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </h3>
                  <p>Active Clients</p>
                </div>
                <div className="stat-item">
                  <h3>
                    <CountUp
                      end={15}
                      suffix="+"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat-item">
                  <h3>
                    <CountUp
                      end={98}
                      suffix="%"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </h3>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <Link to="/networking" className="service-card">
              <div className="service-image">
                <img src="/images/home/Services/Networking Solutions.png" alt="Networking Solutions" />
              </div>
              <div className="service-content">
                <h3>Networking Solutions</h3>
                <p>Comprehensive networking infrastructure solutions including design, implementation, and maintenance of secure and scalable networks.</p>
                <span className="learn-more">Learn More →</span>
              </div>
            </Link>
            <Link to="/building-tech" className="service-card">
              <div className="service-image">
                <img src="/images/home/Services/Building Technologies.png" alt="Building Technologies" />
              </div>
              <div className="service-content">
                <h3>Building Technologies</h3>
                <p>Smart building solutions integrating security, automation, and energy management systems for modern infrastructure.</p>
                <span className="learn-more">Learn More →</span>
              </div>
            </Link>
            <Link to="/audio-visual" className="service-card">
              <div className="service-image">
                <img src="/images/home/Services/Audio-Visual and Automation Solutions.png" alt="Audio-Visual Solutions" />
              </div>
              <div className="service-content">
                <h3>AV and Automation Solutions</h3>
                <p>State-of-the-art AV systems and automation solutions for enhanced communication and control.</p>
                <span className="learn-more">Learn More →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="leadership">
        <div className="container">
          <h2>Leadership Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <h4>{member.position}</h4>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <SuccessStoriesCarousel />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Contact Number" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home; 