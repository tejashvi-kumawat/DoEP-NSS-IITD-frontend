// src/components/Testimonial.jsx
import React, { useState, useEffect } from 'react';
import styles from './Testimonial.module.css';

const Testimonial = () => {
  const testimonials = [
    {
      quote: "NSS IIT Delhi's teaching programs have completely transformed our children's learning experience. The volunteers are dedicated and passionate.",
      author: "Priya Sharma",
      role: "Parent, Munirka Community"
    },
    {
      quote: "Being part of NSS has been incredible. Teaching underprivileged children has given me a new perspective on life and education.",
      author: "Rahul Kumar",
      role: "Volunteer, IIT Delhi"
    },
    {
      quote: "The digital literacy program helped our community access better opportunities. Thank you NSS for bridging the digital divide.",
      author: "Sanjay Gupta",
      role: "Community Leader"
    },
    {
      quote: "The structured approach and innovative teaching methods make learning fun and effective for all students.",
      author: "Dr. Meera Singh",
      role: "Education Consultant"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <h2 className="text-center mb-16">What People Say</h2>
        
        <div className={styles.testimonialSlider}>
          <div className={styles.testimonialCard}>
            <blockquote className={styles.quote}>
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className={styles.author}>
              <h4>{testimonials[currentIndex].author}</h4>
              <p>{testimonials[currentIndex].role}</p>
            </div>
          </div>
          
          <div className={styles.indicators}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.indicatorActive : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
