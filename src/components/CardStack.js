import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CardStack.css';

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CEO, TechCorp',
    content: 'Symmetric IT Services has transformed our infrastructure with their cutting-edge solutions. Their expertise and dedication are unmatched.',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CTO, InnovateTech',
    content: 'The team at Symmetric IT Services delivered beyond our expectations. Their attention to detail and innovative approach helped us achieve our goals.',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Director of Operations, GlobalNet',
    content: 'Working with Symmetric IT Services was a game-changer for our organization. Their solutions are robust, scalable, and future-proof.',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'IT Manager, FutureScale',
    content: 'The level of professionalism and technical expertise demonstrated by Symmetric IT Services is exceptional. They truly understand enterprise needs.',
  },
];

const CardStack = () => {
  const [cards, setCards] = useState(testimonials);

  const moveToEnd = (index) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const [removed] = newCards.splice(index, 1);
      newCards.push(removed);
      return newCards;
    });
  };

  return (
    <div className="card-stack-container">
      <div className="card-stack">
        <AnimatePresence mode="popLayout">
          {cards.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              style={{ zIndex: cards.length - index }}
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{
                scale: index === 0 ? 1 : 0.9 - index * 0.05,
                y: index * -10,
                opacity: 1 - index * 0.2,
              }}
              exit={{ scale: 0.8, y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => moveToEnd(index)}
              whileHover={{ scale: index === 0 ? 1.05 : 0.9 - index * 0.05 }}
            >
              <div className="testimonial-content">
                <p className="testimonial-text">{testimonial.content}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardStack;