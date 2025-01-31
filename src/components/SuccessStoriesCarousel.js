import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './SuccessStoriesCarousel.css';

const stories = [
  {
    id: 1,
    category: "Enterprise",
    title: "Major Bank Infrastructure Upgrade",
    description: "Complete network infrastructure overhaul for a leading banking institution",
    image: "/images/success-stories/bank.jpg"
  },
  {
    id: 2,
    category: "Healthcare",
    title: "Smart Hospital Solutions",
    description: "Integrated building automation and security systems for healthcare facility",
    image: "/images/success-stories/hospital.jpg"
  },
  {
    id: 3,
    category: "Education",
    title: "University Campus Technology",
    description: "Campus-wide AV and networking solutions for modern learning environments",
    image: "/images/success-stories/university.jpg"
  },
  {
    id: 4,
    category: "Corporate",
    title: "Office Automation Excellence",
    description: "Smart office solutions for enhanced productivity and collaboration",
    image: "/images/success-stories/office.jpg"
  }
];

export const SuccessStoriesCarousel = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

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
    </div>
  );
}; 