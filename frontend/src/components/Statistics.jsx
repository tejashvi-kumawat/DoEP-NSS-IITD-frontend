// src/components/Statistics.jsx
import React from 'react';
import styles from './Statistics.module.css';

const Statistics = () => {
  const stats = [
    { number: '2,500+', label: 'Students Impacted' },
    { number: '150+', label: 'Active Volunteers' },
    { number: '10,000+', label: 'Teaching Hours' },
    { number: '5', label: 'Active Projects' }
  ];

  return (
    <section className={styles.statistics}>
      <div className="container">
        <div className={`grid grid-4 ${styles.statsGrid}`}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
