import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CaseStudy.css';

const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}) => {
  const ref = useRef(null);
  const [direction, setDirection] = useState("left");

  const handleMouseEnter = (event) => {
    if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (ev, obj) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={`direction-aware-hover ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          <motion.div className="hover-overlay" />
          <motion.div
            variants={variants}
            className="image-container"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <img
              alt="case study"
              className={`case-study-image ${imageClassName}`}
              src={imageUrl}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={`hover-content ${childrenClassName}`}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const CaseStudyCard = ({ study, onOpen }) => {
  return (
    <div className="case-study-card">
      <div className="image-section">
        <DirectionAwareHover
          imageUrl={study.imageUrl}
          className="case-study-hover"
        >
          <div className="hover-details">
            <h3>{study.title}</h3>
            <p>{study.shortDescription}</p>
          </div>
        </DirectionAwareHover>
      </div>
      <div className="content-section">
        <h2>{study.title}</h2>
        <p>{study.description}</p>
        <button onClick={() => onOpen(study)} className="read-more-btn">
          Read More
        </button>
      </div>
    </div>
  );
};

const CaseStudy = () => {
  const [selectedStudy, setSelectedStudy] = useState(null);

  const caseStudies = [
    {
      id: 1,
      title: "HTMS Network Implementation for EFKON",
      shortDescription: "Highway Traffic Management System implementation across major Indian highways",
      description: "Symmetric IT Services Pvt Ltd successfully designed, supplied, and executed the Highway Traffic Management System (HTMS) network for EFKON, a leading European company specializing in intelligent traffic management solutions.",
      imageUrl: "./images/case-studies/Bandra Worli Sealink.png",
      details: {
        challenge: "The project aimed to enhance the control and operation of various traffic management systems, ensuring efficient traffic flow and improved safety on major highways in India. Key locations included Bandra-Worli Link Road and Hosur Road Highway.",
        solution: "Implementation of advanced technologies including Automation Traffic Counter cum Classifier (ATCC), CCTV, Emergency Communication System (ECS), Meteorological Stations (METs), Network Management System (NMS), and Variable Message Signs (VMS). The solution utilized Finolex Fibre Optic Cable and HP switches for reliable connectivity.",
        results: "The project led to improved traffic flow, increased safety through enhanced monitoring capabilities, real-time data access for informed decision-making, and better public communication through Variable Message Signs. The centralized Traffic Control Centre enables efficient management of all systems."
      }
    },
    {
      id: 2,
      title: "E-Fencing with CCTV Integration for Indian Navy",
      shortDescription: "First e-fencing project integrated with CCTV for the Indian Navy in Vishakhapatnam",
      description: "Implementation of an innovative security solution combining advanced electronic fencing technology with real-time surveillance capabilities, covering an extensive area of 8 km around critical naval installations.",
      imageUrl: "./images/case-studies/E-Fencing with CCTV .png",
      details: {
        challenge: "The project needed to provide enhanced security measures around critical naval installations while ensuring real-time monitoring and comprehensive coverage of the designated area.",
        solution: "Deployment of NEMTEK E-fencing energizers, Finolex Fibre Optic Cables, and GE CCTV cameras integrated with HP switches for seamless connectivity. The system provides real-time alerts and monitoring capabilities.",
        results: "Significant improvements in perimeter security, real-time surveillance capabilities, enhanced incident response times, and comprehensive coverage of critical areas. The integrated system has substantially improved the Navy's security infrastructure."
      }
    },
    {
      id: 3,
      title: "Aerial Fiber Cable Erection for Wind Farms",
      shortDescription: "25,000 km of aerial ADSS fiber cable connectivity across wind farms in India",
      description: "Design and execution of extensive aerial fiber cable network connecting wind turbines, supporting major companies like GE, Nodex, Enercon, and Envision in the renewable energy sector.",
      imageUrl: "./images/case-studies/wind-farms.webp",
      details: {
        challenge: "The project required establishing robust communication networks between wind turbines while withstanding high wind speeds and environmental challenges.",
        solution: "Implementation of specialized Finolex ADSS cable, industrial switches, and Hikvision IP CCTV cameras, creating an integrated network for data transmission and surveillance.",
        results: "Enhanced data transmission capabilities, improved operational monitoring and control, better security monitoring, and strengthened partnerships with major industry players in the renewable energy sector."
      }
    },
    {
      id: 4,
      title: "Campus Networking for Industrial Factories",
      shortDescription: "Comprehensive networking solutions for major industrial facilities",
      description: "Implementation of campus-wide networking solutions for prominent industrial factories including JSW Vadkal, Maharashtra Seamless Steel, Supreme Petrochemicals Ltd, and Mukand Steels.",
      imageUrl: "./images/case-studies/campus-network.png",
      details: {
        challenge: "The projects needed to establish reliable connectivity and efficient data networks through structured cabling and fiber optic cable construction across large industrial campuses.",
        solution: "Deployment of structured cabling systems, Finolex fiber optic cables, and Cisco switches, creating comprehensive network infrastructures tailored to each facility's needs.",
        results: "Achieved reliable data connectivity, high-speed data transmission, improved operational efficiency, and scalable network infrastructure supporting future growth and technological advancements."
      }
    },
    {
      id: 5,
      title: "Lighting Automation/Dimming Solution for Resto-Bars",
      shortDescription: "Smart lighting solutions for premium restaurants and bars across India",
      description: "Symmetric IT Services partnered with several renowned resto-bars, including Episode One, Barish, Hitchki, The Glass House, Pizza Express (BKC), Copper Chimney, Mainland China, Foo Restaurant, and Bohoba Restaurant to enhance customer experience through innovative lighting solutions.",
      imageUrl: "./images/case-studies/resto-bars.png",
      details: {
        challenge: "The project needed to design, supply, and deploy comprehensive lighting automation and dimming solutions that would create captivating ambiances centered around unique themes for each establishment. The system needed to adapt to different times of the day and various customer moods.",
        solution: `Implementation of sophisticated lighting solutions including:
        • Multi-dimming scenes for different times of day (daytime brightness, evening ambiance, event mode)
        • Strategic light highlighting for bar areas, dining spaces, and decor elements
        • LED fixtures with adjustable brightness and color temperature
        • Advanced dimming controllers and automation systems
        • Custom theme-based lighting designs for each establishment`,
        results: `The project achieved significant improvements in customer experience and operational efficiency:
        • Enhanced customer experience with dynamic and inviting atmospheres
        • Improved operational efficiency through automated lighting controls
        • Positive customer feedback leading to increased repeat visits
        • Successful implementation across multiple high-profile establishments
        • Seamless integration of technology with aesthetic requirements`
      },
      locations: [
        {
          name: "Episode One Smart Restobar",
          image: "./images/case-studies/resto-bars/episode-one.png"
        },
        {
          name: "Barish Smart Restobar",
          image: "./images/case-studies/resto-bars/barish.png"
        },
        {
          name: "Hitchki Smart Restobar",
          image: "./images/case-studies/resto-bars/hitchki.png"
        },
        {
          name: "The Glass House Smart Restaurant",
          image: "./images/case-studies/resto-bars/glass-house.png"
        },
        {
          name: "Pizza Express (BKC)",
          image: "./images/case-studies/resto-bars/pizza-express.jpeg"
        },
        {
          name: "Copper Chimney",
          image: "./images/case-studies/resto-bars/copper-chimney.jpeg"
        },
        {
          name: "Mainland China",
          image: "./images/case-studies/resto-bars/mainland-china.jpeg"
        },
        {
          name: "Foo Restaurant",
          image: "./images/case-studies/resto-bars/foo.jpeg"
        },
        {
          name: "Bohoba Restaurant",
          image: "./images/case-studies/resto-bars/bohoba.jpeg"
        }
      ]
    }
  ];

  return (
    <div className="case-studies-container">
      <h1>Case Studies</h1>
      <div className="case-studies-grid">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            onOpen={setSelectedStudy}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedStudy && (
          <motion.div 
            className="expanded-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudy(null)}
          >
            <motion.div 
              className="expanded-case-study"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-button"
                onClick={() => setSelectedStudy(null)}
              >
                ×
              </button>
              <div className="expanded-content">
                <h2>{selectedStudy.title}</h2>
                <div className="case-study-details">
                  <h3>Challenge</h3>
                  <p>{selectedStudy.details.challenge}</p>
                  <h3>Solution</h3>
                  <p>{selectedStudy.details.solution}</p>
                  <h3>Results</h3>
                  <p>{selectedStudy.details.results}</p>
                  {selectedStudy.locations && (
                    <>
                      <h3>Implementation Locations</h3>
                      <div className="locations-grid">
                        {selectedStudy.locations.map((location, index) => (
                          <div key={index} className="location-card">
                            <img src={location.image} alt={location.name} />
                            <h4>{location.name}</h4>
                          </div>
                        ))}
                      </div>
                    </>
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

const variants = {
  initial: { x: 0 },
  exit: { x: 0, y: 0 },
  top: { y: 20 },
  bottom: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

const textVariants = {
  initial: { y: 0, x: 0, opacity: 0 },
  exit: { y: 0, x: 0, opacity: 0 },
  top: { y: -20, opacity: 1 },
  bottom: { y: 2, opacity: 1 },
  left: { x: -2, opacity: 1 },
  right: { x: 20, opacity: 1 },
};

export default CaseStudy;