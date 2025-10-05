// src/pages/ProjectHome.jsx
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    return host.split('.')[0]; // e.g., munirka.localhost
  }
  if (host.includes('nssiitd.in')) {
    return host.split('.')[0];
  }
  return 'munirka'; // default fallback
};

const ProjectHome = () => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    
    // Apply dynamic theme to document
    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
      document.documentElement.style.setProperty('--theme-background', projectInfo.theme.background);
    }
    
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: `linear-gradient(135deg, ${project.theme.background} 0%, ${project.theme.primary}08 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: project.theme.primary }}
        />
        <div 
          className="absolute bottom-20 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ 
            backgroundColor: project.theme.secondary,
            animationDelay: '1s',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ backgroundColor: project.theme.primary }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full">
          
          {/* Logo/Badge */}
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-200 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border shadow-2xl"
              style={{
                backgroundColor: `${project.theme.primary}15`,
                borderColor: `${project.theme.primary}30`,
              }}
            >
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: project.theme.primary }}
              />
              <span 
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ color: project.theme.primary }}
              >
                NSS IIT Delhi
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className={`text-center mb-8 transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight leading-none"
              style={{
                background: `linear-gradient(135deg, ${project.theme.primary} 0%, ${project.theme.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {project.name.split(' ')[0]}
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight">
              {project.name.split(' ').slice(1).join(' ')}
            </h2>
          </div>

          {/* Description */}
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-3 gap-6 md:gap-8 mb-16 transform transition-all duration-1000 delay-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div 
              className="backdrop-blur-xl rounded-3xl p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                backgroundColor: `${project.theme.primary}10`,
                borderColor: `${project.theme.primary}20`,
              }}
            >
              <div 
                className="text-5xl md:text-6xl font-black mb-3"
                style={{ color: project.theme.primary }}
              >
                {project.stats.students}+
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium uppercase tracking-wide">
                Students
              </div>
            </div>

            <div 
              className="backdrop-blur-xl rounded-3xl p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                backgroundColor: `${project.theme.secondary}10`,
                borderColor: `${project.theme.secondary}20`,
              }}
            >
              <div 
                className="text-5xl md:text-6xl font-black mb-3"
                style={{ color: project.theme.secondary }}
              >
                {project.stats.volunteers}+
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium uppercase tracking-wide">
                Volunteers
              </div>
            </div>

            <div 
              className="backdrop-blur-xl rounded-3xl p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                backgroundColor: `${project.theme.primary}10`,
                borderColor: `${project.theme.primary}20`,
              }}
            >
              <div 
                className="text-5xl md:text-6xl font-black mb-3"
                style={{ 
                  background: `linear-gradient(135deg, ${project.theme.primary} 0%, ${project.theme.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {(project.stats.hours / 1000).toFixed(1)}k
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium uppercase tracking-wide">
                Hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Testimonial Ribbon */}
      <div 
        className="absolute bottom-0 left-0 right-0 backdrop-blur-2xl border-t py-8 z-20"
        style={{
          backgroundColor: `${project.theme.primary}08`,
          borderColor: `${project.theme.primary}15`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: project.theme.primary }}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-800 font-medium italic text-lg">
                  "{project.testimonials[0].quote}"
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  — {project.testimonials[0].author}, <span className="font-semibold">{project.testimonials[0].role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHome;
