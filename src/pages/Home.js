import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { SuccessStoriesCarousel } from '../components/SuccessStoriesCarousel';
import { motion, AnimatePresence } from 'framer-motion';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Suresh Kamath",
    position: "Founder and Director",
    image: "images/team/Suresh Kamath.png",
    description: "32+ years of experience in Data Networks",
    expandedDescription: `Mr. Suresh Kamath is a seasoned professional with over 32 years of experience in the field of Data Networks. He holds a Bachelor of Engineering in Electronics & Communication, achieved with first-class honors, along with a Diploma in Electronics and Telecommunication. Additionally, he is a Cisco Certified Network Associate (CCNA) and Cisco Certified Network Professional (CCNP).

    Mr. Suresh Kamath has undergone extensive training at BT University in Stone, Stafford, UK, and has participated in various training programs in Hong Kong, Singapore, and Australia, focusing on advanced technologies such as X25, Frame Relay, and MPLS. His expertise extends to operational efficiency, service delivery, and cross-functional management, where he effectively oversees technical, field support, and administrative teams. With strong customer service skills, he has a solid background in help desk functions and customer satisfaction programs.

    Notably, Mr. Kamath was one of the key implementers of India's first email network, "Sprintmail," for Sprint US. He also single-handedly deployed India's first Frame Relay network for British Telecom (BT) and successfully implemented an MPLS network for AT&T in Mumbai. His comprehensive understanding of enterprise environments spans telecom infrastructure to technology services, including WAN order processing, field and network installation, bid analysis and pricing, network management, project implementation, pre-sales support, and managing bilateral IPLC services.

    Achievements:
    Mr. Suresh Kamath has received numerous accolades throughout his career. He was nominated by British Telecom for the Best Customer Service Person Award for the Asia Pacific Region. In 1992, he received a recognition letter from CITIBANK for exemplary service during a bomb blast crisis in the Air India Building, Mumbai. In 1994, he was awarded the Champion of Champions Award by Sprint US for outstanding performance.

    He earned a cash award in Hong Kong from the British Telecom Head in Asia Pacific for executing the NEC project in record time. Additionally, he received a cash prize from British Telecom for implementing Frame Relay circuits for British Airways before Node installation. Mr. Kamath also earned an appreciation certificate from the Vice President of British Telecom Asia Pacific for reducing backlogs to 7% and achieving access+9 for the Asia Pacific region.

    In 2012, Mr. Kamath founded Symmetric IT Services Pvt Ltd, a company dedicated to providing innovative solutions in the field of information technology. The company specializes in:
    • Design and Deployment of Fibre Optic Cable-Based Data Networks
    • Building Technology Solutions including IP CCTV, access control systems, and more
    • Advanced Audio-visual Solutions for various applications

    Landmark Projects:
    Under Mr. Kamath's leadership, Symmetric IT Services has executed several landmark projects, including:
    • Data Network for Toll Systems across major highways
    • E-Fencing Integrated with CCTV for Indian Navy in Visakhapatnam
    • Aerial Fiber Cable Erection spanning 25,000 km across wind farms in India`
  },
  {
    id: 2,
    name: "Vandana Kamath",
    position: "Founder and Director - Accounts & Admin",
    image: "/images/team/Vandana Kamath.png",
    description: "30+ years in Financial Management",
    expandedDescription: `Ms.Vandana Kamath, the founder and director of Symmetric IT Services Pvt. Ltd., is a seasoned professional with over 30 years of specialized experience in Accounts and Administration. With a B.Com degree as her foundation, she has been instrumental in ensuring the financial stability and operational excellence of the organization.

    In her role as a financial strategist, Vandana oversees comprehensive budgeting, financial analysis, and cash flow optimization to support the company's sustainable growth. Her expertise encompasses maintaining accurate records, managing taxation, payroll, accounts payable and receivable, and preparing audits. She ensures full compliance with regulatory standards, safeguarding the company's financial integrity and adherence to statutory obligations.

    Vandana's role also involves handling bookkeeping, reconciliation of accounts, GST compliance, and the preparation of detailed financial statements. She collaborates closely with auditors and financial institutions to manage the company's funding and investments effectively, further strengthening its financial framework.

    Her meticulous approach and commitment to precision have been the backbone of Symmetric IT Services Pvt. Ltd., driving its operational success and financial health. Vandana's leadership continues to inspire the company's journey toward excellence and long-term achievement.`
  },
  {
    id: 3,
    name: "Devendra More",
    position: "Pre Sales and Project Management",
    image: "/images/team/Devendra.png",
    description: "Project Execution",
    expandedDescription: `Mr.Devendra More is the Technical Manager at Symmetric IT Services Pvt. Ltd., with over 15 years of experience in designing and implementing advanced technology solutions. Holding a B.Sc. in Electronics, he brings deep knowledge and expertise to every project he handles.

    Devendra specializes in creating and managing IP and CCTV Networks, ensuring they are reliable, efficient, and tailored to meet client needs. He has also designed large-scale systems such as Building Management Systems (BMS), Fire Alarm Systems (FAS), audio-visual solutions, and home automation systems, making spaces safer, smarter, and more efficient.
    
    His expertise extends to Fiber Optic Networks, including ADSS and underground fiber-optic construction, providing optimal connectivity and robust communication infrastructure. Additionally, Devendra ensures Access Control and Fire Safety solutions are seamlessly integrated, meeting compliance standards and enhancing overall safety.
    
    He plays a key role in understanding client requirements, proposing practical and innovative solutions, and ensuring these solutions are delivered on time and with the highest quality. His ability to handle projects from start to finish, from planning to implementation, has been instrumental in the success of many major projects.
    
    With his extensive experience and problem-solving approach, Devendra has been a cornerstone in delivering cutting-edge solutions for Symmetric IT Services Pvt. Ltd., ensuring the company remains at the forefront of technology.`
  },
  {
    id: 4,
    name: "Prajakta Pradarkar",
    position: "Chief Strategy Officer (CSO) - Operations",
    image: "/images/team/Prajakta.png",
    description: "Operations Excellence",
    expandedDescription: `Ms.Prajakta Pradarkar serves as the Chief Strategy Officer (CSO) - Operations at Symmetric IT Services Pvt. Ltd. With a BE in Electronics and 8 years of rich experience in Operations and Customer Service, she brings a blend of technical expertise and operational efficiency to the organization.

    Prajakta's role encompasses a wide range of responsibilities critical to the company's smooth functioning. She is proficient in data management and documentation, ensuring that vital records are accurate, organized, and accessible. Her coordination skills streamline workflows between teams, enhancing productivity and communication.
    
    In inventory and logistics, Prajakta ensures efficient stock management, timely dispatch, and seamless delivery processes. She also manages sales and purchase entries, invoices, and site expense tracking, contributing to precise financial management. Her expertise in vendor management and bank reconciliation guarantees compliance with financial protocols and optimal cash flow.
    
    Prajakta excels in reporting and compliance, generating insightful data-driven reports and ensuring adherence to regulatory requirements. Her commitment to providing support across operations underscores her dedication to customer satisfaction and internal process excellence.
    
    Her comprehensive approach and commitment to detail make Prajakta an invaluable asset to Symmetric IT Services Pvt. Ltd., driving operational success and contributing to the company's growth and efficiency.`
  }
];

