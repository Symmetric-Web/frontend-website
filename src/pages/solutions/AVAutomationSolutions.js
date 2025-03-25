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

const AVAutomationSolutions = () => {
  const luxuryHomes = [
    {
      category: "ENERGY",
      title: "Energy Conservation",
      description: "Rising energy costs are impacting profitability and sustainability, making it essential to adopt smarter power usage habits and choices for a greener future. Symmetric IT Services offers LEED-compliant solutions to help monitor, optimize, and reduce energy consumption.",
      image: "/images/Solutions/AV and Automation Solution/Luxury Home/Energy Conservation.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Optimize Energy Usage: Reduce lighting energy consumption significantly while tracking usage and savings for your building, ensuring efficiency and cost-effectiveness.",
            "Connected and Integrated: Networked lighting control systems are designed for smart buildings or campuses, capable of managing and controlling thousands of devices seamlessly.",
            "Advanced Customization: Leverage a combination of sensor types, advanced logic, and integration options to enable highly customized solutions tailored to your needs."
          ]
        },
        {
          title: "Benefits of Energy Conservation Systems",
          type: "list",
          items: [
            "Maximize energy efficiency while minimizing waste, enhancing both sustainability and cost savings.",
            "Integration capabilities bring a vast ecosystem of devices under a single control system, simplifying energy consumption monitoring.",
            "Reduce energy usage by up to 15% through daylight harvesting and natural light control strategies.",
            "Customizable lighting preferences allow occupants to adjust settings via wall control panels, computer interfaces, or handheld transmitters for optimal comfort and efficiency."
          ]
        },
        {
          title: "Eliminate Power Wastage",
          type: "list",
          items: [
            "Implement diverse control strategies to optimize power savings across lighting, shades, and HVAC systems.",
            "Leverage innovative control software for efficient facility management, enabling administrators to manage lighting, AV, and other resources seamlessly.",
            "Benefit from a single platform that integrates lighting and shade control, advanced customization, and energy management for maximum efficiency."
          ]
        },
        {
          title: "System Integration",
          type: "list",
          items: [
            "Centralized Control: Facility teams can easily analyze and control energy usage across multiple buildings and systems",
            "Smart Building Integration: Seamless connection with existing building management systems",
            "Real-Time Monitoring: Track and analyze energy consumption patterns for optimization",
            "LEED Compliance: Solutions designed to meet sustainability standards and certifications"
          ]
        }
      ]
    },
    {
      category: "ENTERTAINMENT",
      title: "Home Theatres",
      description: "Digital content has transformed the way we entertain ourselves at home. But to make the most of this content, we need to experience it on a movie cinema like scale with a home theatre system. We help you recreate this experience in your own home with elements like a central media library, multi-room audio and very large screen home cinemas, tailored to your unique preferences.",
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/Home Theatres.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Integrated Control: Experience a fully integrated home theater with advanced AV systems, seamless lighting control, and all-digital video distribution for a truly immersive experience.",
            "Mesmerizing Video: Immerse yourself in stunning visuals with large-screen displays, including laser projectors, 100\"+ flat panels, and video walls, all delivering 4K resolution and exceptional color reproduction.",
            "Immersive Sound: Enjoy a cinematic surround sound experience that enhances the realism of music, movies, games, and live sports, bringing every moment to life."
          ]
        },
        {
          title: "Experiences that Home Theatres Can Create",
          type: "list",
          items: [
            "Upgrade your Home Theatre to deliver a cinema-like experience right at home.",
            "Enjoy larger-than-life movies, music, and games on a big screen display.",
            "Access a centralized movie and music library, keeping all your digital content in one place.",
            "Use an integrated control interface to manage the AV system, lighting, and air-conditioning, setting the perfect ambience.",
            "Experience every note in stereo or surround sound, with support for Dolby Atmos and DTS for an immersive audio experience."
          ]
        },
        {
          title: "User-friendly Home Theatres Customized to Your Preferences",
          type: "list",
          items: [
            "Experience a fully integrated home theater with AV systems, lighting control, and all-digital video distribution.",
            "Support for a wide range of content formats, including CD, DVD, high-resolution audio, 4K video, streaming sources, and more.",
            "Enjoy larger-than-life high-definition video with laser projectors and cinema-quality sound for an immersive experience.",
            "Control all your integrated AV equipment, HVAC, lighting, and more, right at your seat."
          ]
        },
        {
          title: "Technical Specifications",
          type: "list",
          items: [
            "4K/8K Resolution Support: Latest video processing technology for crystal clear images",
            "Dolby Atmos & DTS:X: Advanced audio processing for 3D surround sound",
            "Smart Integration: Compatible with popular streaming services and smart home platforms",
            "Professional Calibration: Expert setup for optimal audio-visual performance",
            "Custom Seating: Ergonomic theater seating with premium materials"
          ]
        }
      ]
    },
    {
        category: "AUTOMATION",
        title: "Lighting and Smart Controls",
        description: "Intelligent lighting and automation systems can significantly enhance both work and living spaces by creating the right atmosphere or adjusting environmental factors automatically. These systems combine sensors with an integrated control platform to manage and automate spaces such as rooms, offices, homes, buildings, or campuses.",
        image: "./images/Solutions/AV and Automation Solution/Luxury Home/Lighting & Automation.webp",
        details: [
          {
            title: "Key Features",
            type: "list",
            items: [
              "Smart, Human-Centric Lighting: Customize lighting to enhance the experience for employees, customers, and guests. Personalize settings based on specific applications to create the ideal environment.",
              "Simplified Asset Monitoring and Management: Streamline the management of enterprise assets and integrate with Building Management Systems (BMS) to support facilities management teams.",
              "Boost Energy Efficiency: Maximize energy efficiency by remotely adjusting shading, lighting, HVAC, and other systems, helping to reduce your organization's carbon footprint.",
              "Smart Controls and Automation: Leverage control systems and room resource management tools to enable virtual control and monitoring of AV resources, system diagnostics, network activity logs, and event scheduling from anywhere."
            ]
          },
          {
            title: "Benefits of Lighting and Automation Solutions",
            type: "list",
            items: [
              "Enhance aesthetics and productivity in both living and working spaces through intelligent lighting and automation.",
              "Seamlessly integrate devices into a unified system, making it easy to monitor and optimize energy consumption.",
              "Reduce energy consumption by up to 15% through daylight harvesting, natural light control, and automated dimming systems.",
              "Advanced control software improves facility management by allowing administrators to manage lighting, AV systems, and other resources efficiently.",
              "Easy access to advanced lighting control via touch panels, button interfaces, or remote control, providing flexibility and convenience."
            ]
          },
          {
            title: "Combining the Benefits of Lighting, Control, and Automation",
            type: "list",
            items: [
              "Personalized lighting settings enable occupants to adjust lighting according to their preferences via wall panels, computers, or handheld transmitters.",
              "Smart sensors allow for features like dimming, motion detection, daylight harvesting, and ambient light sensing to optimize energy usage.",
              "Create complex lighting scenes and save them as presets, switching between them effortlessly with a single button.",
              "Room resource management tools provide virtual control and monitoring of AV resources, system diagnostics, network activity logs, and event scheduling from anywhere, supported by a central help desk."
            ]
          },
          {
            title: "LEED Compliance and Energy Management",
            type: "list",
            items: [
              "LEED-compliant solutions for monitoring and optimizing energy usage",
              "Human-centric lighting (HCL) environment to boost productivity and reduce stress",
              "Integration with building management systems for comprehensive control",
              "Advanced analytics for tracking and improving energy efficiency",
              "Automated scheduling and scene management for optimal energy usage"
            ]
          }
        ]
      },
    {
      category: "AUTOMATION",
      title: "Smart Home Systems",
      description: "A smart home should enhance your lifestyle, not complicate it. The modern smart home integrates multi-room audio and video entertainment, lighting management, control systems, energy savings, and surveillance systems to create a seamless living experience.",
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/Smart Home.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Intelligent Control: Easily manage all your electronic and electrical devices through a unified platform, using touch-screen or voice interfaces for convenience.",
            "Multi-Room Music: Stream music to any room in your home, while enjoying video content or games on screens in the bedroom, living room, or any other space.",
            "Access All Your Content: Store your entire music and DVD/Blu-ray collection on a local media server, and access it anytime, or stream from your favorite services effortlessly.",
            "Smart Sensors and Software: Leverage sensors, cameras, and intelligent software to monitor and optimize home security and energy consumption, ensuring a safer and more efficient living environment."
          ]
        },
        {
          title: "Experiences that Smart Homes Can Create",
          type: "list",
          items: [
            "Control at your fingertips for lighting, entertainment, security, and HVAC systems, simplifying your daily routine tasks with just a single click.",
            "Preset lighting and air conditioning systems allow you to create the most comfortable environment for different moods and activities.",
            "Remote management of smart systems ensures everything is running smoothly when you're away, and you can even turn on devices before returning home.",
            "Access your home anywhere, anytime to check on or adjust your settings from any location."
          ]
        },
        {
          title: "Intuitive Controls and Technologies",
          type: "list",
          items: [
            "IP-based surveillance solutions provide remote security management, giving you peace of mind.",
            "Enjoy high-quality, high-definition entertainment from a central media server, accessible throughout your home.",
            "Elegantly designed controls and interfaces offer a seamless user experience, blending effortlessly into your home decor.",
            "Energy conservation is made easier with intelligent lighting features that optimize power usage."
          ]
        },
        {
          title: "Our Commitment",
          type: "list",
          items: [
            "Expert Integration: Seamless combination of various smart home technologies",
            "Personalized Solutions: Custom-designed systems based on your lifestyle",
            "Future-Ready: Scalable solutions that can grow with your needs",
            "Ongoing Support: Comprehensive maintenance and technical assistance",
            "User Training: Detailed guidance on system operation and features"
          ]
        }
      ]
    },
    {
      category: "SECURITY",
      title: "Smart Lock Solution",
      description: "Symmetric IT Services provides an advanced smart lock solution that simplifies access management while enhancing security. Our solution addresses the challenges of managing secure access to properties, especially with multiple users and remote access needs.",
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/smart locks.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Keyless Convenience: Access via fingerprint, PIN, RFID, or smartphone app",
            "Remote Control: Monitor and control locks in real-time, even when you're away",
            "Seamless Integration: Works with popular smart home systems",
            "Reliable Security: Includes manual key backup and durable design"
          ]
        },
        {
          title: "Access Methods",
          type: "list",
          items: [
            "Biometric Access: Secure fingerprint recognition for authorized users",
            "Digital PIN Codes: Create temporary or permanent access codes",
            "Mobile App Control: Manage access through user-friendly smartphone interface",
            "RFID Cards/Tags: Quick access using contactless technology",
            "Traditional Keys: Backup mechanical key system for emergencies"
          ]
        },
        {
          title: "Smart Features",
          type: "list",
          items: [
            "Real-Time Monitoring: Track all lock activities and access attempts",
            "Remote Management: Grant or revoke access from anywhere",
            "Auto-Lock Function: Automatically secure doors after entry",
            "Activity Logs: Detailed history of all access events",
            "Low Battery Alerts: Timely notifications for maintenance"
          ]
        },
        {
          title: "Security & Integration",
          type: "list",
          items: [
            "Advanced Encryption: Secure communication between lock and devices",
            "Smart Home Integration: Compatible with major home automation systems",
            "Emergency Access: Multiple backup access methods",
            "Anti-Tampering Alerts: Immediate notifications of unauthorized attempts",
            "Cloud Backup: Secure storage of access settings and logs"
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Residential Homes: Secure family access and guest management",
            "Rental Properties: Simplified tenant access management",
            "Home Offices: Control access for staff and visitors",
            "Vacation Homes: Remote access management for seasonal properties"
          ]
        }
      ]
    }
  ];

  const networkControl = [
    {
      category: "CONTROL",
      title: "Command Centre Solution",
      description: "Businesses and organizations require a central hub to monitor, control, and manage various systems—security, operations, or communications-efficiently and in real-time. Our Command Centre solution integrates various systems into a unified platform for real-time monitoring and decision-making.",
      image: "./images/Solutions/AV and Automation Solution/Network Control and Automation/Command Centre .webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Unified Platform: Integrate CCTV, alarms, access control, and other systems into a single interface",
            "Real-Time Monitoring: Live surveillance and system status updates for immediate response",
            "Intuitive Interface: Custom layouts and controls for efficient navigation and operation",
            "Scalable Architecture: Adaptable for operations of any size with room for growth"
          ]
        },
        {
          title: "System Integration",
          type: "list",
          items: [
            "Security Systems: CCTV, access control, and alarm system integration",
            "Building Management: HVAC, lighting, and energy management systems",
            "Communication Tools: Intercom, public address, and emergency notification systems",
            "Custom Integrations: Support for third-party systems and specialized equipment"
          ]
        },
        {
          title: "Operational Benefits",
          type: "list",
          items: [
            "Centralized Control: Manage all systems from a single location",
            "Enhanced Efficiency: Streamlined operations and faster response times",
            "Improved Security: Comprehensive monitoring and incident management",
            "Data Analytics: Actionable insights for better decision-making",
            "Cost Optimization: Reduced operational costs through efficient management"
          ]
        },
        {
          title: "Technical Capabilities",
          type: "list",
          items: [
            "Multi-Screen Support: Configure multiple displays for comprehensive monitoring",
            "Advanced Analytics: AI-powered incident detection and response",
            "Remote Access: Secure mobile and web-based control options",
            "Redundancy: Backup systems and failover protection",
            "Customizable Alerts: Automated notifications based on predefined triggers"
          ]
        },
        {
          title: "Implementation Process",
          type: "list",
          items: [
            "Needs Assessment: Evaluate current systems and requirements",
            "Custom Design: Tailored solution based on operational needs",
            "Seamless Integration: Professional installation and system configuration",
            "Staff Training: Comprehensive training for operators and administrators",
            "Ongoing Support: 24/7 technical assistance and system maintenance"
          ]
        }
      ]
    },
    {
      category: "CONTROL",
      title: "Operations Centres",
      description: "Audio-visual technology is crucial in control and monitoring environments where swiftly identifying and resolving issues is vital. It significantly impacts centralized operations centers, such as Network Operation Centers (NOCs), Security Operation Centers (SOCs), or crisis management applications, by enhancing the management of critical networks and physical infrastructure.",
      image: "./images/Solutions/AV and Automation Solution/Network Control and Automation/Operations Centres.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Situational Data Visibility: High-performance video walls deliver instant access to critical information from multiple sources, enhancing situational awareness and enabling quicker, more informed decision-making.",
            "Real-Time Information Access: Access a variety of information—audio, video, and data feeds—to gain a deeper understanding of events as they unfold, ensuring timely and informed responses.",
            "Video collaboration capability: Robust video and audio conferencing solutions to bring in-room and remote teams together for a coordinated response"
          ]
        },
        {
          title: "Benefits of an Operations Centre",
          type: "list",
          items: [
            "Streamline operational complexity with Network Operation Centres (NOCs) to optimize monitoring and management.",
            "View live data feeds on large multi-screen displays, allowing you to switch between or combine screens for a detailed analysis of data.",
            "Operate 24/7 to manage critical networks, broadcasts, processes, or security operations, ensuring continuous monitoring and support.",
            "Collaborate with external resources for problem resolution and share relevant data quickly in real-time situations.",
            "Easily manage room environments (lighting, temperature, etc.) and AV equipment seamlessly to ensure optimal functionality."
          ]
        },
        {
          title: "Latest Technologies for Monitoring and Crisis Management",
          type: "list",
          items: [
            "Instantly switch between multiple content sources and data feeds to analyze dynamic information in real-time.",
            "AV over IP technology delivers high-quality, real-time audio and video streaming, ensuring clear and reliable communication.",
            "High-performance video walls offer exceptional data visibility and legibility from every seat, with an unobstructed line of sight for all viewers.",
            "Advanced video controllers enable flexible display configurations, allowing data to be presented in various sizes and formats as needed."
          ]
        },
        {
          title: "System Integration",
          type: "list",
          items: [
            "Video Wall Systems: Large-scale displays for comprehensive data visualization",
            "Control Systems: Centralized management of all AV and environmental systems",
            "Network Infrastructure: Robust connectivity for real-time data transmission",
            "Collaboration Tools: Advanced solutions for team communication and coordination",
            "Environmental Controls: Integrated management of room conditions for optimal operation"
          ]
        }
      ]
    },
  ];

  const videoCollaboration = [
    {
      category: "AUDITORIUM",
      title: "Auditorium Solution",
      description: "Redefining the auditorium AV experience enhances both large conferences and intimate gatherings. Key elements include ambiance, lighting, sound, and comfortable seating, engaging audiences through various sensory touchpoints.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/Auditorium Solution.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Rich Audio-Visual Experience: High-definition displays, projectors, and advanced audio systems",
            "Multiple Audience Engagement Options: Interactive tools and technologies for enhanced participation",
            "Recording Capabilities: Multiple recording options for content preservation and distribution",
            "Live-Streaming Integration: Professional streaming setup for remote audience engagement",
            "Automated Lighting Control: Preset lighting scenarios for different event types"
          ]
        },
        {
          title: "Smart Control Systems",
          type: "list",
          items: [
            "Centralized Control: Manage lighting, sound, HVAC, drapes, and AV equipment through a single interface",
            "Intuitive Touch Interface: Easy-to-use control panel for seamless operation",
            "Remote Monitoring: Real-time monitoring and adjustment of audio-visual experience",
            "Automated Scenarios: Pre-programmed settings for different event types",
            "Environmental Control: Integrated management of temperature and ventilation"
          ]
        },
        {
          title: "Audio-Visual Excellence",
          type: "list",
          items: [
            "High-Definition Displays: Crystal clear visual presentation for maximum impact",
            "Professional Sound Systems: Immersive audio experience with perfect acoustics",
            "Advanced Projection: State-of-the-art projectors for large-scale presentations",
            "Lighting Automation: Sophisticated lighting control for perfect ambiance",
            "Digital Signal Processing: Superior audio quality and clarity"
          ]
        },
        {
          title: "Event Management Features",
          type: "list",
          items: [
            "Live Event Support: Professional management of audio-visual elements during events",
            "Streaming Services: High-quality live streaming to remote audiences",
            "Recording Solutions: Multiple options for event recording and archiving",
            "Content Management: Easy handling of multimedia content and presentations",
            "Technical Support: On-call assistance for smooth event execution"
          ]
        },
        {
          title: "Integration Benefits",
          type: "list",
          items: [
            "Seamless Operation: Synchronized control of all auditorium systems",
            "Enhanced User Experience: Intuitive interfaces for staff and presenters",
            "Future-Ready: Scalable solutions that accommodate technological advances",
            "Energy Efficiency: Smart management of power consumption",
            "Maintenance Support: Regular system updates and technical assistance"
          ]
        }
      ]
    },
    {
      category: "TRAINING",
      title: "AV Integrated Training Rooms",
      description: "Make training sessions more effective, accessible, and affordable with advanced technology-enabled training rooms from Symmetric IT Services. Training is essential for every organization, and achieving Learning and Development goals requires modern AV technology.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/AV Integrated Training Room.webp",
      details: [
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Comprehensive AV design for smart, efficient training environments",
            "Video conferencing to enable remote learning and collaboration",
            "Streaming of educational materials like lectures, videos, and podcasts",
            "Laboratories to support advanced learning, research, and data analysis",
            "Dynamic, easy-to-use training spaces for greater engagement"
          ]
        },
        {
          title: "Technical Features",
          type: "list",
          items: [
            "High-quality visuals with intelligent audio for clearer presentations",
            "Interactive and centrally operated sessions for maximum convenience",
            "Seamless remote connectivity for effective team collaboration",
            "Integrated audio, video, lighting, and control systems",
            "Scalable solutions to fit any educational or corporate training program"
          ]
        },
        {
          title: "Smart Classroom Solutions",
          type: "list",
          items: [
            "Flexible and scalable infrastructure for any training program",
            "Interactive whiteboards and collaboration technology",
            "Advanced scheduling and room management tools",
            "Integrated control systems for easy operation",
            "Future-ready technology for evolving training needs"
          ]
        }
      ]
    },
    {
      category: "CONFERENCE",
      title: "Boardroom / Conference Rooms",
      description: "Boardrooms and conference rooms are essential spaces where teams brainstorm, discuss ideas, negotiate, and strategize the way forward. These rooms are designed to foster seamless communication, connection, and collaboration—essential for helping teams achieve more together.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/Boardroom_Conference Rooms.webp",
      details: [
        {
          title: "Modern Collaboration Features",
          type: "list",
          items: [
            "High-quality visuals and audio systems for clear communication",
            "Video conferencing capabilities for global team collaboration",
            "Bring-your-own-device (BYOD) support with device-agnostic setups",
            "Large displays for impactful presentations",
            "Integrated audio setups with microphones and speakers"
          ]
        },
        {
          title: "Key Advantages",
          type: "list",
          items: [
            "AV Control and Lighting Automation",
            "Sound Reinforcement System",
            "Collaboration & Conference System",
            "Retrofittable, cost-effective solutions",
            "Seamless interoperability with existing technology",
            "Remote AV Asset Management",
            "Prime support to guarantee 100% uptime"
          ]
        },
        {
          title: "Professional Services",
          type: "list",
          items: [
            "Expert system design and installation",
            "Remote maintenance for consistent performance",
            "Regular upgrades and maintenance checks",
            "15+ years of implementation experience",
            "Solutions for various room sizes and requirements"
          ]
        },
        {
          title: "Business Benefits",
          type: "list",
          items: [
            "Enhanced productivity through effective collaboration",
            "Improved business continuity",
            "Reduced operational costs",
            "Strengthened company culture through clear communication",
            "Future-ready scalable solutions"
          ]
        }
      ]
    },
    {
      category: "TOWN HALL",
      title: "Cafeteria and Town Hall Solutions",
      description: "Town Halls (or all-hands meetings) are essential for engaging employees, discussing key topics, and aligning teams. Whether in-person or virtual, creating a space for the whole organization to participate can be challenging. Symmetric IT Services helps transform cafeterias into large town hall or event spaces by integrating modern technologies.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/Cafeteria and town halls.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Multi-use space transformation - cafeteria, town hall, and live event space in one",
            "Multi-camera video capture with auto tracking for natural presenter movement",
            "Live streaming and recording with cloud-based storage for on-demand access",
            "Powerful management and production tools for simplified event control",
            "Advanced controls for quick 'backstage' access to all systems"
          ]
        },
        {
          title: "Business Benefits",
          type: "list",
          items: [
            "Smoother, more natural engagement in virtual, in-person, or hybrid town halls",
            "Broadcast-quality stage setup for town halls, investor meetings, and media briefings",
            "Improved audience engagement with strategic display placement",
            "Quick switchability between cafeteria and town hall modes",
            "Enhanced environment with live TV, digital signage, and background music"
          ]
        },
        {
          title: "Technical Capabilities",
          type: "list",
          items: [
            "Multi-camera video capture with auto-tracking technology",
            "Hardware-based or soft/cloud VC codecs for seamless communication",
            "Programmed audio system with ceiling-mounted microphones and speakers",
            "Centralized control system with touch panel/tablet interface",
            "Networked AV switchers and auxiliary wall plates for flexible routing"
          ]
        },
        {
          title: "Space Optimization",
          type: "list",
          items: [
            "Efficient real estate utilization through multi-purpose design",
            "Seamless transition between different space configurations",
            "Integrated environmental controls for optimal comfort",
            "Flexible seating and staging arrangements",
            "Advanced acoustics management for various use cases"
          ]
        }
      ]
    },
    {
      category: "HUDDLE",
      title: "Collaborative Huddle Rooms",
      description: "Large boardrooms and meeting rooms can be inefficient for smaller groups, leading to underutilized space and wasted resources. For smaller teams, huddle rooms are a far more effective solution, offering the ideal environment for brainstorming, interviews, or one-on-one meetings.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/collaborative Huddle rooms.webp",
      details: [
        {
          title: "System Features",
          type: "list",
          items: [
            "Robust: Built for reliability and consistent performance",
            "Future-Proof: Designed to accommodate evolving technology needs",
            "Scalable: Easily expandable as your organization grows",
            "Easily Manageable Remotely: Centralized control and monitoring capabilities",
            "Video conferencing and UCC features for seamless collaboration"
          ]
        },
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Quiet Environment: Focused space for interactive discussions without distractions",
            "Spontaneous Collaboration: Perfect for on-the-go meetings and impromptu brainstorming",
            "Increased Flexibility: More agile way to accomplish tasks and foster collaboration",
            "Cost-Effective Productivity: Budget-friendly solution for enhanced team productivity",
            "Ideal for hybrid work setups and small group interactions"
          ]
        },
        {
          title: "Space Design",
          type: "list",
          items: [
            "Optimized for 2-4 people with flexible seating arrangements",
            "Integrated video conferencing and collaboration tools",
            "Smart space utilization for maximum efficiency",
            "Acoustic treatment for optimal sound quality",
            "User-friendly technology interface"
          ]
        },
        {
          title: "Technology Integration",
          type: "list",
          items: [
            "Advanced video conferencing capabilities",
            "Wireless content sharing solutions",
            "Interactive displays and whiteboards",
            "High-quality audio systems",
            "Simple, intuitive control systems"
          ]
        }
      ]
    },
    {
      category: "HYBRID",
      title: "Hybrid Collaboration Rooms",
      description: "Hybrid collaboration is becoming increasingly essential as organizations recognize the need for solutions that offer flexibility, agility, and resilience in today's evolving work environment. Symmetric IT Services helps organizations overcome the challenges and embrace the opportunities of hybrid work by creating meeting rooms that integrate seamlessly with virtual collaboration tools or unified communications (UC) infrastructure.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/hybrid collaboration rooms.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Common connected experience for virtual and real-world meeting rooms",
            "Cloud-based management tools for enhanced collaboration",
            "Remote help desk support and room asset monitoring",
            "Seamless integration with UC functionality",
            "Cross-platform and cross-device compatibility"
          ]
        },
        {
          title: "Business Benefits",
          type: "list",
          items: [
            "Create flexible spaces that can quickly transform for various activities",
            "Support for multiple collaboration platforms (Teams, Zoom, Webex, etc.)",
            "Consistent user experience across all devices and locations",
            "Smooth integration with UC functionality using vendor-certified devices",
            "Enhanced productivity through seamless collaboration tools"
          ]
        },
        {
          title: "Scalability & Flexibility",
          type: "list",
          items: [
            "Versatile solution adaptable to various business needs",
            "Scalable design suitable for small teams or large groups",
            "Cloud-based infrastructure for meetings, training, and town halls",
            "Wide range of certified devices from leading hardware partners",
            "Flexible deployment options for different environments"
          ]
        },
        {
          title: "Technology Integration",
          type: "list",
          items: [
            "Advanced video conferencing capabilities",
            "High-quality audio and visual systems",
            "Integrated control and management tools",
            "Cloud-based collaboration features",
            "Remote monitoring and support capabilities"
          ]
        }
      ]
    },
    {
      category: "VIDEO CONFERENCING",
      title: "Understanding Video Conferencing",
      description: "The next best thing to meeting in person is connecting through video conferencing, allowing for seamless interaction without being physically present. Modern video conferencing systems provide crystal-clear high-definition visuals and audio for a smooth and engaging experience. Today's fully integrated video conferencing solutions are designed for reliability, ensuring your meetings and presentations proceed without a hitch.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/video conferencing rooms.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Crystal-clear high-definition visuals and audio for smooth engagement",
            "Session recording and transcription capabilities for easy reference",
            "Plug-and-play systems with true-to-life picture quality",
            "Fully integrated solutions designed for reliability",
            "Easy content sharing and collaboration tools"
          ]
        },
        {
          title: "Business Benefits",
          type: "list",
          items: [
            "Enhanced communication across teams for better collaboration",
            "Greater flexibility to work from any location",
            "Reduced travel time, costs, and carbon emissions",
            "Faster project completion with fewer delays",
            "Improved overall productivity and team efficiency"
          ]
        },
        {
          title: "Technology Solutions",
          type: "list",
          items: [
            "Proprietary technologies and top-tier IP integration",
            "Smooth, uninterrupted conferencing experience",
            "Reliable, scalable, and easy-to-use systems",
            "Premium quality hardware and software solutions",
            "Unified, user-friendly environment for all participants"
          ]
        },
        {
          title: "Implementation Benefits",
          type: "list",
          items: [
            "Simple and flexible meeting setup",
            "Cost-effective solutions for organizations of all sizes",
            "Trusted by organizations worldwide",
            "Comprehensive support and maintenance",
            "Seamless integration with existing infrastructure"
          ]
        }
      ]
    },
    {
      category: "MULTIPURPOSE",
      title: "Multi-purpose Rooms",
      description: "As real-estate costs appreciate, most businesses in urban locations need to utilise their space more productively. This makes multipurpose or multi-utility spaces – which can perform more than one business function – an extremely powerful tool in improving the ROI of modern office spaces. Multipurpose Halls designed by Symmetric IT Services provide businesses with flexible spaces which can quickly be adapted for different types of collaborative events and audience sizes.",
      image: "./images/Solutions/AV and Automation Solution/Video collaboration/multipurpose rooms.webp",
      details: [
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Create flexible spaces that quickly transform for various activities",
            "Increase ROI on office space by using one room for multiple business functions",
            "Provide teams with access to additional collaboration, conferencing or training facilities",
            "AV system presets help make effortless adjustments instantly between modes",
            "Leverage networked AV to allow quick re-alignment of seating and AV tools"
          ]
        },
        {
          title: "Space Flexibility",
          type: "list",
          items: [
            "Divisible rooms for different configurations",
            "Adaptable layouts for various business functions",
            "Combined space options for larger events",
            "Suitable for town halls, press conferences, and investor meetings",
            "Quick transformation between different use cases"
          ]
        },
        {
          title: "Technology Integration",
          type: "list",
          items: [
            "Flexible connectivity interfaces for various collaborative applications",
            "Remote operation capability from centralized backroom",
            "Real-time wired and wireless sharing systems",
            "Ceiling-mounted beam tracking microphones",
            "Adaptable audio routing based on room configuration"
          ]
        },
        {
          title: "Productivity Features",
          type: "list",
          items: [
            "Enhanced workspace efficiency through AV technology",
            "Seamless transition between different room modes",
            "Integrated collaboration tools for multiple use cases",
            "Centralized control and management systems",
            "Optimized space utilization for maximum ROI"
          ]
        }
      ]
    }
  ];

  const visualSolutions = [
    {
      category: "DIGITAL SIGNAGE",
      title: "Digital Signage",
      description: "Digital signage is everywhere, from eye-catching advertisements in malls and restaurant menu boards to movie schedules in theaters. It's a powerful blend of hardware and software, seamlessly working together to display multimedia content that grabs attention. With Symmetric IT Services' digital display solutions, you can efficiently distribute relevant content, from social media feeds to company updates, across multiple locations or spaces with a single click.",
      image: "./images/Solutions/AV and Automation Solution/Visual Solutions/Digital Signage.webp",
      details: [
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Drive purchase decisions at the point of sale",
            "Strengthen and communicate brand identity",
            "Create a memorable impact during product launches",
            "Educate and keep employees or customers informed and updated",
            "Support navigation and wayfinding within the premises"
          ]
        },
        {
          title: "Video Wall Features",
          type: "list",
          items: [
            "Multiple displays tiled to form one large, cohesive screen",
            "High-resolution images and videos on a grand scale",
            "Immersive visual impact for enhanced engagement",
            "Seamless content distribution across multiple locations",
            "Cloud-based management for easy updates"
          ]
        },
        {
          title: "Industry Applications",
          type: "list",
          items: [
            "Corporate: Internal communications and branding",
            "Tourism & Hospitality: Guest information and entertainment",
            "Education: Campus communications and wayfinding",
            "Retail: Product promotions and customer engagement",
            "Public Spaces: Information display and advertising"
          ]
        },
        {
          title: "Implementation Solutions",
          type: "list",
          items: [
            "End-to-end digital signage solutions for various environments",
            "Cloud-based content management systems",
            "Interactive display capabilities",
            "Expansive video wall configurations",
            "Industry-specific customization options"
          ]
        }
      ]
    },
    {
      category: "PROJECTOR",
      title: "Projector Solution",
      description: "Customers need high-quality, reliable projectors for business, education, or home use, with easy integration into existing systems. Our projectors deliver bright, sharp images with customizable features for various settings.",
      image: "./images/Solutions/AV and Automation Solution/Visual Solutions/projector solutions.webp",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "High-quality, bright and sharp image projection",
            "Easy integration with existing systems",
            "Simple controls and minimal setup requirements",
            "Customizable features for different environments",
            "Scalable solutions for future expansion"
          ]
        },
        {
          title: "User Experience",
          type: "list",
          items: [
            "Intuitive interface for easy operation",
            "Quick setup and configuration",
            "Seamless device compatibility",
            "Flexible mounting options",
            "User-friendly control systems"
          ]
        },
        {
          title: "Technical Benefits",
          type: "list",
          items: [
            "Advanced image processing technology",
            "Multiple input/output options",
            "Wireless connectivity capabilities",
            "Energy-efficient operation",
            "Low maintenance requirements"
          ]
        },
        {
          title: "Value Addition",
          type: "list",
          items: [
            "Professional installation services",
            "Consistent performance monitoring",
            "Customization options for specific needs",
            "Comprehensive technical support",
            "Cost-effective yet feature-rich solutions"
          ]
        }
      ]
    }
  ];

  const categories = [
    {
      className: "av-automation",
      sections: [
        { title: "Luxury Home Solutions", items: luxuryHomes },
        { title: "Network Control & Automation Solutions", items: networkControl },
        { title: "Video Collaboration & Unified Communication", items: videoCollaboration },
        { title: "Visual Solutions", items: visualSolutions }
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

export default AVAutomationSolutions;