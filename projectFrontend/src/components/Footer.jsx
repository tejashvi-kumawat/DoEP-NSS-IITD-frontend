// src/components/ProjectFooter.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../assets/data/projects.json';
import { getProjectKeyFromSubdomain } from '../utils/projectConfig';

// SVG Icons
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProjectFooter = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectsData[key];
    setProject(projectInfo);
  }, []);

  if (!project) return null;

  // Public routes - Available to everyone
  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/resources', label: 'Resources' },
    { to: '/curriculum', label: 'Curriculum' },
    { to: '/team', label: 'Team' },
    { to: '/gallery', label: 'Gallery' }
  ];

  // Student routes - For logged-in students
  const studentLinks = [
    { to: '/student-login', label: 'Student Login' },
    { to: '/doubts', label: 'Ask Doubts' },
    { to: '/curriculum', label: 'View Curriculum' }
  ];

  // Volunteer routes - For logged-in volunteers
  const volunteerLinks = [
    { to: '/volunteer-login', label: 'Volunteer Login' },
    { to: '/volunteer-register', label: 'Register as Volunteer' },
    { to: '/mark-attendance', label: 'Mark Attendance' },
    { to: '/volunteer-doubts', label: 'Student Queries' }
  ];

  // Admin routes - For admin/secy/exe only
  const adminLinks = [
    { to: '/dashboard', label: 'Dashboard', protected: true },
    { to: '/curriculum-manage', label: 'Manage Curriculum', protected: true },
    { to: '/verify-attendance', label: 'Verify Attendance', protected: true },
    { to: '/student-data', label: 'Students Data', protected: true },
    { to: '/add-student', label: 'Add Student', protected: true },
    { to: '/approve-volunteers', label: 'Approve Volunteers', protected: true }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-black mb-6">{project.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://instagram.com/nssiitd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/nssiitd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/nssiitd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Public Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Explore</h3>
            <ul className="space-y-3">
              {publicLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-green-500 transition-colors duration-300"
                      style={{ backgroundColor: project.theme.primary }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students & Volunteers */}
          <div>
            <h3 className="text-lg font-bold mb-6">Portal Access</h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">FOR STUDENTS</p>
                <ul className="space-y-2">
                  {studentLinks.slice(0, 3).map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3">FOR VOLUNTEERS</p>
                <ul className="space-y-2">
                  {volunteerLinks.slice(0, 3).map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" />
                <span>{project.location}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <MailIcon className="w-5 h-5 flex-shrink-0 text-green-500" />
                <a href="mailto:nss@iitd.ac.in" className="hover:text-white transition-colors duration-300">
                  nss@iitd.ac.in
                </a>
              </li>
            </ul>

            {/* Admin Access Note */}
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500">
                <span className="font-semibold" style={{ color: project.theme.primary }}>Admin Portal:</span> Protected routes require authentication
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {project.name} · NSS IIT Delhi
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" /> by NSS Tech Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ProjectFooter;
