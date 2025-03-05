import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SuccessStoriesCarousel.css';

const stories = [
  {
    id: 1,
    category: "Infrastructure",
    title: "HTMS Network Implementation for EFKON",
    description: "Highway Traffic Management System implementation across major Indian highways",
    image: "/images/case-studies/Bandra Worli Sealink.png",
    details: {
      challenge: "The project aimed to enhance the control and operation of various traffic management systems, ensuring efficient traffic flow and improved safety on major highways in India. Key locations included Bandra-Worli Link Road and Hosur Road Highway.",
      solution: "Implementation of advanced technologies including Automation Traffic Counter cum Classifier (ATCC), CCTV, Emergency Communication System (ECS), Meteorological Stations (METs), Network Management System (NMS), and Variable Message Signs (VMS). The solution utilized Finolex Fibre Optic Cable and HP switches for reliable connectivity.",
      results: "The project led to improved traffic flow, increased safety through enhanced monitoring capabilities, real-time data access for informed decision-making, and better public communication through Variable Message Signs. The centralized Traffic Control Centre enables efficient management of all systems."
    }
  },
  {
    id: 2,
    category: "Security",
    title: "E-Fencing with CCTV Integration for Indian Navy",
    description: "First e-fencing project integrated with CCTV for the Indian Navy in Vishakhapatnam",
    image: "/images/case-studies/E-Fencing with CCTV .png",
    details: {
      challenge: "The project needed to provide enhanced security measures around critical naval installations while ensuring real-time monitoring and comprehensive coverage of the designated area.",
      solution: "Deployment of NEMTEK E-fencing energizers, Finolex Fibre Optic Cables, and GE CCTV cameras integrated with HP switches for seamless connectivity. The system provides real-time alerts and monitoring capabilities.",
      results: "Significant improvements in perimeter security, real-time surveillance capabilities, enhanced incident response times, and comprehensive coverage of critical areas. The integrated system has substantially improved the Navy's security infrastructure."
    }
  },
  {
    id: 3,
    category: "Connectivity",
    title: "Aerial Fiber Cable Erection for Wind Farms",
    description: "25,000 km of aerial ADSS fiber cable connectivity across wind farms in India",
    image: "/images/case-studies/wind-farms.jpeg",
    details: {
      challenge: "The project required establishing robust communication networks between wind turbines while withstanding high wind speeds and environmental challenges.",
      solution: "Implementation of specialized Finolex ADSS cable, industrial switches, and Hikvision IP CCTV cameras, creating an integrated network for data transmission and surveillance.",
      results: "Enhanced data transmission capabilities, improved operational monitoring and control, better security monitoring, and strengthened partnerships with major industry players in the renewable energy sector."
    }
  },
  {
    id: 4,
    category: "Automation",
    title: "Lighting Automation for Resto-Bars",
    description: "Smart lighting solutions for premium restaurants and bars across India",
    image: "/images/case-studies/resto-bars.png",
    details: {
      challenge: "The project needed to design, supply, and deploy comprehensive lighting automation and dimming solutions that would create captivating ambiances centered around unique themes for each establishment.",
      solution: "Implementation of sophisticated lighting solutions including multi-dimming scenes, strategic light highlighting, LED fixtures with adjustable brightness, and advanced dimming controllers.",
      results: "Enhanced customer experience with dynamic atmospheres, improved operational efficiency, and successful implementation across multiple high-profile establishments.",
      locations: [
        "Episode One Smart Restobar",
        "Barish Smart Restobar",
        "Hitchki Smart Restobar",
        "The Glass House Smart Restaurant",
        "Pizza Express (BKC)",
        "Copper Chimney",
        "Mainland China",
        "Foo Restaurant",
        "Bohoba Restaurant"
      ]
    }
  },
    {
      "id": 5,
      "category": "Security & Access Control",
      "title": "Boom Barrier for Traffic Control & Security",
      "description": "Implementation of Automatic Boom Barriers with RFID and License Plate Recognition for a residential society with 500+ apartments.",
      "image": "/images/case-studies/boom-barrier.png",
      "details": {
        "challenge": "Unregulated vehicle movement caused traffic congestion, manual vehicle checks led to long queues, unauthorized parking in restricted areas, and high operational costs due to manpower reliance.",
        "solution": "Installed Automatic Boom Barriers at entry and exit points, integrated with RFID-based access control and License Plate Recognition (LPR) cameras for seamless vehicle access management.",
        "results": "Enhanced security with only pre-registered vehicle access, 40% reduction in vehicle wait times, optimized security manpower, and prevention of unauthorized parking."
      }
    },
    {
      "id": 6,
      "category": "Security & Access Control",
      "title": "Flap Barrier for Pedestrian Access Control",
      "description": "Deployment of Flap Barriers with biometric scanners and RFID card readers to regulate pedestrian access at a corporate office with 1,000+ employees and visitors daily.",
      "image": "/images/case-studies/flap-barrier.png",
      "details": {
        "challenge": "Open access points made it difficult to restrict unauthorized personnel, manual ID verification caused long waiting lines, tailgating incidents compromised security, and attendance tracking inaccuracies led to payroll discrepancies.",
        "solution": "Implemented Flap Barriers with biometric scanners, RFID card readers, and infrared sensors to detect multiple entries and prevent tailgating. Integrated the system with HR software for real-time attendance tracking.",
        "results": "Strict access control eliminating unauthorized entries, improved employee movement efficiency, automated attendance tracking reducing payroll errors, and enhanced security with alerts for unauthorized access attempts."
      }
    },
    {
      "id": 7,
      "category": "Security & Surveillance",
      "title": "CCTV Surveillance System for Security Enhancement",
      "description": "Installation of an advanced CCTV system with IP cameras, NVRs, and remote access capabilities for a commercial complex with multiple offices and retail outlets.",
      "image": "/images/case-studies/CCTV Surveillance System.png",
      "details": {
        "challenge": "Lack of surveillance led to increased security breaches, unauthorized access to restricted areas, absence of real-time monitoring, and high security costs due to excessive personnel deployment.",
        "solution": "Deployed a CCTV system with IP cameras, Network Video Recorders (NVRs), and remote access features. Prioritized high-risk zones such as cash counters, entry/exit points, and parking lots for surveillance.",
        "results": "24/7 surveillance enabling immediate response to security threats, crime prevention due to camera presence, remote monitoring for security teams, and legal compliance with recorded footage for dispute resolution."
      }
    },
    {
      "id": 8,
      "category": "Renewable Energy Infrastructure",
      "title": "Implementation of SCADA, CCTV, and Fire Alarm Systems at Belectric Renewables' 100 MW Pavgad Solar Farm",
      "description": "Deployment of SCADA connectivity, Bosch CCTV surveillance, and Bosch fire alarm systems for comprehensive monitoring, security, and safety at a 100 MW solar farm.",
      "image": "/images/case-studies/pavgad-solar-farm.png",
      "details": {
        "challenge": "Remote location and infrastructure limitations, integration of multiple systems, and security and safety concerns.",
        "solution": "Established a robust communication backbone, developed a unified platform for system interoperability, and implemented multi-layer security measures including access control and surveillance.",
        "results": "Enhanced operational efficiency with real-time monitoring, improved security with 24/7 surveillance, increased safety compliance through an advanced fire detection system, and reduced downtime optimizing solar farm performance."
      }
    }
    
];

