// src/pages/Dashboard.jsx
import React, { useEffect, useState, useMemo } from 'react';
import allProjectsData from '../assets/data/projects.json';

const getCurrentUser = () => {
  return {
    name: "Rahul Verma",
    role: "executive", // "executive" | "secretary" | "admin"
    assignedProjects: ["munirka"],
  };
};

const ArrowIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  // Memoize projects to prevent recalculation
  const projects = useMemo(() => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return Object.entries(allProjectsData).map(([key, data]) => ({
        key,
        ...data
      }));
    }
    
    return user.assignedProjects.map(projectKey => ({
      key: projectKey,
      ...allProjectsData[projectKey]
    }));
  }, [user]);

  if (!user) return null;

  const roleText = {
    executive: 'Executive',
    secretary: 'Secretary', 
    admin: 'Administrator'
  }[user.role];

  return (
    <div className={`min-h-screen pt-14 bg-black transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Minimal Header */}
      <div className="border-b border-white/10">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/50 text-sm mb-2">{roleText}</p>
              <h1 className="text-4xl font-black text-white tracking-tight">
                {user.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.key}
              href={`http://${project.key}.localhost:5173`}
              className="group relative block bg-white/5 border-2 border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ 
                  background: `linear-gradient(90deg, ${project.theme.primary}, ${project.theme.secondary})` 
                }}
              />

              <div className="p-8">
                {/* Project Name */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {project.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center border-2 border-white/20 group-hover:border-white/50 transition-colors duration-300">
                    <ArrowIcon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Students</p>
                    <p className="text-white text-lg font-bold">24</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Volunteers</p>
                    <p className="text-white text-lg font-bold">8</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Events</p>
                    <p className="text-white text-lg font-bold">12</p>
                  </div>
                </div>
              </div>

              {/* Hover Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` 
                }}
              />
            </a>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/50">No projects assigned</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
