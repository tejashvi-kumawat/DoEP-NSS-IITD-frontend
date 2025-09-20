// src/components/ProjectCard.jsx
import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return styles.statusActive;
      case 'completed': return styles.statusCompleted;
      case 'planning': return styles.statusPlanning;
      default: return styles.statusDefault;
    }
  };

  return (
    <div className="card">
      <div className={styles.cardHeader}>
        <h3>{project.name}</h3>
        <span className={`${styles.statusBadge} ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.cardFooter}>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <strong>{project.participants}</strong> participants
          </span>
          <span className={styles.stat}>
            <strong>{project.volunteers}</strong> volunteers
          </span>
        </div>
        <a 
          href={`https://${project.subdomain}.nssiitd.in`} 
          className="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
