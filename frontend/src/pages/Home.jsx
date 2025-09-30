// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Statistics from '../components/Statistics';
import Testimonial from '../components/Testimonial';
import Button from '../components/Button';

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

  const projects = [
    {
      id: 'munirka',
      name: 'Munirka Teaching Initiative',
      description: 'Structured teaching & digital literacy for children in Munirka.',
      participants: 120,
      volunteers: 25,
      subdomain: 'munirka',
    },
    {
      id: 'vidya',
      name: 'Vidya Digital Platform',
      description: 'Interactive digital courses for underserved students.',
      participants: 200,
      volunteers: 15,
      subdomain: 'vidya',
    },
    {
      id: 'sampark',
      name: 'Sampark Community Connect',
      description: 'Mentorship & skill development connecting students with communities.',
      participants: 80,
      volunteers: 20,
      subdomain: 'sampark',
    },
    // Add or remove projects dynamically here
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SexyLoader />;

  return (
    <>
      <Navbar />
      <main className="text-white">
        {/* Hero with gradient */}
        <section className="min-h-[320px] bg-gradient-to-b from-emerald-900 via-emerald-700 to-emerald-600 flex flex-col justify-center items-center text-center px-6 py-16">
          <h1 className="font-extrabold text-5xl max-w-4xl leading-tight mb-4 tracking-wide drop-shadow-lg">
            Empowering Communities <br /> Through Digital Education & Mentorship
          </h1>
          <p className="text-lg max-w-3xl mb-8 drop-shadow-md">
            Join us to uplift underserved students and connect volunteers through impactful projects.
          </p>
          <Button variant="secondary" size="lg" className="uppercase tracking-widest px-8">
            Get Involved
          </Button>
        </section>

        {/* Projects with dynamic centering and gradient background */}
        <section className="bg-gradient-to-b from-emerald-700 to-emerald-500 py-14 px-6">
          <div
            className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center ${
              projects.length % 3 === 1
                ? 'md:grid-cols-[repeat(3,1fr)] md:justify-center'
                : projects.length % 3 === 2
                ? 'md:grid-cols-[repeat(3,1fr)] md:justify-center'
                : ''
            }`}
          >
            {projects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </section>

        {/* Stats vertical full-width */}
        <section className="bg-gradient-to-b from-emerald-500 to-emerald-400 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white bg-opacity-10 rounded-3xl p-8">
              <Statistics />
            </div>
            <div className="bg-white bg-opacity-10 rounded-3xl p-8">
              <Testimonial />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Home;
