// src/pages/Curriculum.jsx (Student View with Timeline Navigation)
import React, { useEffect, useState, useRef } from 'react';
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
  const [activeSection, setActiveSection] = useState(0);
  const [sectionHeights, setSectionHeights] = useState([]);
  const itemRefs = useRef([]);

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

  useEffect(() => {
    // Calculate heights after render
    if (itemRefs.current.length > 0) {
      const heights = itemRefs.current.map(ref => ref?.offsetHeight || 0);
      setSectionHeights(heights);
    }
  }, [curriculum]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetBottom = offsetTop + rect.height;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [curriculum]);

  const scrollToSection = (index) => {
    itemRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  if (!project) return null;

  const totalHeight = sectionHeights.reduce((sum, h) => sum + h, 0);

  return (
    <div className={`min-h-screen pt-14 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
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
          <div className="container mx-auto max-w-6xl px-6 py-12">
            <h1 className="text-4xl font-black text-gray-900 mb-3">Curriculum</h1>
            <p className="text-gray-600 text-lg">{project.name}</p>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="container mx-auto max-w-6xl px-6 py-12 flex gap-8">
          
          {/* Fixed Timeline Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
                <h3 className="text-sm font-bold text-gray-900 mb-4 px-2">Course Timeline</h3>
                
                <div className="relative">
                  {/* Timeline Bar */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  {/* Active Progress Bar */}
                  <div 
                    className="absolute left-4 top-0 w-0.5 transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(180deg, ${project.theme.primary}, ${project.theme.secondary})`,
                      height: sectionHeights.length > 0 
                        ? `${(sectionHeights.slice(0, activeSection + 1).reduce((sum, h) => sum + h, 0) / totalHeight) * 100}%`
                        : '0%'
                    }}
                  />

                  {/* Timeline Items */}
                  <div className="space-y-1">
                    {curriculum.map((item, index) => {
                      const isActive = activeSection === index;
                      const isPassed = index < activeSection;
                      const itemHeight = sectionHeights[index] || 0;
                      const relativeHeight = totalHeight > 0 ? (itemHeight / totalHeight) * 100 : 100 / curriculum.length;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(index)}
                          className="w-full text-left transition-all duration-300 relative group"
                          style={{ 
                            minHeight: `${Math.max(relativeHeight * 3, 48)}px`
                          }}
                        >
                          <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-all duration-300">
                            {/* Node */}
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${
                                isActive 
                                  ? 'scale-110 shadow-lg' 
                                  : isPassed 
                                    ? '' 
                                    : 'scale-90'
                              }`}
                              style={
                                isActive || isPassed
                                  ? { 
                                      background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})`,
                                      borderColor: 'white',
                                      boxShadow: isActive ? `0 0 20px ${project.theme.primary}60` : 'none'
                                    }
                                  : { 
                                      background: 'white',
                                      borderColor: '#e5e7eb'
                                    }
                              }
                            >
                              <span className={`text-xs font-bold ${isActive || isPassed ? 'text-white' : 'text-gray-400'}`}>
                                {index + 1}
                              </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-1">
                              <p className={`text-xs font-bold mb-0.5 transition-colors duration-300 ${
                                isActive ? 'text-gray-900' : 'text-gray-600'
                              }`}>
                                {item.week}
                              </p>
                              <p className={`text-xs line-clamp-2 transition-colors duration-300 ${
                                isActive ? 'text-gray-700' : 'text-gray-500'
                              }`}>
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Timeline Content */}
          <div className="flex-1">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
                   style={{ 
                     background: `linear-gradient(to bottom, transparent, ${project.theme.primary}30, ${project.theme.primary}30, transparent)` 
                   }} />

              {/* Timeline Items */}
              <div className="space-y-8">
                {curriculum.map((item, index) => (
                  <div 
                    key={item.id} 
                    ref={el => itemRefs.current[index] = el}
                    className="relative pl-16 group"
                    id={`section-${index}`}
                  >
                    {/* Node */}
                    <div 
                      className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 hidden md:flex"
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
    </div>
  );
};

export default Curriculum;
