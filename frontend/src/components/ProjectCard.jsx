import React, { useState } from 'react';
import Button from './Button';

const ProjectCard = ({ project }) => {
  const [isSharing, setIsSharing] = useState(false);

  const getProjectUrl = (subdomain) => {
    const isDev = process.env.NODE_ENV === 'development';
    return isDev ? `http://${subdomain}.localhost:5174` : `https://${subdomain}.do-ep-nss-iitd-frontend.vercel.app/`;
  };

  const handleShare = (e) => {
    e.preventDefault();
    const url = getProjectUrl(project.subdomain);
    setIsSharing(true);
    if (navigator.share) {
      navigator.share({ title: project.name, text: project.description, url })
        .catch(() => {})
        .finally(() => setIsSharing(false));
    } else {
      navigator.clipboard.writeText(url);
      alert('Project link copied!');
      setIsSharing(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 overflow-hidden border border-gray-100 min-h-[350px] flex flex-col hover:scale-105">
      {/* Static Gradient Border */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400" />

      <div className="relative flex flex-col flex-grow p-6 bg-white rounded-xl">
        <div className="transition-all duration-300 group-hover:-translate-y-1 opacity-95 group-hover:opacity-100">
          <h3 className="text-xl font-extrabold text-gray-900 mb-1.5 group-hover:text-emerald-700 transition-colors duration-300 tracking-wide">{project.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed tracking-wide">{project.description}</p>
        </div>

        <div className="flex-grow" />

        <div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4 group-hover:via-emerald-300 transition-colors duration-500" />
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-300 to-emerald-100 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 tracking-wide">{project.participants}</p>
                  <p className="text-xs text-gray-500 font-semibold">Participants</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-300 to-blue-100 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 tracking-wide">{project.volunteers}</p>
                  <p className="text-xs text-gray-500 font-semibold">Volunteers</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-28">
              <a href={getProjectUrl(project.subdomain)} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" className="w-full group-hover:scale-[1.03] transition-transform duration-200 shadow-md hover:shadow-lg">
                  <span className="flex items-center justify-center space-x-2 text-sm tracking-wide">
                    <span>Visit</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </a>
              <button aria-label="Share" className={`flex items-center justify-center w-full py-2 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-all shadow-md hover:shadow-lg ${isSharing ? 'animate-pulse' : ''}`} onClick={handleShare}>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 00-6 0v4a3 3 0 006 0V8zm5 6l-2.976-2.09a2.001 2.001 0 00-2.119 0L12 16l-2.095-4.09a2.001 2.001 0 00-2.119 0L7 14" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-300/70 to-transparent rounded-bl-full opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute -bottom-4 left-8 right-8 rounded-xl filter blur-md opacity-10 bg-emerald-300 transition-opacity duration-500 group-hover:opacity-25"></div>
    </div>
  );
};

export default ProjectCard;
