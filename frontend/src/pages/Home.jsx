// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Statistics from '../components/Statistics';
import Testimonial from '../components/Testimonial';
import Button from '../components/Button';
import projectsData from '../assets/data/projects.json';

const SexyLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-emerald-900 z-50">
    <div className="relative w-16 h-16">
      {[...Array(4)].map((_, i) => {
        const size = 64 - i * 12;
        return (
          <span
            key={i}
            className="absolute border-4 border-emerald-400 rounded-full border-t-transparent border-b-transparent animate-spin"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              marginTop: -size / 2,
              marginLeft: -size / 2,
              animationDuration: `${1.5 + i * 0.4}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            }}
          />
        );
      })}
    </div>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SexyLoader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white overflow-hidden" style={{ marginTop: '56px' }}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bTAgNDBjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Digitalising Educational Projects at{' '}
              <span className="text-emerald-300">NSS IIT Delhi</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 leading-relaxed">
              Empowering communities through technology-driven education initiatives. Join us in creating lasting impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Projects
              </Button>
              <Button variant="primary" className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Involved
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our initiatives making a difference in education and community development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* Testimonials Section */}
      <Testimonial />

      <Footer />
    </div>
  );
};

export default Home;
