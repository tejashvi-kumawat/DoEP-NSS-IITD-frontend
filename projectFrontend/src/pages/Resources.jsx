// src/pages/Resources.jsx
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';
import resourcesData from '../assets/data/resources.json';

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

// SVG Icons (same as before - keeping them all)
const DocsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ImagesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const ArticlesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const VideosIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const SortIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="11" y2="6" />
    <line x1="4" y1="12" x2="16" y2="12" />
    <line x1="4" y1="18" x2="13" y2="18" />
  </svg>
);

const DownloadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExternalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Resources = () => {
  const [project, setProject] = useState(null);
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('docs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setResources(resourcesData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
      document.documentElement.style.setProperty('--theme-background', projectInfo.theme.background);
    }

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const tabs = [
    { id: 'docs', label: 'Documents', icon: DocsIcon },
    { id: 'images', label: 'Images', icon: ImagesIcon },
    { id: 'articles', label: 'Articles', icon: ArticlesIcon },
    { id: 'videos', label: 'Videos', icon: VideosIcon },
  ];

  const categories = ['all', 'education', 'training', 'reports', 'guides', 'presentations'];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
  ];

  const getFilteredResources = () => {
    let filtered = resources.filter(resource => resource.type === activeTab);

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredResources = getFilteredResources();

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  const DocumentListItem = ({ resource }) => (
    <div className="group flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-b border-gray-100 transition-all duration-200">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
           style={{ backgroundColor: `${project.theme.primary}10` }}>
        <DocsIcon className="w-5 h-5" style={{ color: project.theme.primary }} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{resource.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">{resource.description}</p>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="px-2.5 py-1 rounded-md text-xs font-medium" 
              style={{ backgroundColor: `${project.theme.primary}10`, color: project.theme.primary }}>
          {resource.category}
        </span>
        <span className="text-xs text-gray-500 w-16">{formatFileSize(resource.size)}</span>
        <span className="text-xs text-gray-500 w-20">{formatDate(resource.date)}</span>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" 
                style={{ color: project.theme.primary }}>
          <DownloadIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const ImageMasonryItem = ({ resource, index }) => {
    const heights = [280, 320, 380, 340, 300, 360];
    const height = heights[index % heights.length];
    
    return (
      <div className="group relative overflow-hidden rounded-lg cursor-pointer" 
           style={{ height: `${height}px` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" 
             style={{ 
               background: `linear-gradient(135deg, ${project.theme.primary}40, ${project.theme.secondary}40)` 
             }} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-start gap-2 mb-2">
            <ImagesIcon className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
            <h3 className="font-semibold text-white text-sm line-clamp-2">{resource.title}</h3>
          </div>
          <p className="text-xs text-gray-200 line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {resource.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>{formatDate(resource.date)}</span>
            <span className="font-medium">{formatFileSize(resource.size)}</span>
          </div>
        </div>
      </div>
    );
  };

  const ArticleListItem = ({ resource }) => (
    <div className="group flex gap-4 p-5 bg-white/80 backdrop-blur-sm border-l-4 border-transparent hover:border-current hover:shadow-md hover:bg-white/90 transition-all duration-300"
         style={{ '--tw-border-opacity': 1, borderColor: `${project.theme.primary}00`, '--hover-border': project.theme.primary }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <ArticlesIcon className="w-4 h-4 flex-shrink-0" style={{ color: project.theme.primary }} />
          <h3 className="font-bold text-gray-900 text-base">{resource.title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{resource.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{formatDate(resource.date)}</span>
          </div>
          <span>•</span>
          <span className="font-medium">{resource.category}</span>
        </div>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white self-start transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}>
        Read
        <ExternalIcon className="w-4 h-4" />
      </button>
    </div>
  );

  const VideoCard = ({ resource }) => (
    <div className="group relative bg-black rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500" style={{ height: '380px' }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      
      <div className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60" 
           style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }} />
      
      <div className="relative z-20 p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-auto">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md">
            <VideosIcon className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-medium text-white">Video</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-black/50 text-xs text-white font-medium">
            {formatFileSize(resource.size)}
          </span>
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-center mb-4">
            <button className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}>
              <PlayIcon className="w-5 h-5 text-white ml-0.5" />
            </button>
          </div>

          <h3 className="font-bold text-white text-sm mb-2 text-center">{resource.title}</h3>
          <p className="text-xs text-gray-300 mb-3 text-center line-clamp-2">{resource.description}</p>

          <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>{formatDate(resource.date)}</span>
            </div>
            <span>•</span>
            <span className="font-medium">{resource.category}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes blob1 {
          0%, 100% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% { 
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(30px, -30px) scale(1.1) rotate(180deg);
          }
        }
        
        @keyframes blob2 {
          0%, 100% { 
            border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% { 
            border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
            transform: translate(-40px, 40px) scale(1.15) rotate(-180deg);
          }
        }
        
        @keyframes blob3 {
          0%, 100% { 
            border-radius: 50% 50% 30% 70% / 30% 50% 70% 50%;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% { 
            border-radius: 30% 70% 70% 30% / 60% 40% 60% 40%;
            transform: translate(20px, 30px) scale(1.08) rotate(90deg);
          }
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

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .blob {
          position: absolute;
          mix-blend-mode: multiply;
          filter: blur(80px);
          will-change: transform, border-radius;
        }

        .blob1 {
          width: 600px;
          height: 600px;
          top: -200px;
          left: -100px;
          background: ${project.theme.primary}20;
          animation: blob1 20s ease-in-out infinite;
        }

        .blob2 {
          width: 500px;
          height: 500px;
          top: 100px;
          right: -150px;
          background: ${project.theme.secondary}18;
          animation: blob2 25s ease-in-out infinite;
        }

        .blob3 {
          width: 450px;
          height: 450px;
          bottom: -100px;
          left: 50%;
          background: ${project.theme.primary}15;
          animation: blob3 22s ease-in-out infinite;
        }
      `}</style>

      <div className="animated-bg relative overflow-hidden min-h-screen">
        <div className="noise-overlay"></div>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>

        {/* Header - seamless with background, no separate box */}
        <div className="relative z-10 pt-20 pb-8 px-6">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
            <p className="text-sm text-gray-600">Educational materials for {project.name}</p>
          </div>
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 pb-8">
          {/* Tabs */}
          <div className="flex gap-8 mb-8 border-b border-gray-900/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-3 text-sm font-semibold transition-all duration-300 border-b-2 ${
                    isActive 
                      ? 'border-current' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  style={isActive ? { color: project.theme.primary } : {}}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[280px]">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-900/10 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white/70 backdrop-blur-sm"
                style={{ '--tw-ring-color': project.theme.primary }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-900/10 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white/70 backdrop-blur-sm appearance-none cursor-pointer"
              style={{ '--tw-ring-color': project.theme.primary }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-900/10 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white/70 backdrop-blur-sm appearance-none cursor-pointer"
              style={{ '--tw-ring-color': project.theme.primary }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          {filteredResources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/70 backdrop-blur-sm rounded-lg">
              <SearchIcon className="w-12 h-12 text-gray-300 mb-3" />
              <h3 className="text-base font-semibold text-gray-700 mb-1">No resources found</h3>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              {activeTab === 'docs' && (
                <div className="rounded-lg border border-gray-900/10 overflow-hidden backdrop-blur-sm">
                  {filteredResources.map((resource) => (
                    <DocumentListItem key={resource.id} resource={resource} />
                  ))}
                </div>
              )}

              {activeTab === 'images' && (
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                  {filteredResources.map((resource, index) => (
                    <div key={resource.id} className="mb-4 break-inside-avoid">
                      <ImageMasonryItem resource={resource} index={index} />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'articles' && (
                <div className="space-y-4">
                  {filteredResources.map((resource) => (
                    <ArticleListItem key={resource.id} resource={resource} />
                  ))}
                </div>
              )}

              {activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredResources.map((resource) => (
                    <VideoCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
