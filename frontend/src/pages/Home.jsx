// src/pages/Home.jsx
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import Statistics from '../components/Statistics';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import styles from './Home.module.css';
import img from '../assets/pillow.jpg';

const Home = () => {
  const projects = [
    {
      name: "Munirka Teaching Initiative",
      description: "Providing quality education to underprivileged children in Munirka village through structured teaching programs and digital literacy.",
      status: "Active",
      participants: 120,
      volunteers: 25,
      subdomain: "munirka"
    },
    {
      name: "Vidya Digital Platform",
      description: "Digital learning platform offering interactive courses and resources for students across different communities.",
      status: "Active", 
      participants: 200,
      volunteers: 15,
      subdomain: "vidya"
    },
    {
      name: "Sampark Community Connect",
      description: "Building bridges between IIT Delhi students and local communities through mentorship and skill development programs.",
      status: "Planning",
      participants: 80,
      volunteers: 20,
      subdomain: "sampark"
    },
    {
      name: "Shiksha Innovation Lab",
      description: "Experimental teaching methods and educational technology development for enhanced learning experiences.",
      status: "Active",
      participants: 150,
      volunteers: 30,
      subdomain: "shiksha"
    }
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="text-center">
              Digitalizing Education Projects at NSS IIT Delhi
            </h1>
            <p className={`text-center ${styles.heroDescription}`}>
              Empowering communities through innovative educational initiatives, 
              digital literacy programs, and sustainable teaching projects that create lasting impact.
            </p>
            <div className={styles.heroActions}>
              <button className="btn btn-primary">Explore Projects</button>
              <button className="btn btn-secondary">Join as Volunteer</button>
            </div>
          </div>
        </div>
      </section>

      {/* Active Projects Section */}
      <section className={styles.projectsSection}>
        <div className="container">
          <h2 className="text-center mb-8">Active Projects</h2>
          <p className="text-center mb-16">
            Discover our ongoing initiatives that are making a difference in communities
          </p>
          
          <div className="grid grid-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={`grid grid-2 ${styles.aboutGrid}`}>
            <div className={styles.aboutContent}>
              <h2>About NSS IIT Delhi</h2>
              <p>
                The National Service Scheme (NSS) at IIT Delhi is committed to developing 
                the personality and character of students through voluntary community service. 
                Our educational projects focus on bridging the digital divide and providing 
                quality education to underserved communities.
              </p>
              <p>
                Through innovative teaching methods, technology integration, and sustainable 
                community partnerships, we're creating lasting positive change in education 
                accessibility and quality.
              </p>
              <div className={styles.visionMission}>
                <div className={styles.visionCard}>
                  <h4>Our Vision</h4>
                  <p>To create an inclusive educational ecosystem where every individual has access to quality learning opportunities.</p>
                </div>
                <div className={styles.missionCard}>
                  <h4>Our Mission</h4>
                  <p>Leveraging technology and student volunteers to deliver innovative educational solutions to underserved communities.</p>
                </div>
              </div>
            </div>
            <div className={styles.aboutImage}>
              <img src={img} alt="NSS IIT Delhi Team" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonial />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
