import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Solutions.css';

// Create context for carousel
const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

const Card = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = () => {
    setIsOpen(false);
    onCardClose(index);
  };

  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target.classList.contains('expanded-overlay')) {
      handleClose();
    }
  };

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
  }, [isOpen]);

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
                  className={`expanded-image ${item.image.includes("Building Management Solution") ? 'square-image' : ''}`}
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

const Solutions = () => {
  const networkingSolutions = [
    {
      category: "CONNECTIVITY",
      title: "Aerial Fiber Optic Connectivity Solutions",
      description: "Symmetric IT Services provides cutting-edge Aerial Fiber Optic Connectivity Solutions designed for fast, reliable, and scalable communication networks. Ideal for areas where underground cabling is not feasible, our solutions ensure seamless data transmission with minimal disruption.",
      image: "./images/Solutions/Networking Solutions/Aerial Fiber Solution.png",
      details: [
        {
          title: "Our Aerial Fiber Optic Connectivity Solutions",
          type: "list",
          items: [
            "ADSS (All-Dielectric Self-Supporting) Cables: Lightweight and durable, ideal for spanning utility poles without metal reinforcements.",
            "Figure-8 Cables: Integrated steel wire support for added strength over longer spans.",
            "Weather-Resistant: Engineered to withstand UV radiation, wind, and extreme temperatures."
          ]
        },
        {
          title: "Pole Mounting Solutions",
          type: "list",
          items: [
            "Custom Mounting Accessories: Poles, clamps, and brackets designed for secure cable installations.",
            "Long-Span Capability: Solutions for large spans between poles to reduce infrastructure costs.",
            "Pre-Tensioned Assemblies: Simplify installations with pre-configured systems for stability and longevity."
          ]
        },
        {
          title: "Cable Accessories",
          type: "list",
          items: [
            "Suspension Clamps: Secure cables with excellent vibration damping.",
            "Anchoring Clamps: Hold cables firmly at terminal points or poles.",
            "Joint Closures: Protect fiber splices from environmental exposure."
          ]
        },
        {
          title: "Integrated Network Design & Deployment",
          type: "list",
          items: [
            "Site Surveys: Assess geographical and environmental factors for optimal route planning.",
            "Installation Services: Expert deployment to minimize sagging and ensure proper tensioning.",
            "End-to-End Connectivity: From aerial cable laying to network termination at client premises."
          ]
        },
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Cost-Effective: Eliminates the need for extensive trenching or underground installation.",
            "Rapid Deployment: Quick and efficient installation in urban, rural, or remote areas.",
            "High Performance: Supports high-bandwidth and low-latency communication needs.",
            "Durability: Built to endure environmental challenges like high winds and ice loading."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Rural and Remote Areas: Cost-efficient connectivity where underground cabling is not practical.",
            "Utility Providers: Extend smart grid communications with minimal infrastructure changes.",
            "Urban Networks: Expand or upgrade existing networks with minimal ground disturbance.",
            "Industrial Parks: Reliable connectivity for remote industrial operations."
          ]
        },
        {
          title: "Why Choose Symmetric IT Services?",
          type: "list",
          items: [
            "Turnkey Solutions: From planning to deployment, we handle every aspect of aerial connectivity.",
            "Premium Quality Materials: Industry-compliant cables and accessories for robust performance.",
            "Experienced Team: Proven expertise in delivering aerial fiber optic projects.",
            "Scalable Systems: Design tailored to future-proof your network."
          ]
        }
      ]
    },
    {
      category: "CONNECTIVITY",
      title: "Underground Fiber Connectivity Solution",
      description: "Symmetric IT Services delivers robust, secure, and scalable underground fiber connectivity solutions, enabling high-speed data transmission for telecommunications, smart cities, and critical infrastructure projects.",
      image: "./images/Solutions/Networking Solutions/Underground Fiber Connectivity Solution.png",
      details: [
        {
          title: "Key Components",
          type: "list",
          items: [
            "Fiber Optic Cables: Armored, single-mode or multi-mode cables designed for durability, high bandwidth, and long-distance performance.",
            "Conduits & Ducts: HDPE or PVC conduits protect cables from environmental and physical damage. Microducts enable future expansions without additional excavation.",
            "Access Points: Strategically placed manholes and handholes for secure access and easy maintenance.",
            "Cable Management: Splice closures, patch panels, and organized trays ensure efficient cable handling and low signal loss.",
            "Monitoring & Security: Real-time fiber monitoring systems detect faults instantly. Tamper-resistant enclosures ensure physical security."
          ]
        },
        {
          title: "Deployment Process",
          type: "list",
          items: [
            "Planning and Surveying: Conduct thorough route surveys to identify the most efficient and secure cable paths while avoiding potential risks.",
            "Trenching: Use horizontal directional drilling (HDD) or open-cut trenching to lay conduits at appropriate depths for safety and compliance.",
            "Cable Installation: Place cables securely in conduits, manage slack effectively, and perform fusion splicing for high-quality connections.",
            "Testing and Commissioning: Use OTDR (Optical Time-Domain Reflectometer) and other testing tools to ensure signal quality, detect faults, and validate performance.",
            "Backfilling and Restoration: Backfill trenches with suitable materials and restore surfaces to their original condition, ensuring minimal disruption."
          ]
        },
        {
          title: "Advantages of Our Solution",
          type: "list",
          items: [
            "Durability: Protected from environmental factors, accidental damage, and wear.",
            "Scalability: Microducts allow easy upgrades or expansions.",
            "Reliability: Real-time fault monitoring ensures uninterrupted service.",
            "Aesthetics: Hidden infrastructure blends seamlessly with urban environments."
          ]
        }
      ]
    },
    {
      category: "CAMPUS",
      title: "Campus Networking Solutions",
      description: "Symmetric IT Services provides comprehensive solutions to ensure seamless connectivity, security, and scalability for educational, corporate, and industrial campuses.",
      image: "./images/Solutions/Networking Solutions/Campus Networking Solution.png",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Scalable Network Design: Flexible architecture that grows with your campus needs.",
            "High-Speed Connectivity: Reliable and fast data transmission for uninterrupted operations.",
            "Wi-Fi and Wired Integration: Robust wired backbone with secure, expansive wireless coverage.",
            "Advanced Security: Enterprise-grade protection with firewalls, VLANs, and access controls."
          ]
        },
        {
          title: "Solutions We Offer",
          type: "list",
          items: [
            "Core and Edge Switching: High-speed data flow and efficient connection to endpoint devices.",
            "Wireless Networking: Wi-Fi 6 and outdoor access points for dense and open areas.",
            "Structured Cabling: Organized, durable cabling systems for long-term reliability.",
            "IoT Integration: Smart connectivity for devices like sensors, cameras, and lighting.",
            "Centralized Management: Unified tools for monitoring and managing the entire network."
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Enhanced Collaboration: Enables smooth communication and access to resources.",
            "Future-Ready Infrastructure: Scalable design for evolving demands.",
            "Simplified Maintenance: Centralized tools for efficient troubleshooting and updates."
          ]
        }
      ]
    },
    {
      category: "CAMPUS WIRELESS",
      title: "Campus Wireless Networking Solutions",
      description: "Symmetric IT Services provides advanced Campus Wireless Networking Solutions, designed to deliver seamless, high-speed connectivity for educational institutions, corporate campuses, and industrial complexes. Our solutions ensure reliable, secure, and scalable wireless networks to meet the demands of modern digital environments.",
      image: "./images/Solutions/Networking Solutions/Campus Wireless Networking Solutions.png",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "Wi-Fi 6 Access Points: High-performance access points for high-density environments, ensuring fast and stable connectivity.",
            "Outdoor Wireless Solutions: Rugged access points for courtyards, sports complexes, and open spaces.",
            "Seamless Roaming: Uninterrupted connectivity for users moving across campus areas.",
            "Network Security: WPA3 encryption, user authentication, and advanced threat detection."
          ]
        },
        {
          title: "Solutions We Offer",
          type: "list",
          items: [
            "High-Density Wi-Fi: Supports multiple devices in classrooms, auditoriums, and common areas.",
            "Mesh Networking: Extends wireless coverage with smart mesh access points for large campuses.",
            "Centralized Wireless Management: Simplifies control with tools for monitoring and troubleshooting.",
            "Guest Wi-Fi Solutions: Secure, customizable internet access for visitors.",
            "IoT Connectivity: Supports wireless connections for IoT devices like sensors and cameras."
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Enhanced User Experience: Fast, reliable internet for students, employees, and visitors.",
            "Flexibility: Easily scale the network as campus needs grow.",
            "Efficient Management: Centralized tools simplify operations and troubleshooting.",
            "Future-Proof Infrastructure: Built to support evolving wireless standards."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Educational Campuses: Smart classrooms, e-learning platforms, and collaborative spaces.",
            "Corporate Campuses: High-speed internet for offices, meeting rooms, and shared areas.",
            "Industrial Complexes: Wireless connectivity for automation and monitoring systems."
          ]
        }
      ]
    },
    {
      category: "INFRASTRUCTURE",
      title: "Enterprise Network Racks and UPS Solutions",
      description: "Symmetric IT Services offers comprehensive Enterprise Network Racks and UPS Solutions to ensure the reliability, security, and efficiency of your IT infrastructure. These solutions are designed to safeguard your critical equipment and provide uninterrupted operations.",
      image: "./images/Solutions/Networking Solutions/Enterprise & Industrial Network Racks Solution.png",
      details: [
        {
          title: "Network Racks Solutions",
          type: "list",
          items: [
            "Customized Designs: Wide range of rack sizes and configurations to fit enterprise needs.",
            "Efficient Cooling: Integrated airflow management for optimal equipment performance.",
            "Cable Management: Organized cabling to simplify maintenance and upgrades.",
            "Security Features: Lockable doors and side panels for restricted access.",
            "Robust Build Quality: Durable materials to handle heavy loads and prolonged usage."
          ]
        },
        {
          title: "UPS Solutions",
          type: "list",
          items: [
            "Uninterrupted Power Supply: Ensures continuous operation during power outages.",
            "Scalable Capacity: Solutions ranging from small setups to large enterprise loads.",
            "Battery Backup: Long-lasting batteries to keep critical systems running.",
            "Energy-Efficient Designs: Lower operational costs with high-efficiency models.",
            "Remote Monitoring: Manage and monitor power systems in real time."
          ]
        },
        {
          title: "Key Benefits",
          type: "list",
          items: [
            "Equipment Protection: Prevents damage from power fluctuations and surges.",
            "Enhanced Reliability: Ensures zero downtime for mission-critical operations.",
            "Space Optimization: Compact designs to maximize data center efficiency.",
            "Future-Ready: Scalable for growing network and power demands."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Data Centers: Reliable housing and power for servers and networking equipment.",
            "Enterprise Offices: Seamless operations for communication and IT systems.",
            "Industrial Environments: Robust solutions for high-performance operations."
          ]
        }
      ]
    },
    {
      category: "INFRASTRUCTURE",
      title: "High-End Server, Workstation Solutions & Applications",
      description: "Symmetric IT Services provides high-performance Server and Workstation Solutions designed to meet the demands of businesses requiring cutting-edge computing power, reliability, and scalability. Our solutions are built to support mission-critical applications in sectors like data analysis, engineering, media production, and enterprise IT environments.",
      image: "./images/Solutions/Networking Solutions/High-End Server and Workstation Solutions.png",
      details: [
        {
          title: "High-End Servers Solutions",
          type: "list",
          items: [
            "Enterprise Servers: Tailored for large-scale operations, offering high availability, redundancy, and performance.",
            "Rack-Mounted & Blade Servers: Space-efficient and scalable designs for data centers and server rooms.",
            "Customizable Configurations: Support for different processors, memory, storage, and networking options.",
            "Virtualization Support: Optimized for running multiple virtual machines and cloud services."
          ]
        },
        {
          title: "High-End Workstations Solutions",
          type: "list",
          items: [
            "Powerful Processing: Equipped with the latest multi-core processors for demanding applications.",
            "Advanced Graphics: NVIDIA or AMD professional graphics cards for rendering, simulations, and design.",
            "Extended RAM & Storage: High memory capacity and SSD storage for quick data access and large file handling.",
            "Customization: Tailored for specific industry requirements, such as CAD, 3D modeling, or video production."
          ]
        },
        {
          title: "Applications of High-End Servers & Workstations",
          type: "list",
          items: [
            "Data Centers & Cloud Computing: Servers for virtual machines, hosting, and enterprise-scale data processing.",
            "Big Data & Analytics: High-performance servers for running complex data analytics and AI applications.",
            "Media & Entertainment: Workstations optimized for video editing, 3D rendering, animation, and visual effects.",
            "Engineering & CAD: Workstations designed for AutoCAD, SolidWorks, and other design applications requiring heavy computational power."
          ]
        },
        {
          title: "Benefits of Our High-End Server and Workstation Solutions",
          type: "list",
          items: [
            "Unmatched Performance: Handles intensive tasks such as simulations, data processing, and design with ease.",
            "Scalability: Easily expand storage, memory, or processing power as your business grows.",
            "Reliability: Built for 24/7 operations with redundancy and failover support to minimize downtime.",
            "Cost Efficiency: Optimized for performance without unnecessary overhead, reducing total cost of ownership."
          ]
        },
        {
          title: "Why Choose Symmetric IT Services?",
          type: "list",
          items: [
            "Tailored Solutions: We customize configurations to match your specific use case.",
            "Leading-Edge Technology: Access to the latest in server and workstation technology.",
            "Expert Installation & Support: Full installation, configuration, and ongoing support to ensure seamless operation.",
            "End-to-End Services: From hardware procurement to setup and maintenance, we cover all your needs."
          ]
        }
      ]
    },
    {
      category: "INFRASTRUCTURE",
      title: "Highway Toll Management Solutions",
      description: "Symmetric IT Services provides advanced Highway Toll Management Solutions designed to improve the efficiency, accuracy, and security of toll collection systems. Our solutions are built for seamless integration with existing infrastructure, ensuring smooth traffic flow, reducing congestion, and enhancing revenue management for highway operators.",
      image: "./images/Solutions/Networking Solutions/Highway Toll Management Solutions.png",
      details: [
        {
          title: "Key Features of Our Highway Toll Management Solutions",
          type: "list",
          items: [
            "Automatic Toll Collection (ATC): Fully automated systems that enable cashless toll payments via RFID, ANPR (Automatic Number Plate Recognition), and contactless cards.",
            "Real-Time Traffic Monitoring: Integrated CCTV cameras and sensors to monitor traffic flow and detect anomalies at toll booths.",
            "Dynamic Pricing: Supports variable toll rates based on traffic conditions, time of day, or vehicle type to optimize revenue.",
            "Integrated Billing and Reporting: Centralized system for generating accurate billing, invoices, and real-time revenue reports."
          ]
        },
        {
          title: "Solutions We Provide",
          type: "list",
          items: [
            "Electronic Toll Collection (ETC): Cashless toll payment solutions using RFID, license plate recognition, and mobile apps for easy, fast transactions.",
            "Traffic Flow Optimization: AI-driven solutions to predict traffic volumes and adjust toll lanes accordingly to prevent congestion.",
            "Centralized Toll Management System: Real-time monitoring, reporting, and data analysis to ensure smooth operations and compliance.",
            "Mobile & Online Payment Systems: Integration of toll collection with mobile apps and online portals for customer convenience.",
            "Customer Management System: Account-based systems for vehicle owners to manage tolls, receive notifications, and track payments."
          ]
        },
        {
          title: "Benefits of Our Highway Toll Management Solutions",
          type: "list",
          items: [
            "Reduced Congestion: Minimizes delays and improves traffic flow at toll booths with automated, fast payments.",
            "Increased Revenue: Accurate toll collection and dynamic pricing systems ensure optimal revenue generation.",
            "Enhanced User Experience: Cashless, contactless payments simplify the process for drivers, reducing bottlenecks.",
            "Operational Efficiency: Centralized monitoring and automated systems reduce operational costs and manual errors.",
            "Scalability: Easily scale to accommodate additional lanes, toll plazas, or highways as traffic volumes increase."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "National Highways: Seamless toll collection for long-distance travel and national infrastructure.",
            "Urban Expressways: Integrated toll management for busy city roads and expressways.",
            "Toll Plazas & Booths: Upgrade existing toll infrastructure with modern, automated solutions.",
            "Smart Tolling for Commercial Vehicles: Specific solutions tailored for the logistics and transport industry to improve efficiency."
          ]
        },
        {
          title: "Why Choose Symmetric IT Services?",
          type: "list",
          items: [
            "Proven Expertise: Successful implementation of toll management solutions for major highways and toll plazas.",
            "Customized Solutions: Tailored systems that meet your specific needs, whether for urban or national highways.",
            "End-to-End Support: From installation and integration to maintenance and monitoring, we offer complete solutions.",
            "Cutting-Edge Technology: Stay ahead with the latest tolling systems, AI, and IoT technologies."
          ]
        }
      ]
    },
    {
      category: "INFRASTRUCTURE",
      title: "Industrial Networking Solutions",
      description: "Symmetric IT Services offers reliable and high-performance Industrial Networking Solutions designed to enhance connectivity, automation, and security in harsh industrial environments. Our solutions ensure seamless data exchange, improve operational efficiency, and enable real-time decision-making across various sectors, including manufacturing, energy, and oil & gas.",
      image: "./images/Solutions/Networking Solutions/Industrial Networking Solutions.png",
      details: [
        {
          title: "Key Features",
          type: "list",
          items: [
            "High-Speed Connectivity: Enables seamless communication between SCADA systems, PLCs, IoT devices, and industrial automation systems.",
            "Industrial-Grade Durability: Equipment designed to withstand extreme conditions like temperature, dust, and vibrations.",
            "Secure Communication: Protects critical data with advanced security measures, including encryption, VPNs, and firewalls.",
            "Real-Time Monitoring: Provides instant feedback and data for faster decision-making and improved operational control."
          ]
        },
        {
          title: "Solutions We Provide",
          type: "list",
          items: [
            "Ethernet Networking for Industrial Automation: Reliable, high-performance Ethernet solutions for factory automation.",
            "Integrates industrial protocols like EtherCAT, Profinet, and Modbus.",
            "Reduces downtime with continuous operation in harsh environments.",
            "Easily scalable as your operation grows."
          ]
        },
        {
          title: "Industrial Wireless Networks",
          type: "list",
          items: [
            "Rugged wireless solutions for remote and challenging environments.",
            "High-speed connectivity for IoT devices and remote equipment.",
            "Ensures secure and reliable wireless communication.",
            "Flexible and easy to deploy."
          ]
        },
        {
          title: "Edge Computing",
          type: "list",
          items: [
            "Reduces latency by processing data closer to the source.",
            "Enables real-time analytics and instant decision-making.",
            "Optimizes network load and ensures faster responses.",
            "Enhances automation with local data processing."
          ]
        },
        {
          title: "Industrial IoT Integration",
          type: "list",
          items: [
            "Seamlessly integrates IoT devices for real-time monitoring and data collection.",
            "Enables predictive maintenance to minimize downtime.",
            "Improves visibility and control over industrial operations.",
            "Enhances overall operational efficiency."
          ]
        },
        {
          title: "Benefits",
          type: "list",
          items: [
            "Operational Efficiency: Streamline workflows, automate processes, and reduce costs with real-time insights and enhanced connectivity.",
            "Security: Robust security measures protect your network from cyber threats and unauthorized access.",
            "Scalability: Our solutions grow with your business, allowing easy expansion and adaptation to future needs.",
            "Reliability: Industrial-grade equipment ensures continuous operation and minimal downtime."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Manufacturing: Optimized for automation and production line control.",
            "Energy & Utilities: Smart grids, power plants, and remote energy monitoring.",
            "Oil & Gas: Reliable connectivity for remote operations and monitoring.",
            "Pharmaceuticals: Secure and compliant systems for production and regulatory monitoring."
          ]
        },
        {
          title: "Why Choose Symmetric IT Services?",
          type: "list",
          items: [
            "Expertise: Extensive experience in industrial networking solutions.",
            "Tailored Solutions: Customized to meet your specific operational needs.",
            "Full Support: Comprehensive design, installation, and maintenance services.",
            "Future-Proof Technology: Solutions based on the latest technologies to ensure long-term growth and performance."
          ]
        }
      ]
    },
    {
      category: "INFRASTRUCTURE",
      title: "Surge Protection Solutions",
      description: "Symmetric IT Services offers advanced Surge Protection Solutions designed to protect sensitive equipment and systems from power surges, voltage spikes, and electrical disturbances. Our solutions are ideal for ensuring the longevity and reliability of your electrical and IT infrastructure.",
      image: "./images/Solutions/Networking Solutions/Surge Protection Solutions.png",
      details: [
        {
          title: "Key Features of Our Surge Protection Solutions",
          type: "list",
          items: [
            "Comprehensive Protection: Shields against lightning strikes, power surges, and transient voltage spikes.",
            "High-Performance Surge Arresters: Protects critical equipment like servers, networking devices, and electrical appliances.",
            "Multiple Protection Levels: Offers both point-of-use and whole-building surge protection solutions.",
            "Real-Time Monitoring: Continuous monitoring of surge levels to prevent damage to connected devices.",
            "Energy-Efficient: Designed to minimize energy loss while maintaining maximum protection."
          ]
        },
        {
          title: "Solutions We Provide",
          type: "list",
          items: [
            "Power Surge Protectors: Installations for sensitive electrical equipment to prevent spikes from affecting devices.",
            "Rack-Mounted Surge Protectors: Perfect for data centers and server rooms to safeguard network infrastructure.",
            "Whole-Building Surge Protection: Systems that protect an entire building's electrical network from transient surges.",
            "Industrial Surge Protection: Heavy-duty solutions designed for industrial equipment and machinery.",
            "Lightning Protection Systems: Specialized systems to protect buildings and infrastructure from lightning strikes."
          ]
        },
        {
          title: "Benefits of Surge Protection Solutions",
          type: "list",
          items: [
            "Prevent Equipment Damage: Protects against costly damage to sensitive electronics and machinery.",
            "Reduced Downtime: Minimizes interruptions by protecting equipment from power surges.",
            "Increased Lifespan of Equipment: Ensures the longevity and performance of valuable assets.",
            "Cost Savings: Avoid repair and replacement costs of damaged equipment."
          ]
        },
        {
          title: "Applications",
          type: "list",
          items: [
            "Data Centers: Protects servers, networking equipment, and storage devices.",
            "Industrial Facilities: Safeguards industrial machinery and control systems.",
            "Office Environments: Ensures the safety of computers, printers, and other office equipment.",
            "Residential Installations: Prevents damage to home electronics and appliances."
          ]
        },
        {
          title: "Why Choose Symmetric IT Services?",
          type: "list",
          items: [
            "Tailored Solutions: Customized to meet the specific needs of your infrastructure.",
            "Proven Quality: High-quality surge protection devices from trusted manufacturers.",
            "Expert Installation: Professional installation and support to ensure optimal protection.",
            "Ongoing Support: Continuous monitoring and maintenance services to ensure maximum protection."
          ]
        }
      ]
    }
  ];

  const buildingTechnologies = [
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

  const luxuryHomes = [
    {
      category: "ENERGY",
      title: "Energy Conservation",
      description: "Rising energy costs are impacting profitability and sustainability, making it essential to adopt smarter power usage habits and choices for a greener future. Symmetric IT Services offers LEED-compliant solutions to help monitor, optimize, and reduce energy consumption.",
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/Energy Conservation.png",
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
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/Home Theatres.png",
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
            "Control all your integrated AV equipment, HVAC, lighting, and more, right at your fingertips, so you never have to leave your seat."
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
        image: "./images/Solutions/AV and Automation Solution/Luxury Home/Lighting & Automation.png",
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
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/Smart Home.jpeg",
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
      image: "./images/Solutions/AV and Automation Solution/Luxury Home/Smart Locks.png",
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
      image: "./images/Solutions/AV and Automation Solution/Network Control and Automation/Command Centre .jpeg",
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
      image: "./images/Solutions/AV and Automation Solution/Network Control and Automation/Operations Centres.png",
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
      image: "./images/Solutions/AV and Automation Solution/Video Collaboration/Auditorium Solution.png",
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
      category: "VIDEO COLLABORATION",
      title: "Video Collaboration Solutions",
      description: "Unified communication systems",
      image: "https://picsum.photos/800/610",
    }
  ];

  const visualSolutions = [
    {
      category: "VISUAL SOLUTIONS",
      title: "Professional Display Systems",
      description: "High-end visual solutions",
      image: "https://picsum.photos/800/611",
    }
  ];

  const allSolutions = [
    { title: "Networking Solutions", items: networkingSolutions },
    { title: "Building Technologies", items: buildingTechnologies },
    { title: "Luxury Home Solutions", items: luxuryHomes },
    { title: "Network Control & Automation Solutions", items: networkControl },
    { title: "Video Collaboration & Unified Communication", items: videoCollaboration },
    { title: "Visual Solutions", items: visualSolutions }
  ];

  // Group solutions into main categories
  const categories = [
    {
      title: "Networking Solutions",
      className: "networking",
      sections: [
        { title: "Networking Solutions", items: networkingSolutions }
      ]
    },
    {
      title: "Building Technologies",
      className: "building",
      sections: [
        { title: "Building Technologies", items: buildingTechnologies }
      ]
    },
    {
      title: "AV & Automation Solutions",
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
      <h1 className="solutions-title">Our Solutions</h1>
      
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className={`category-container ${category.className}`}>
          <h2 className="category-title">{category.title}</h2>
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

export default Solutions; 