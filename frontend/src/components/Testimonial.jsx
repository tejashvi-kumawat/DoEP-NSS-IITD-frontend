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
    <>
      <style>{`
        .fade-in {
          opacity: 1;
          transition: opacity 500ms ease-in;
        }
        .fade-out {
          opacity: 0;
          transition: opacity 500ms ease-out;
        }
      `}</style>
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 select-none">
          What People Say
        </h2>
        <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-200 max-w-xl mx-auto">
          <p className={`text-xl italic text-gray-800 mb-6 leading-relaxed min-h-[8rem] ${fadeProp.fade}`}>
            &ldquo;{testimonials[currentIndex].quote}&rdquo;
          </p>
          <p className={`font-semibold text-emerald-700 ${fadeProp.fade}`}>
            {testimonials[currentIndex].author}
          </p>
          <p className={`text-sm text-gray-600 ${fadeProp.fade}`}>
            {testimonials[currentIndex].role}
          </p>

          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-emerald-700' : 'bg-emerald-300'
                }`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;