export const SuccessStoriesCarousel = () => {
  const carouselRef = useRef(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="carousel-container"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="carousel-track">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.2,
                }
              }}
              className="carousel-card"
              onClick={() => setSelectedStory(story)}
            >
              <div className="card-content">
                <div className="card-overlay" />
                <div className="card-text">
                  <p className="card-category">{story.category}</p>
                  <h3 className="card-title">{story.title}</h3>
                  <p className="card-description">{story.description}</p>
                </div>
                <picture>
                  <source srcSet={story.image.replace('.png', '.webp').replace('.jpeg', '.webp')} type="image/webp" />
                  <source srcSet={story.image.replace('.png', '.avif').replace('.jpeg', '.avif')} type="image/avif" />
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="card-image"
                    loading="lazy"
                    width="100%"
                    height="100%"
                  />
                </picture>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="carousel-controls">
        <button
          className="control-button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        >
          ←
        </button>
        <button
          className="control-button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        >
          →
        </button>
      </div>

      <AnimatePresence>
        {selectedStory && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedStory(null)}
              >
                ×
              </button>
              <div className="modal-body">
                <h2>{selectedStory.title}</h2>
                <p className="modal-category">{selectedStory.category}</p>
                <div className="modal-image">
                  <img src={selectedStory.image} alt={selectedStory.title} />
                </div>
                <div className="modal-details">
                  <section>
                    <h3>Challenge</h3>
                    <p>{selectedStory.details.challenge}</p>
                  </section>
                  <section>
                    <h3>Solution</h3>
                    <p>{selectedStory.details.solution}</p>
                  </section>
                  <section>
                    <h3>Results</h3>
                    <p>{selectedStory.details.results}</p>
                  </section>
                  {selectedStory.details.locations && (
                    <section>
                      <h3>Implementation Locations</h3>
                      <ul>
                        {selectedStory.details.locations.map((location, index) => (
                          <li key={index}>{location}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};