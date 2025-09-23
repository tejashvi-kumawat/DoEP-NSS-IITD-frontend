// src/pages/Home.jsx
import React from 'react';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import Statistics from '../components/Statistics';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import img from '../assets/pillow.jpg';

const Home = () => {
  const projects = [
    {
      id: 'munirka',
      name: 'Munirka Teaching Initiative',
      description: 'Structured teaching & digital literacy for children in Munirka.',
      status: 'Active',
      participants: 120,
      volunteers: 25,
      subdomain: 'munirka'
    },
    {
      id: 'vidya',
      name: 'Vidya Digital Platform',
      description: 'Interactive digital courses for underserved students.',
      status: 'Active',
      participants: 200,
      volunteers: 15,
      subdomain: 'vidya'
    },
    {
      id: 'sampark',
      name: 'Sampark Community Connect',
      description: 'Mentorship & skill development connecting students with communities.',
      status: 'Planning',
      participants: 80,
      volunteers: 20,
      subdomain: 'sampark'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Digital Education Initiative at NSS IIT Delhi
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Empowering communities through digital education and mentorship.
              </p>
              <div className="space-x-4">
                <Button variant="primary">Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src={img}
                alt="Digital Education"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Statistics />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
