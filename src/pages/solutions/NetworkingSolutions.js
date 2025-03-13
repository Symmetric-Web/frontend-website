import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../pages/Solutions.css';  // Update the import path

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
    // Only close if clicking the overlay itself, not its children
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

const NetworkingSolutions = () => {  // Rename from Solutions to NetworkingSolutions
  const networkingSolutions = [
    {
      category: "CONNECTIVITY",
      title: "Aerial Fiber Optic Connectivity Solutions",
      description: "Symmetric IT Services provides cutting-edge Aerial Fiber Optic Connectivity Solutions designed for fast, reliable, and scalable communication networks. Ideal for areas where underground cabling is not feasible, our solutions ensure seamless data transmission with minimal disruption.",
      image: "./images/Solutions/Networking Solutions/Aerial Fiber Solution.webp",
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
      image: "./images/Solutions/Networking Solutions/Underground Fiber Connectivity Solution.webp",
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
      image: "./images/Solutions/Networking Solutions/Campus Networking Solution.webp",
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
      image: "./images/Solutions/Networking Solutions/Campus Wireless Networking Solutions.webp",
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
      image: "./images/Solutions/Networking Solutions/Enterprise & Industrial Network Racks Solution.webp",
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
      image: "./images/Solutions/Networking Solutions/High-End Server and Workstation Solutions.webp",
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
      image: "./images/Solutions/Networking Solutions/Highway Toll Management Solutions.webp",
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
      image: "./images/Solutions/Networking Solutions/Industrial Networking Solutions.webp",
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
      image: "./images/Solutions/Networking Solutions/Surge Protection Solutions.webp",
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

  // Simplify the categories to only show networking
  const categories = [
    {
      // title: "Networking Solutions",
      className: "networking",
      sections: [
        { title: "Networking Solutions", items: networkingSolutions }
      ]
    }
  ];

  return (
    <div className="solutions-container">
      {/* <h1 className="solutions-title">Networking Solutions</h1> */}
      
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

export default NetworkingSolutions;