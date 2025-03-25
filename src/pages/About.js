import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="text-content">
              <h1>ABOUT US</h1>
              <h2 className="headline">Helping businesses succeed through innovative technology solutions.</h2>
              <p className="description">
                Technology is the future of business in this digital-focused world. 
                Symmetric IT uses innovative solutions to change the way companies connect and 
                communicate. We help organizations of all sizes modernize their infrastructure 
                and enhance their operational efficiency.
              </p>
            </div>
            <div className="image-content">
              <div className="image-wrapper">
                <img src="/images/about us/Meeting.webp" alt="About Symmetric IT" />
                {/* <div className="shape-overlay"></div> */}
                <div className="dots-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-mission-section">
        <div className="container">
          <div className="vision-mission-content">
            <div className="text-content">
              <div className="vision-block">
                <h3>Our Vision</h3>
                <p>
                  Our Vision is to be the Premier provider of Innovative and comprehensive 
                  Technology Solutions that empower our clients to achieve their goals and 
                  stay ahead of the curve.
                </p>
              </div>
              <div className="mission-block">
                <h3>Our Mission</h3>
                <p>
                  Our Mission is to deliver exceptional engineering, procurement and 
                  Integration services that drive our client's success. Our Industry 
                  expertise and Innovative Technology Solutions empower clients to achieve 
                  new levels of Efficiency, Productivity and Growth.
                </p>
              </div>
            </div>
            <div className="image-content">
              <img src="/images/about us/Vision.svg" alt="Vision and Mission" />
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <div className="process-grid">
            <div className="process-item">
              <div className="process-icon">
                <img src="/images/about us/process/Discuss Pain Area.webp" alt="Discuss Pain Area" />
              </div>
              <h3>Discuss Pain Area</h3>
            </div>

            <div className="process-item">
              <div className="process-icon">
                <img src="/images/about us/process/Solution and BOQ Design.webp" alt="Solution & BOQ Design" />
              </div>
              <h3>Solution & BOQ Design</h3>
            </div>

            <div className="process-item">
              <div className="process-icon">
                <img src="/images/about us/process/BOQ Enhancement and Optimization.webp" alt="BOQ Enhancement" />
              </div>
              <h3>BOQ Enhancement and Optimization</h3>
            </div>

            <div className="process-item">
              <div className="process-icon">
                <img src="/images/about us/process/Customer Order Supply.webp" alt="Customer Order Supply" />
              </div>
              <h3>Customer Order Supply</h3>
            </div>

            <div className="process-item">
              <div className="process-icon">
                <img src="/images/about us/process/Planning and Scheduling.webp" alt="Planning & Scheduling" />
              </div>
              <h3>Planning & Scheduling</h3>
            </div>

            <div className="process-item">
              <div className="process-icon">
                <img src="/images/about us/process/signoff and handover.webp" alt="Sign-off & Handover" />
              </div>
              <h3>Sign-off & Handover</h3>
            </div>

            
          </div>
        </div>
      </section>


      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Methodology</h2>
          <div className="methodology-grid">
            <div className="methodology-item">
              <div className="methodology-icon">
                <img src="/images/about us/Methodology/Discover.webp" alt="Discover" />
              </div>
              <h2>Discover</h2>
              <p>We make an effort to comprehend your problems and how we might assist.</p>
            </div>

            <div className="methodology-item">
              <div className="methodology-icon">
                <img src="/images/about us/Methodology/Integrate.webp" alt="Integrate" />
              </div>
              <h2>Integrate</h2>
              <p>Integrate technology from several domains to provide new and value-added solutions.</p>
            </div>

            <div className="methodology-item">
              <div className="methodology-icon">
                <img src="/images/about us/Methodology/manage.webp" alt="Manage" />
              </div>
              <h2>Manage</h2>
              <p>We oversee your technology infrastructure, guaranteeing 24x7 seamless delivery by maintaining uptime, swift response times, and satisfactory issue resolution.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section" id="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="team-grid">
            <div className="team-item">
              <img src="/images/about us/why symmetric.webp" alt="why symmetric" />
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;