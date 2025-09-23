import React from 'react';

const Statistics = () => {
  const stats = [
    { number: '2,500+', label: 'Students Impacted' },
    { number: '150+', label: 'Active Volunteers' },
    { number: '10,000+', label: 'Teaching Hours' },
    { number: '5', label: 'Active Projects' }
  ];

  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
