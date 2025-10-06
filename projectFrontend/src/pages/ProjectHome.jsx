// src/pages/ProjectHome.jsx (UPGRADED - Professional & Elegant)
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';

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

// Sexy Loader Component
const SexyLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <div className="relative">
      {/* Outer Ring */}
      <div className="w-24 h-24 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-cyan-500 animate-spin" />
      
      {/* Inner Ring */}
      <div className="absolute inset-3 w-18 h-18 rounded-full border-4 border-t-pink-500 border-r-cyan-500 border-b-blue-500 border-l-purple-500 animate-spin-reverse" />
      
      {/* Center Dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl animate-pulse" />
    </div>

    <style>{`
      @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      .animate-spin-reverse {
        animation: spin-reverse 1s linear infinite;
      }
    `}</style>
  </div>
);

// Elegant SVG Icons
const AcademicCapIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const QuoteIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const ProjectHome = () => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 1500);
  }, []);

  if (!project) {
    return <SexyLoader />;
  }

  return (
    <>
      {!isLoaded && <SexyLoader />}
      
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Hero Section - Elegant & Professional */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
               style={{ background: `radial-gradient(circle, ${project.theme.primary}, transparent)` }} />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-20"
               style={{ background: `radial-gradient(circle, ${project.theme.secondary}, transparent)` }} />

          <div className="container mx-auto max-w-7xl px-6 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-block">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                    <SparklesIcon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">NSS IIT Delhi Initiative</span>
                  </div>
                </div>

                <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                  {project.name}
                  <span className="block mt-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                    Project
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  {project.description}
                </p>

                {/* Location Badge */}
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-lg">{project.location}</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    className="group px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                  >
                    Explore Resources
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="px-8 py-4 rounded-lg font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    View Gallery
                  </button>
                </div>
              </div>

              {/* Right Visual - Abstract Shape */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-[500px]">
                  {/* Abstract SVG Illustration */}
                  <svg className="w-full h-full" viewBox="0 0 400 500" fill="none">
                    {/* Main Circle */}
                    <circle cx="200" cy="250" r="180" fill="url(#grad1)" fillOpacity="0.1" />
                    <circle cx="200" cy="250" r="150" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="10 5" />
                    
                    {/* Floating Elements */}
                    <circle cx="280" cy="150" r="30" fill={project.theme.primary} fillOpacity="0.2" />
                    <circle cx="120" cy="180" r="40" fill={project.theme.secondary} fillOpacity="0.2" />
                    <circle cx="300" cy="320" r="25" fill={project.theme.primary} fillOpacity="0.3" />
                    
                    {/* Lines */}
                    <line x1="200" y1="100" x2="200" y2="400" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
                    <line x1="50" y1="250" x2="350" y2="250" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
                    
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: project.theme.primary }} />
                        <stop offset="100%" style={{ stopColor: project.theme.secondary }} />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Floating Stats Cards */}
                  <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                           style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}>
                        <AcademicCapIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white">150+</p>
                        <p className="text-xs text-gray-300">Students</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                           style={{ background: `linear-gradient(135deg, ${project.theme.secondary}, ${project.theme.primary})` }}>
                        <UsersIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white">25+</p>
                        <p className="text-xs text-gray-300">Volunteers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Minimal & Elegant */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Students Enrolled', value: '250+', icon: AcademicCapIcon },
                { label: 'Active Volunteers', value: '35+', icon: UsersIcon },
                { label: 'Events Conducted', value: '50+', icon: SparklesIcon },
                { label: 'Success Stories', value: '100+', icon: QuoteIcon }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                       style={{ background: `linear-gradient(135deg, ${project.theme.primary}15, ${project.theme.secondary}15)` }}>
                    <stat.icon className="w-8 h-8 transition-colors duration-300"
                                style={{ color: project.theme.primary }} />
                  </div>
                  <h3 className="text-4xl font-black mb-2" style={{ color: project.theme.primary }}>
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section - Sophisticated */}
        {project.testimonials && project.testimonials.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle, ${project.theme.primary} 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="container mx-auto max-w-4xl px-6 relative z-10">
              <div className="text-center mb-12">
                <QuoteIcon className="w-12 h-12 mx-auto mb-6 opacity-20" 
                           style={{ color: project.theme.primary }} />
              </div>

              <blockquote className="text-center">
                <p className="text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed mb-8 italic">
                  "{project.testimonials[0].quote}"
                </p>
                <footer className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                       style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}>
                    {project.testimonials[0].author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{project.testimonials[0].author}</p>
                    <p className="text-sm text-gray-600">{project.testimonials[0].role}</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </section>
        )}

        {/* CTA Section - Modern & Clean */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join our community of volunteers and help transform lives through education and empowerment.
            </p>
            <button 
              className="px-10 py-5 rounded-lg font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3"
              style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
            >
              Get Involved Today
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectHome;
