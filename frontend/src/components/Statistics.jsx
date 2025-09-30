import React from 'react';

const stats = [
  { number: '2,500+', label: 'Students Impacted' },
  { number: '150+', label: 'Active Volunteers' },
  { number: '10,000+', label: 'Teaching Hours' },
  { number: '5', label: 'Active Projects' },
];

const Statistics = () => (
  <section>
    <h2 className="text-3xl font-bold mb-8 text-gray-900 select-none">
      Our Impact
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {stats.map(({ number, label }, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 cursor-default"
          style={{ minHeight: '140px' }}
        >
          <p className="text-4xl font-extrabold tracking-tight mb-2 text-emerald-700">
            {number}
          </p>
          <p className="uppercase text-sm font-semibold tracking-widest text-gray-700">
            {label}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Statistics;
