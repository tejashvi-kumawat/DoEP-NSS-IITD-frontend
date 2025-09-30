import React from 'react';

const stats = [
  { number: '2,500+', label: 'Students Impacted' },
  { number: '150+', label: 'Active Volunteers' },
  { number: '10,000+', label: 'Teaching Hours' },
  { number: '5', label: 'Active Projects' },
];

const Statistics = () => (
  <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-20">
    <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {stats.map(({ number, label }, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1"
          >
            <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-3">
              {number}
            </div>
            <div className="text-base md:text-lg text-gray-700 font-medium">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Statistics;
