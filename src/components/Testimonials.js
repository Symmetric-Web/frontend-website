import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
        "id": 1,
        "text": "We are highly impressed with Symmetric’s exceptional expertise in aerial fiber network design and deployment. Their meticulous planning, technical proficiency, and unwavering commitment to excellence have been remarkable. The team’s ability to execute complex projects with precision and efficiency has significantly contributed to seamless connectivity and operational success.",
        "name": "Mr. Kumaran",
        "role": "GE Renewables"
      },
      {
        "id": 2,
        "text": "Everyone at Symmetric was highly professional in all areas. I rate them at the highest level for my overall experience and would confidently recommend them to my friends and colleagues. Their automation control products and services have exceeded my expectations, seamlessly integrating into my home, commercial offices, and resort.",
        "name": "Mr. Sanjay Walia",
        "role": "Resort Owner, Vacanza Pendenza & Builder (Mumbai)"
        

      },
      {
        "id": 3,
        "text": "We are extremely impressed with Symmetric’s efficiency and professionalism in delivering our physical security solutions. Their team successfully implemented flap barriers, access control, ANPR camera-based boom barriers, and a comprehensive CCTV system at our premises within just 15 days of order receipt. Their commitment to quality and timely execution is truly commendable.",
        "name": "Mr. Dhirender",
        "role": "Chintamani Group"
      },
      {
        "id": 4,
        "text": "We are extremely pleased with the high-quality dimming solutions, access control, fire alarm, and fire sprinkler systems provided by Symmetric across all our restaurants. Their commitment to excellence, timely service, and adherence to high standards have been impressive. Their support and customer service are also commendable, making them a reliable partner for our business.",
        "name": "Mr. Inderjit Singh Vacchar",
        "role": "Pizza Express"
      }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;