import React, { useState, useEffect } from 'react';

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          What People Say
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-semibold text-gray-900">
                {testimonials[currentIndex].author}
              </h4>
              <p className="text-gray-600">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300 hover:bg-gray-400'
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
