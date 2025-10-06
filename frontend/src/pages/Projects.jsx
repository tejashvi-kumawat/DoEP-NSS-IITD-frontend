// src/pages/Projects.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import projectsData from '../assets/data/projects.json';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const getProjectUrl = (subdomain) => {
    const isDev = process.env.NODE_ENV === 'development';
    return isDev 
      ? `http://${subdomain}.localhost:5174` 
      : `https://${subdomain}.do-ep-nss-iitd-frontend.vercel.app`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white overflow-hidden" style={{ marginTop: '56px' }}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bTAgNDBjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-emerald-300">Impact Projects</span>
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Explore detailed insights into our educational initiatives transforming communities across Delhi
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Projects Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16 max-w-7xl">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0;
            const isLeft = !isEven;
            
            return (
              <div 
                key={project.id}
                className={`mb-24 last:mb-0 ${hoveredProject === project.id ? 'scale-[1.01]' : ''} transition-all duration-500`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`flex flex-col lg:flex-row gap-12 items-center ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Content Side */}
                  <div className={`flex-1 px-4 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-block mb-4">
                      <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full">
                        Project #{index + 1}
                      </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                      {project.name}
                    </h2>
                    
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                      {project.longDescription}
                    </p>

                    {/* Stats Grid */}
                    <div className={`grid grid-cols-2 gap-4 mb-8 ${isLeft ? 'lg:justify-end' : ''}`}>
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">
                          {project.participants}+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Participants
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">
                          {project.volunteers}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Volunteers
                        </div>
                      </div>
                    </div>

                    {/* Goals Section */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Key Goals
                      </h3>
                      <ul className={`space-y-3 ${isLeft ? 'lg:ml-auto lg:mr-0' : ''} max-w-xl`}>
                        {project.goals.map((goal, idx) => (
                          <li key={idx} className={`flex items-start gap-3 ${isLeft ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-700 leading-relaxed">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Meta Info */}
                    <div className={`space-y-2 mb-8 text-sm text-gray-600 ${isLeft ? 'lg:flex lg:flex-col lg:items-end' : ''}`}>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-wrap gap-4 ${isLeft ? 'lg:justify-end' : ''}`}>
                      <a
                        href={getProjectUrl(project.subdomain)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Visit Project Site
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <button className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="flex-1 w-full px-4">
                    <div className="relative group">
                      {/* Main Card */}
                      <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 overflow-hidden">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-600/10 pointer-events-none"></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          {/* Icon/Logo Area */}
                          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>

                          {/* Impact Highlight */}
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              Impact Achieved
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              {project.impact}
                            </p>
                          </div>

                          {/* Progress Bars */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 font-medium">Community Reach</span>
                                <span className="text-emerald-600 font-semibold">
                                  {Math.round((project.participants / 150) * 100)}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000"
                                  style={{ width: `${Math.min((project.participants / 150) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 font-medium">Volunteer Engagement</span>
                                <span className="text-emerald-600 font-semibold">
                                  {Math.round((project.volunteers / 30) * 100)}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                                  style={{ width: `${Math.min((project.volunteers / 30) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-2xl font-bold text-emerald-600">A+</div>
                                <div className="text-xs text-gray-600 mt-1">Impact Grade</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-emerald-600">{project.goals.length}</div>
                                <div className="text-xs text-gray-600 mt-1">Active Goals</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-emerald-600">100%</div>
                                <div className="text-xs text-gray-600 mt-1">Dedication</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute -top-4 -right-4 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        <span className="text-sm font-bold">Active Project</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Divider */}
                {index < projectsData.length - 1 && (
                  <div className="mt-24 flex items-center justify-center">
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-emerald-300 to-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join our community of volunteers and help us transform education in underserved communities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Become a Volunteer
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Projects;
