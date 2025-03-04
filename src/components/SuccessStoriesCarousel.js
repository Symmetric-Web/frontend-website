import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SuccessStoriesCarousel.css';

const stories = [
  {
    id: 1,
    category: "Infrastructure",
    title: "HTMS Network Implementation for EFKON",
    description: "Highway Traffic Management System implementation across major Indian highways",
    image: "/images/case-studies/Bandra Worli Sealink.webp",
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
    image: "/images/case-studies/E-Fencing with CCTV .webp",
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
    image: "/images/case-studies/wind-farms.webp",
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
    image: "/images/case-studies/resto-bars.webp",
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
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="card-image"
                />
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