// src/pages/Team.jsx
import React, { useEffect, useState, useRef } from 'react';
import projectData from '../assets/data/projects.json';
import teamData from '../assets/data/team.json';

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

// Tilt Card Component
const TiltCard = ({ member, theme, isSecretary = false }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer ${isSecretary ? 'max-w-lg mx-auto' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Card */}
      <div className="relative bg-black rounded-2xl overflow-hidden">
        {/* Image */}
        <div className={`relative overflow-hidden ${isSecretary ? 'h-[500px]' : 'h-96'}`}>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-bold text-black mb-3"
                style={{ backgroundColor: theme.primary }}
              >
                {member.role}
              </span>
              <h3 className={`font-black text-white mb-2 ${isSecretary ? 'text-4xl' : 'text-2xl'}`}>
                {member.name}
              </h3>
              <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {member.bio}
              </p>
              
              {/* Contact button */}
              <button
                onClick={() => window.location.href = `mailto:${member.social.email}`}
                className="px-6 py-2 rounded-full text-black text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                style={{ backgroundColor: theme.primary }}
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Shine effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(120deg, transparent, ${theme.primary}40, transparent)`,
              backgroundSize: '200% 100%',
              animation: 'shine 2s ease-in-out',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [project, setProject] = useState(null);
  const [team, setTeam] = useState({ secretary: null, executives: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setTeam(teamData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-white mx-auto"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Minimal Hero */}
      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tight">
            Team
          </h1>
          <div className="w-24 h-1 mx-auto" 
               style={{ background: `linear-gradient(90deg, ${project.theme.primary}, ${project.theme.secondary})` }} />
        </div>
      </div>

      {/* Secretary */}
      {team.secretary && (
        <div className="px-6 pb-20">
          <div className="container mx-auto max-w-6xl">
            <TiltCard member={team.secretary} theme={project.theme} isSecretary={true} />
          </div>
        </div>
      )}

      {/* Divider */}
      {team.executives.length > 0 && (
        <div className="px-6 pb-16">
          <div className="container mx-auto max-w-6xl">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      )}

      {/* Executives Grid */}
      {team.executives.length > 0 && (
        <div className="px-6 pb-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.executives.map((exec) => (
                <TiltCard key={exec.id} member={exec} theme={project.theme} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
