// src/pages/Curriculum.jsx (Student View - UPDATED)
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';
import curriculumData from '../assets/data/curriculum.json';

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    return host.split('.')[0];
  }
  if (host.includes('nssiitd.in')) {
    return host.split('.')[0];
  }
  return 'munirka';
};

const FileIcon = ({ className, type }) => {
  if (type === 'pdf') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  }
  if (type === 'image') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
};

const DownloadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const Curriculum = () => {
  const [project, setProject] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setCurriculum(curriculumData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  if (!project) return null;

  return (
    <div className={`min-h-screen pt-14 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Animated Background - Same as Resources/Manage pages */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-bg {
          background: linear-gradient(135deg, 
            ${project.theme.primary}08 0%,
            ${project.theme.secondary}05 10%,
            ${project.theme.primary}10 20%,
            ${project.theme.secondary}08 30%,
            ${project.theme.primary}06 40%,
            ${project.theme.secondary}12 50%,
            ${project.theme.primary}09 60%,
            ${project.theme.secondary}07 70%,
            ${project.theme.primary}11 80%,
            ${project.theme.secondary}09 90%,
            ${project.theme.primary}08 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          will-change: background-position;
        }
      `}</style>

      <div className="animated-bg min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-4xl font-black text-gray-900 mb-3">Curriculum</h1>
            <p className="text-gray-600 text-lg">{project.name}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5"
                 style={{ 
                   background: `linear-gradient(to bottom, transparent, ${project.theme.primary}30, ${project.theme.primary}30, transparent)` 
                 }} />

            {/* Timeline Items */}
            <div className="space-y-8">
              {curriculum.map((item, index) => (
                <div key={item.id} className="relative pl-16 group">
                  {/* Node */}
                  <div 
                    className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})`,
                      boxShadow: `0 0 20px ${project.theme.primary}40`,
                      borderColor: '#fafafa'
                    }}
                  >
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      {/* Week Badge */}
                      <span 
                        className="inline-block px-3 py-1 rounded-md text-xs font-bold text-white mb-3"
                        style={{ backgroundColor: project.theme.primary }}
                      >
                        {item.week}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      
                      {/* Description */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Resources */}
                      {item.resources && item.resources.length > 0 && (
                        <div className="space-y-2">
                          {item.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-300 group/resource"
                            >
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${project.theme.primary}20` }}
                              >
                                <FileIcon className="w-5 h-5" style={{ color: project.theme.primary }} type={resource.type} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-gray-900 text-sm font-semibold">{resource.name}</p>
                                <p className="text-gray-500 text-xs">{resource.type.toUpperCase()}</p>
                              </div>
                              <DownloadIcon className="w-5 h-5 text-gray-400 group-hover/resource:text-gray-900 transition-colors duration-300" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
