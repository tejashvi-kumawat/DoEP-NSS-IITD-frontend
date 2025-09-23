import React from 'react';
import Button from './Button';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      <p className="text-gray-700 mb-6">{project.description}</p>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4">
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{project.participants}</span> participants
          </span>
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{project.volunteers}</span> volunteers
          </span>
        </div>
        <a
          href={`https://${project.subdomain}.nssiitd.in`}
          className="inline-block bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
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
