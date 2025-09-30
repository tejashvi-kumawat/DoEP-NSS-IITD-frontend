import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "NSS IIT Delhi's teaching programs have completely transformed our children's learning experience. The volunteers are dedicated and passionate.",
    author: 'Priya Sharma',
    role: 'Parent, Munirka Community',
  },
  {
    quote: 'Being part of NSS has been incredible. Teaching underprivileged children has given me a new perspective on life and education.',
    author: 'Rahul Kumar',
    role: 'Volunteer, IIT Delhi',
  },
  {
    quote: 'The digital literacy program helped our community access better opportunities. Thank you NSS for bridging the digital divide.',
    author: 'Sanjay Gupta',
    role: 'Community Leader',
  },
  {
    quote: 'The structured approach and innovative teaching methods make learning fun and effective for all students.',
    author: 'Dr. Meera Singh',
    role: 'Education Consultant',
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' });
  const length = testimonials.length;

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeProp({ fade: 'fade-out' });
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
        setFadeProp({ fade: 'fade-in' });
      }, 500);
    }, 5000);

    return () => clearInterval(timeout);
  }, [length]);

  return (
    <section className="bg-gradient-to-br from-gray-50 via-emerald-50 to-gray-50 py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          What People Say
        </h2>
        
        <div 
          className={`bg-white rounded-2xl shadow-lg p-10 md:p-14 transition-opacity duration-500 border border-gray-100 ${
            fadeProp.fade === 'fade-in' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative">
            <svg 
              className="absolute -top-4 -left-2 w-12 h-12 text-emerald-200 opacity-50" 
              fill="currentColor" 
              viewBox="0 0 32 32"
            >
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
            </svg>
            
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 relative z-10 italic">
              {testimonials[currentIndex].quote}
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-base text-gray-600">
                {testimonials[currentIndex].role}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? 'bg-emerald-600 w-8' 
                  : 'bg-gray-300 hover:bg-emerald-300'
              }`}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
