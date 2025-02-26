import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AppleCardsCarousel = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleCardClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <motion.div
              className="card"
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
            {openIndex === index && (
              <motion.div 
                className="expanded-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button className="close-button" onClick={() => setOpenIndex(null)}>
                  ×
                </button>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppleCardsCarousel; 