function Home() {
  const [selectedMember, setSelectedMember] = useState(null);

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

        {/* About Us section now inside hero */}
        <div className="about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>About Us</h2>
                <p>At Symmetric IT Services, we're committed to delivering cutting-edge technology solutions. As a pioneering force in the IT sector, we've been at the forefront of digital transformation. Our mission is simple yet profound: to create innovative solutions that empower businesses to thrive in the digital age.</p>
              </div>
              <div className="about-logo">
                <img src="/images/logo/Symm Logo.png" alt="Symmetric IT Services Logo" />
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
                <div className="member-image" onClick={() => setSelectedMember(member)}>
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <h4>{member.position}</h4>
                <p>{member.description}</p>
                {member.expandedDescription && (
                  <button 
                    className="expand-btn"
                    onClick={() => setSelectedMember(member)}
                  >
                    Read More
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && selectedMember.expandedDescription && (
          <motion.div 
            className="leader-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              className="leader-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="close-btn"
                onClick={() => setSelectedMember(null)}
              >
                ×
              </button>
              <div className="leader-modal-content">
                <div className="leader-image">
                  <img src={selectedMember.image} alt={selectedMember.name} />
                </div>
                <div className="leader-info">
                  <h2>{selectedMember.name}</h2>
                  <h3>{selectedMember.position}</h3>
                  <div className="leader-description">
                    {selectedMember.expandedDescription.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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