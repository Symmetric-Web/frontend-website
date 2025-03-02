import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../pages/Solutions.css';

// Create context for carousel
const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

const Card = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onCardClose(index);
  }, [setIsOpen, onCardClose, index]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target.classList.contains('expanded-overlay')) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleClose]);

  return (
    <>
      <motion.div
        layoutId={`card-${index}`}
        onClick={() => setIsOpen(true)}
        className="card"
      >
        <div className="card-gradient-overlay" />
        <div className="card-content">
          <motion.p layoutId={`category-${index}`} className="card-category">
            {item.category}
          </motion.p>
          <motion.h3 layoutId={`title-${index}`} className="card-title">
            {item.title}
          </motion.h3>
        </div>
        <motion.div className="card-image-container" layoutId={`image-${index}`}>
          <img src={item.image} alt={item.title} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="expanded-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <motion.div 
              className="expanded-card"
              layoutId={`card-${index}`}
              ref={cardRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={handleClose}>×</button>
              <div className="expanded-card-content">
                <div className="expanded-header">
                  <motion.p layoutId={`category-${index}`} className="expanded-category">
                    {item.category}
                  </motion.p>
                  <motion.h2 layoutId={`title-${index}`} className="expanded-title">
                    {item.title}
                  </motion.h2>
                </div>
                <motion.div 
                  className="expanded-image"
                  layoutId={`image-${index}`}
                >
                  <img src={item.image} alt={item.title} />
                </motion.div>
                <motion.div 
                  className="expanded-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="content-overview">
                    <p>{item.description}</p>
                  </div>
                  
                  {item.details && (
                    <div className="content-details">
                      {item.details.map((section, idx) => (
                        <div key={idx} className="detail-section">
                          <h4>{section.title}</h4>
                          {section.type === 'list' ? (
                            <ul>
                              {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{section.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Carousel = ({ items, sectionId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: setCurrentIndex, currentIndex }}>
      <div className="carousel-container">
        <button 
          className="carousel-button left"
          onClick={() => scroll('left')}
          aria-label="Previous"
        >
          ←
        </button>
        
        <div className="carousel-track" ref={carouselRef}>
          {items.map((item, index) => (
            <Card 
              key={`${sectionId}-${index}`} 
              item={item} 
              index={`${sectionId}-${index}`} 
            />
          ))}
        </div>

        <button 
          className="carousel-button right"
          onClick={() => scroll('right')}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </CarouselContext.Provider>
  );
};

const BuildingTechSolutions = () => {
  const buildingTechSolutions = [
    {
      category: "AUTOMATION",
      title: "Building Management System",
      description: "A Building Management System (BMS), designed and implemented by Symmetric IT Services, is an intelligent control system that monitors and manages the critical mechanical, electrical, and electromechanical systems within a facility.",
      image: "./images/Solutions/Building Technologies/Building Management Solution.png",
      details: [
        {
          title: "Systems Managed",
          type: "list",
          items: [
            "Power distribution",
            "Heating, Ventilation, and Air Conditioning (HVAC)",
            "Physical access control",
            "Fire and safety systems",
            "Water management, including pumps",
            "Elevators and escalators",
            "Lighting solutions"
          ]
        },
        {
          title: "Comprehensive Facility Control",
          type: "list",
          items: [
            "Real-time data collection from various facility points",
            "Continuous analysis of system performance",
            "Anomaly detection and deviation monitoring",
            "Automated alert system for facility managers",
            "Swift issue resolution and minimal downtime"
          ]
        },
        {
          title: "Flexibility and Integration",
          type: "list",
          items: [
            "Standalone system capability",
            "Seamless integration with existing monitoring software",
            "Cross-platform management capabilities",
            "Multi-protocol support",
            "Centralized, holistic facility performance view"
          ]
        },
        {
          title: "Innovative Features by Symmetric IT Services",
          type: "list",
          items: [
            "Cross-Platform Compatibility: Manage diverse systems through a single, user-friendly interface.",
            "Predictive Maintenance: Utilize data analytics to foresee potential issues before they escalate.",
            "Energy Optimization: Smart algorithms ensure efficient resource utilization, reducing operational costs.",
            "Enhanced Security: Integrated systems for fire, access, and surveillance ensure comprehensive safety coverage."
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "Access Control Systems: Securing Your Business",
      description: "Access Control by Symmetric IT Services is a robust security solution that regulates access to resources, ensuring only authorized individuals can enter physical or virtual spaces. This advanced method safeguards your organization by minimizing risks and enhancing security.",
      image: "./images/Solutions/Building Technologies/Entry Access Solutions.png",
      details: [
        {
          title: "Types of Access Control",
          type: "list",
          items: [
            "Virtual Access Control: Restricts access to computer networks and data through secure credentials like passwords, PIN codes, or encryption.",
            "Physical Access Control: Manages entry to buildings or areas using secure methods like ID cards, key fobs, or biometric scans."
          ]
        },
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Streamlined Access: Employees gain seamless entry without traditional keys.",
            "Cost Savings: Eliminates costs related to lost or duplicated keys.",
            "Enhanced Monitoring: Tracks who enters and exits in real time.",
            "Unwanted Visitor Prevention: Secures against unauthorized access.",
            "Data Protection: Guards sensitive information against breaches.",
            "Employee Autonomy: Allows flexible access without compromising security.",
            "Safe Environment: Reduces theft and ensures a secure workspace."
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Symmetric IT Services offers tailored access control systems designed to protect your assets, employees, and data, fostering a secure and efficient environment.",
            "We provide comprehensive installation, maintenance, and support services to ensure your access control system operates at peak efficiency.",
            "Our solutions are scalable and can be integrated with existing security infrastructure for a unified security approach."
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "Guard Tour Monitoring System: Streamlined Security Management",
      description: "Symmetric IT Services offers a Guard Tour Monitoring System that enhances security operations by ensuring efficient patrol management and real-time monitoring of security personnel.",
      image: "./images/Solutions/Building Technologies/Guard Tour Monitoring System.png",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Real-Time Tracking: Monitors guard movements and patrols in real time with live reporting.",
            "Automated Reports: Generates detailed reports of each patrol, reducing paperwork.",
            "GPS Integration: Tracks guard locations, ensuring they complete assigned routes.",
            "Alert Notifications: Instant alerts for missed checkpoints or irregularities.",
            "Durable Devices: Easy-to-use, rugged handheld devices with NFC or RFID for checkpoint scanning.",
            "Customizable Schedules: Tailored patrol routes and schedules to optimize security coverage."
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Increased Accountability: Ensures guards complete their rounds on time.",
            "Improved Efficiency: Streamlines patrol management and reduces administrative tasks.",
            "Enhanced Security: Reduces the chance of security breaches through thorough patrols.",
            "Cost-Effective: Optimizes guard operations and reduces costs."
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Symmetric IT Services provides seamless installation and support, ensuring enhanced security and efficient patrol management for your premises.",
            "We offer comprehensive training for security personnel to maximize system effectiveness.",
            "Our solutions can be integrated with existing security infrastructure for unified management."
          ]
        }
      ]
    },
    {
      category: "SAFETY",
      title: "Fire Alarm Systems (FAS): Safeguarding Lives and Properties",
      description: "Symmetric IT Services delivers comprehensive Fire Alarm and Safety Solutions designed to detect, respond, and suppress fire hazards, ensuring safety for residential, commercial, and industrial environments.",
      image: "./images/Solutions/Building Technologies/Fire Safety solutions.png",
      details: [
        {
          title: "Components of the Solution",
          type: "list",
          items: [
            "Fire Detection Systems: Early detection with smoke detectors, heat detectors, flame detectors, and multi-sensor alarms.",
            "Fire Alarm Systems: Conventional, addressable, and wireless systems for different premises sizes.",
            "Fire Suppression Systems: Gas-based, water mist, CO2, and foam suppression systems.",
            "Fire Sprinkler Systems: Wet pipe, dry pipe, pre-action, and deluge systems.",
            "Emergency Lighting and Signage: Exit lights, photoluminescent signs, and fire action notices.",
            "Monitoring and Control Systems: Fire Alarm Control Panels (FACP), remote monitoring, and BMS integration."
          ]
        },
        {
          title: "Types of Fire Alarm Systems",
          type: "list",
          items: [
            "Semi-Addressable Systems: Combines addressable and conventional features for flexibility and cost efficiency.",
            "Conventional Systems: Divides the area into zones, detecting fires based on preset thresholds.",
            "Intelligent Addressable Systems: Offers detailed fire location data and situational awareness.",
            "Analogue Addressable Systems: Provides device-level identification and advanced event management for ease of maintenance."
          ]
        },
        {
          title: "Deployment Process",
          type: "list",
          items: [
            "Risk Assessment: Conduct site surveys to identify fire risks and design customized solutions.",
            "Design and Planning: Create layouts for sensor placement, alarm systems, and suppression units.",
            "Installation: Deploy fire alarms, sprinklers, and suppression systems using industry-standard practices.",
            "Testing and Commissioning: Verify system functionality through simulations and compliance checks.",
            "Maintenance: Regular inspections and upgrades to ensure long-term reliability."
          ]
        },
        {
          title: "Advantages of Our Fire Safety Solution",
          type: "list",
          items: [
            "Comprehensive Coverage: Includes detection, suppression, and evacuation systems.",
            "Customizable: Tailored solutions for homes, offices, warehouses, and industrial facilities.",
            "Compliance: Meets local fire safety regulations and international standards.",
            "Reliability: High-quality components ensure long-term performance."
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "Intrusion Detection System (IDS) Solution",
      description: "Symmetric IT Services provides an advanced Intrusion Detection System (IDS) that detects unauthorized access and potential security threats in real-time, ensuring the safety of residential, commercial, and industrial premises.",
      image: "./images/Solutions/Building Technologies/Intrusion Detection Solution.png",
      details: [
        {
          title: "Motion Detection Systems",
          type: "list",
          items: [
            "PIR (Passive Infrared) Sensors: Detect motion by measuring changes in infrared radiation, ideal for indoor spaces like offices, homes, and warehouses.",
            "Microwave Sensors: Use microwave signals to detect movement, effective for large or outdoor areas.",
            "Dual-Technology Motion Sensors: Combine PIR and microwave technology for more accurate detection, reducing false alarms."
          ]
        },
        {
          title: "Door and Window Contact Sensors",
          type: "list",
          items: [
            "Magnetic Door/Window Contacts: Simple but effective, these sensors alert when doors or windows are opened.",
            "Vibration Sensors: Detect impact or force on doors/windows to identify unauthorized attempts to breach."
          ]
        },
        {
          title: "Glass Break Detectors",
          type: "list",
          items: [
            "Acoustic Glass Break Sensors: Identify the frequency patterns associated with glass breaking, triggering alarms.",
            "Shock Sensors: Detect the physical shock from a window or glass breakage, ideal for high-security zones."
          ]
        },
        {
          title: "Perimeter Security Sensors",
          type: "list",
          items: [
            "Infrared Sensors: Monitor perimeters by detecting body heat or objects crossing the infrared beam.",
            "Laser Beam Systems: Use laser beams to detect intruders crossing designated lines or areas.",
            "Pressure Mats: Trigger alerts when weight is applied, ideal for securing gates or restricted entry points."
          ]
        },
        {
          title: "Surveillance Integration",
          type: "list",
          items: [
            "CCTV Cameras with Motion Detection: Cameras integrated with motion detection capabilities to start recording when movement is detected.",
            "Thermal Cameras: Detect intruders in low-light conditions by capturing temperature differences in the environment.",
            "Video Analytics: Advanced software to analyze footage for suspicious activity and alert security personnel automatically."
          ]
        },
        {
          title: "Alarm Systems",
          type: "list",
          items: [
            "Audible Alarms: High-decibel sirens or alarms to alert people nearby and deter intruders.",
            "Silent Alarms: Trigger hidden alarms for law enforcement or security teams without alerting the intruder.",
            "Strobe Lights: Flashing lights to accompany audible alarms, especially in large or noisy environments."
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Early Detection: Quickly identifies potential threats to prevent damage or theft.",
            "Scalability: Easily adaptable to homes, office buildings, warehouses, and large industrial sites.",
            "Customizable Alerts: Tailored notifications to meet the needs of security teams or property owners.",
            "Integration: Seamlessly integrates with other security systems like surveillance and access control for a unified solution.",
            "Reliable Performance: High-quality sensors and components ensure minimal false alarms and maximum reliability."
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "CCTV and Smart Surveillance Systems: Enhancing Safety and Security",
      description: "CCTV (Closed-Circuit Television) is a crucial component of modern security systems, providing real-time monitoring and recording for both indoor and outdoor spaces. Whether for homes, workplaces, or public areas, CCTV systems are the first line of defense in ensuring safety and deterring crime.",
      image: "./images/Solutions/Building Technologies/IP CCTV  Surveillance.png",
      details: [
        {
          title: "Comprehensive Services by Symmetric IT Services",
          type: "list",
          items: [
            "Supply and Installation of CCTV systems",
            "Commissioning and Maintenance for optimal performance",
            "Integration of smart surveillance technologies"
          ]
        },
        {
          title: "Applications of CCTV Systems",
          type: "list",
          items: [
            "Crime Management: Deter, document, and assist in solving crimes.",
            "Disaster Management: Monitor critical areas during emergencies.",
            "City & Community Monitoring: Enhance public safety through street surveillance.",
            "Medical Monitoring: Aid in patient observation and diagnostics.",
            "Retail Intelligence: Understand customer behavior to improve operations.",
            "Behavioral Research: Analyze human activities for academic or operational insights."
          ]
        },
        {
          title: "Key Features",
          type: "list",
          items: [
            "High-Definition Video: Crystal clear footage for accurate identification",
            "Night Vision Capabilities: 24/7 surveillance regardless of lighting conditions",
            "Smart Motion Detection: Automated alerts for suspicious activities",
            "Remote Monitoring: Access live feeds from anywhere via mobile devices",
            "Secure Storage: Encrypted video storage with backup options"
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Enhanced Security: Real-time monitoring and recording for immediate response",
            "Deterrence: Visible security measures to prevent criminal activities",
            "Evidence Collection: High-quality footage for investigations",
            "Operational Insights: Analytics for business intelligence and optimization",
            "Peace of Mind: Continuous surveillance for property and personnel protection"
          ]
        }
      ]
    },
    {
      category: "AUTOMATION",
      title: "Integrated Building Management Systems (iBMS): The Future of Smarter Buildings",
      description: "Integrated Building Management Systems (BMS) are revolutionizing the way modern buildings operate by providing centralized control and monitoring of essential systems. Among the leading platforms in this domain is the Symmetric IT Services Building Management System (BMS), powered by the Niagara Framework®.",
      image: "./images/Solutions/Building Technologies/iBMS.png",
      details: [
        {
          title: "Platform Features",
          type: "list",
          items: [
            "Multi-protocol support: LONWORKS®, BACnet®, Modbus®, and Internet standards",
            "Open architecture leveraging Niagara Framework®",
            "Scalable integration for all control, monitoring, and operational needs",
            "Remote access and control capabilities",
            "Real-time monitoring and management across multiple sites"
          ]
        },
        {
          title: "Integrated Systems",
          type: "list",
          items: [
            "HVAC systems and precision air conditioning (PAC)",
            "Energy meters and variable frequency drives (VFD)",
            "Diesel generators (DG) and uninterruptible power supplies (UPS)",
            "Chillers and water treatment plants (WTP)",
            "Power distribution and lighting control",
            "Physical access control and security systems",
            "Fire safety and emergency systems"
          ]
        },
        {
          title: "Comprehensive Facility Control",
          type: "list",
          items: [
            "Real-time data collection and analysis from multiple facility points",
            "Anomaly detection and automated alert system",
            "Swift issue resolution through immediate notification",
            "Continuous monitoring of system performance",
            "Predictive maintenance capabilities"
          ]
        },
        {
          title: "Flexibility and Integration",
          type: "list",
          items: [
            "Standalone or integrated system operation",
            "Seamless integration with existing monitoring software",
            "Cross-platform management capabilities",
            "Centralized, holistic facility performance view",
            "Multi-protocol support for diverse system integration"
          ]
        },
        {
          title: "Innovative Features",
          type: "list",
          items: [
            "Cross-Platform Compatibility: Single, user-friendly interface for all systems",
            "Predictive Maintenance: Data analytics for early issue detection",
            "Energy Optimization: Smart algorithms for efficient resource utilization",
            "Enhanced Security: Integrated safety and surveillance systems",
            "Future-Proof Design: Sustainable foundation that evolves with building lifecycle"
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "Perimeter Security Solutions: Robust Protection with Top Fencing Options",
      description: "Symmetric IT Services offers comprehensive Perimeter Security Solutions, combining state-of-the-art technology with high-security fencing options to protect your assets and premises from unauthorized access.",
      image: "./images/Solutions/Building Technologies/Perimeter Fencing Security .png",
      details: [
        {
          title: "Fencing & Barriers",
          type: "list",
          items: [
            "Chain Link Fencing: A cost-effective and durable solution, ideal for large properties, offering security without obstructing visibility.",
            "Electric Fencing: Adds an extra layer of security, commonly used in high-security environments such as data centers, industrial sites, and government buildings.",
            "Welded Mesh Fencing: Strong and aesthetically pleasing, perfect for residential, commercial, and industrial applications.",
            "Security Fencing (Anti-Climb): High-security fencing with sharp edges or spikes, designed for areas needing maximum protection like airports, prisons, and sensitive government facilities.",
            "Razor Wire Fencing: An excellent deterrent, frequently used around industrial sites, military zones, and borders to prevent unauthorized entry."
          ]
        },
        {
          title: "Integration Features",
          type: "list",
          items: [
            "Advanced Surveillance Systems: CCTV integration for comprehensive monitoring",
            "Motion Detection: Sensors to detect unauthorized approaches",
            "Access Control: Secure entry points with automated gates and barriers",
            "Alarm Systems: Immediate alert systems for breach attempts",
            "Lighting Systems: Motion-activated security lighting"
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Comprehensive Protection: A multi-layered security approach combining fencing and advanced technology for optimal perimeter defense.",
            "Real-Time Monitoring: Instant alerts to ensure a rapid response to any security threats.",
            "Scalable & Customizable: Solutions designed to fit your specific perimeter security needs.",
            "Cost-Effective: Reduces long-term security risks and maintenance costs."
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Expert Design: Customized solutions based on site assessment and security requirements",
            "Professional Installation: Skilled teams ensuring proper setup and integration",
            "Ongoing Support: Regular maintenance and rapid response to security concerns",
            "Future-Proof Solutions: Adaptable systems that can be upgraded as security needs evolve"
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "Physical Security Solution",
      description: "Symmetric IT Services delivers advanced physical security solutions for commercial, industrial, and residential premises, ensuring controlled access, perimeter protection, and enhanced safety.",
      image: "./images/Solutions/Building Technologies/Physical Security Solution.jpeg",
      details: [
        {
          title: "Access Control Systems",
          type: "list",
          items: [
            "Flap Barriers: Motorized barriers with retractable wings, ideal for office lobbies, metro stations, and airports.",
            "Swing Barriers: Sleek designs for pedestrian access with minimal obstruction.",
            "Turnstiles: Full-height or waist-high turnstiles for stadiums, factories, and high-security zones.",
            "Sliding Gates: Automated gates for vehicle and pedestrian entry at large premises."
          ]
        },
        {
          title: "Perimeter Security",
          type: "list",
          items: [
            "Boom Barriers: Automatically control vehicle access, perfect for parking lots, toll plazas, and gated communities.",
            "Spike Barriers: Provide vehicle access control with added security against unauthorized movement.",
            "Electric Fencing: Deters intrusions, commonly used for high-security areas like warehouses and data centers.",
            "Crash-Resistant Bollards: Prevent vehicle-based threats, ideal for sensitive locations like embassies and government offices."
          ]
        },
        {
          title: "Surveillance Systems",
          type: "list",
          items: [
            "CCTV Cameras: PTZ (Pan-Tilt-Zoom) cameras for wide-area surveillance.",
            "Fixed cameras for consistent monitoring.",
            "Infrared and thermal cameras for low-light and night-time security.",
            "Video Management Systems (VMS): Centralized control for real-time viewing and recording analysis."
          ]
        },
        {
          title: "Intrusion Detection Systems",
          type: "list",
          items: [
            "Motion Sensors: Trigger alerts for unusual movements.",
            "Glass Break Detectors: Identify attempts to breach windows or glass doors.",
            "Door/Window Contact Sensors: Detect forced openings of doors or windows."
          ]
        },
        {
          title: "Parking and Traffic Management",
          type: "list",
          items: [
            "Automatic Number Plate Recognition (ANPR): Track and manage vehicle access automatically.",
            "Parking Guidance Systems: Direct drivers to available parking spots.",
            "Speed Gates: High-speed vehicle barriers for enhanced throughput at checkpoints."
          ]
        },
        {
          title: "Emergency Systems",
          type: "list",
          items: [
            "Emergency Exit Doors: Automated doors for quick evacuation.",
            "Fire Safety Integration: Seamlessly connect with fire alarms and suppression systems to secure exits during fire events.",
            "Panic Buttons and Alarms: Trigger immediate alerts in critical situations."
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Enhanced Safety: Prevent unauthorized access and safeguard property.",
            "Automation: Reduce manual intervention with intelligent systems.",
            "Scalability: Easily expand and upgrade systems as per growing needs.",
            "Compliance: Adheres to local and international safety and security standards."
          ]
        }
      ]
    },
    {
      category: "COMMUNICATION",
      title: "Public Address Systems (PA Systems): Enhancing Communication",
      description: "A Public Address System (PA System), provided by Symmetric IT Services, is an advanced electronic system featuring microphones, amplifiers, speakers, and related equipment. Designed to amplify sound, PA systems are ideal for public spaces, ensuring clear communication across large or remote areas.",
      image: "./images/Solutions/Building Technologies/Public anouncment system.png",
      details: [
        {
          title: "Applications",
          type: "list",
          items: [
            "Sports fields and stadiums: Clear announcements for large crowds",
            "Public transportation hubs: Real-time travel updates and safety messages",
            "Corporate facilities and offices: Internal communications and emergency alerts",
            "Live music events and performances: High-quality sound distribution"
          ]
        },
        {
          title: "Key Features",
          type: "list",
          items: [
            "Multiple microphones and sound sources for versatile input options",
            "Mixers for professional sound adjustments and control",
            "Amplifiers and speakers for higher volume and broad distribution",
            "Zone control for targeted announcements",
            "Digital signal processing for optimal sound quality"
          ]
        },
        {
          title: "Benefits for Businesses",
          type: "list",
          items: [
            "Enhanced Communication: Clear and effective messaging across spaces.",
            "Improved Productivity: Seamless announcements streamline operations.",
            "Cost-Effective: Reduces the need for manual interventions.",
            "Safety and Security: Rapid alerts during emergencies.",
            "Better Customer Experience: Ensures visitors stay informed.",
            "Flexibility and Scalability: Adaptable to various settings and future needs."
          ]
        },
        {
          title: "Technical Specifications",
          type: "list",
          items: [
            "High-fidelity speakers for crystal clear sound reproduction",
            "Advanced digital signal processors for noise reduction",
            "Network-enabled systems for remote management",
            "Backup power systems for uninterrupted operation",
            "Integration capabilities with fire alarm and security systems"
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Professional Installation: Expert setup ensuring optimal coverage and performance",
            "Customized Solutions: Systems designed to match your specific requirements",
            "Ongoing Support: Regular maintenance and technical assistance",
            "Training: Comprehensive user training for system operation",
            "Future-Ready: Upgradeable systems to accommodate growing needs"
          ]
        }
      ]
    },
    {
      category: "PROTECTION",
      title: "Rodent Repellent Systems: Protecting Critical Spaces",
      description: "Rodent Repellent Systems, offered by Symmetric IT Services, use ultrasonic sound waves to create an environment that rodents find intolerable, ensuring your Data Center and other critical spaces remain rodent-free. These devices are scientifically backed, with research from the University of Nebraska proving their effectiveness in driving rodents away without harm.",
      image: "./images/Solutions/Building Technologies/Rodent Repellent Systems.png",
      details: [
        {
          title: "Why Choose Rodent Repellent Systems?",
          type: "list",
          items: [
            "Advanced Ultrasonic Technology: Efficiently deters rodents in enclosed spaces like offices and server rooms.",
            "Non-Chemical Solution: Avoids harmful poisons or chemicals, ensuring safety for humans and the environment.",
            "Silent to Humans: Ultrasonic waves are inaudible to people, maintaining a peaceful environment.",
            "Humane and Ethical: Recommended by PETA, as it safely repels rodents without killing them."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Data Centers & Server Rooms: Protect essential equipment from rodent-related damage.",
            "Offices and Indoor Spaces: Maintain a clean and secure workspace.",
            "Storage Areas: Keep inventory and materials safe from rodent damage",
            "Electrical Rooms: Prevent damage to critical electrical infrastructure"
          ]
        },
        {
          title: "System Features",
          type: "list",
          items: [
            "Variable Frequency Output: Prevents rodents from adapting to the sound",
            "Coverage Area Control: Adjustable range to suit different room sizes",
            "Low Power Consumption: Energy-efficient operation",
            "Maintenance-Free: No regular servicing required",
            "Easy Installation: Simple mounting and setup process"
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "24/7 Protection: Continuous operation for round-the-clock security",
            "Cost-Effective: Reduces expenses related to rodent damage and traditional pest control",
            "Environmentally Friendly: No toxic chemicals or waste",
            "Safe for Electronics: No interference with electronic equipment",
            "Long-Term Solution: Sustainable approach to rodent control"
          ]
        }
      ]
    },
    {
      category: "SAFETY",
      title: "VESDA: Advanced Smoke Detection for Early Fire Response",
      description: "VESDA (Very Early Smoke Detection Apparatus), offered by Symmetric IT Services, is a cutting-edge smoke detection system designed to detect even the smallest traces of smoke before a fire fully develops. Also known as Aspirating Smoke Detectors or Air Sampling Devices, VESDA systems provide real-time air sampling, ensuring rapid detection and response.",
      image: "./images/Solutions/Building Technologies/VESDA.png",
      details: [
        {
          title: "How VESDA Works",
          type: "list",
          items: [
            "Continuous Air Sampling: Uses vacuum system to draw air into a network of tubing",
            "Advanced Analysis: Laser technology detects smallest combustion particles",
            "Immediate Alerts: Triggers warnings at earliest signs of smoke",
            "Precise Monitoring: Tracks air quality changes in real-time"
          ]
        },
        {
          title: "Key Features",
          type: "list",
          items: [
            "Multiple Alarm Levels: Programmable thresholds for different response stages",
            "Wide Area Coverage: Single system can protect large spaces",
            "Flexible Installation: Adaptable to various environments and configurations",
            "Remote Monitoring: Access system status and alerts from anywhere",
            "Integration Capabilities: Works with existing fire safety and building management systems"
          ]
        },
        {
          title: "Benefits of VESDA Systems",
          type: "list",
          items: [
            "Early Detection: Responds to potential fires in their earliest stages.",
            "High Sensitivity: Detects even the smallest amounts of smoke, ensuring faster response times.",
            "Asset Protection: Ideal for high-value areas, such as data centers, server rooms, and industrial facilities.",
            "Real-Time Monitoring: Provides continuous air sampling for maximum safety."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Data Centers: Protect sensitive IT infrastructure",
            "Industrial Facilities: Monitor manufacturing and storage areas",
            "Clean Rooms: Maintain strict air quality control",
            "Historical Buildings: Preserve valuable artifacts and architecture",
            "Telecommunications Facilities: Safeguard critical communication equipment"
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Expert Installation: Professional setup and configuration",
            "Regular Maintenance: Scheduled system checks and cleaning",
            "24/7 Support: Round-the-clock technical assistance",
            "Custom Solutions: Tailored to your specific requirements",
            "Compliance Assurance: Meets all relevant safety standards and regulations"
          ]
        }
      ]
    },
    {
      category: "SAFETY",
      title: "Water Leak Detection Systems: Ensuring Safety and Operational Continuity",
      description: "A Water Leak Detection System, offered by Symmetric IT Services, is an advanced solution designed to identify leaks or spills using probes or sensing cables. These systems promptly trigger alarms to alert the maintenance team, ensuring rapid response to prevent damage and operational disruptions.",
      image: "./images/Solutions/Building Technologies/Water Leak Detection Systems.png",
      details: [
        {
          title: "Why Water Leak Detection Matters",
          type: "list",
          items: [
            "Critical Infrastructure Protection: Safeguard sensitive equipment and facilities",
            "Preventive Maintenance: Identify issues before they cause significant damage",
            "Cost Savings: Minimize repair expenses and downtime",
            "Environmental Responsibility: Reduce water waste and potential contamination"
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Data Centers & Server Rooms: Protecting sensitive equipment from water damage.",
            "Plant Rooms & Pantries: Ensuring operational safety.",
            "Hospitals: Safeguarding critical medical infrastructure.",
            "Commercial Spaces: Minimizing downtime and repair costs."
          ]
        },
        {
          title: "System Components",
          type: "list",
          items: [
            "Sensing Cables: Detect water presence along their entire length",
            "Point Sensors: Monitor specific areas or equipment",
            "Control Panels: Process signals and trigger alerts",
            "Integration Modules: Connect with building management systems",
            "Mobile Alerts: Instant notifications to maintenance teams"
          ]
        },
        {
          title: "Key Features",
          type: "list",
          items: [
            "Real-Time Monitoring: Continuous surveillance of critical areas",
            "Precise Location Detection: Identify exact leak positions",
            "Multiple Zone Coverage: Monitor different areas independently",
            "Adjustable Sensitivity: Customize detection thresholds",
            "Historical Data Logging: Track and analyze incidents"
          ]
        },
        {
          title: "Benefits of Symmetric IT Services' Solutions",
          type: "list",
          items: [
            "Early Detection: Avoid costly damages with timely alerts.",
            "Enhanced Safety: Protect valuable assets and infrastructure.",
            "Comprehensive Monitoring: Combine temperature, humidity, and water detection for total environmental control.",
            "24/7 Protection: Continuous monitoring for peace of mind",
            "Scalable Solutions: Expand coverage as needs grow"
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Expert Installation: Professional setup and configuration",
            "Regular Maintenance: Scheduled system checks and calibration",
            "Technical Support: Rapid response to system alerts",
            "Training: Comprehensive staff training on system operation",
            "Ongoing Optimization: System updates and improvements"
          ]
        }
      ]
    }
  ];

  const categories = [
    {
      className: "building",
      sections: [
        { title: "Building Technology Solutions", items: buildingTechSolutions }
      ]
    }
  ];

  return (
    <div className="solutions-container">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className={`category-container ${category.className}`}>
          {category.sections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="solutions-section">
              <h3 className="section-title">{section.title}</h3>
              <Carousel items={section.items} sectionId={`section-${categoryIndex}-${sectionIndex}`} />
            </section>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BuildingTechSolutions; 