import React from 'react';
import './Solutions.css';

const BuildingTechnologies = () => {
  const categories = [
    {
      title: "Access Control & Time Attendance",
      items: [
        {
          title: "Access Control Systems",
          description: "Comprehensive access management solutions for enhanced security",
          image: "./images/Solutions/Building Technologies/Access Control/access-control.png"
        },
        {
          title: "Time Attendance Systems",
          description: "Advanced time tracking and attendance management solutions",
          image: "./images/Solutions/Building Technologies/Access Control/time-attendance.png"
        }
      ]
    },
    {
      title: "IP CCTV",
      items: [
        {
          title: "IP Surveillance Systems",
          description: "High-definition IP camera solutions for comprehensive monitoring",
          image: "./images/Solutions/Building Technologies/IP CCTV/ip-cctv.png"
        }
      ]
    },
    {
      title: "Fire Safety Systems",
      items: [
        {
          title: "Fire Alarm Products",
          description: "Advanced fire detection and alarm systems",
          image: "./images/Solutions/Building Technologies/Fire Safety/fire-alarm.png"
        },
        {
          title: "Fire Sprinkler Systems",
          description: "Automated fire suppression solutions",
          image: "./images/Solutions/Building Technologies/Fire Safety/fire-sprinkler.png"
        }
      ]
    },
    {
      title: "Communication Systems",
      items: [
        {
          title: "Public Address System",
          description: "Professional audio solutions for clear communication",
          image: "./images/Solutions/Building Technologies/Communication/public-address.png"
        }
      ]
    },
    {
      title: "Security Solutions",
      items: [
        {
          title: "Physical Security",
          description: "Comprehensive physical security infrastructure",
          image: "./images/Solutions/Building Technologies/Security/physical-security.png"
        },
        {
          title: "Under Vehicle Surveillance",
          description: "Specialized under-vehicle inspection systems",
          image: "./images/Solutions/Building Technologies/Security/under-vehicle.png"
        },
        {
          title: "Guard Tour Monitoring",
          description: "Advanced patrol management solutions",
          image: "./images/Solutions/Building Technologies/Security/guard-tour.png"
        },
        {
          title: "Perimeter Fencing",
          description: "Secure perimeter protection systems",
          image: "./images/Solutions/Building Technologies/Security/perimeter-fencing.png"
        }
      ]
    },
    {
      title: "Facility Protection",
      items: [
        {
          title: "Rodent Repellent System",
          description: "Electronic pest control solutions",
          image: "./images/Solutions/Building Technologies/Protection/rodent-repellent.png"
        },
        {
          title: "Water Leak Detection",
          description: "Early warning water leak detection systems",
          image: "./images/Solutions/Building Technologies/Protection/water-leak.png"
        }
      ]
    }
  ];

  return (
    <div className="solutions-container">
      <h1 className="solutions-title">Building Technologies</h1>
      {categories.map((category, index) => (
        <section key={index} className="solutions-section">
          <h2 className="section-title">{category.title}</h2>
          <div className="solutions-grid">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="solution-card">
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default BuildingTechnologies; 