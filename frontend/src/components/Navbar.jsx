// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Resources', href: '/resources' },
    { title: 'Get Involved', href: '/get-involved' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-colors duration-500 backdrop-blur-md ${isScrolled
          ? 'bg-white/80 shadow-md border-b border-gray-200'
          : 'bg-emerald-900/60 text-white'
          }`}
        style={{ height: '56px' }}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2 select-none">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md transform -rotate-3">
              N
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-xl font-extrabold leading-none tracking-tight transition-colors duration-500 ${isScrolled ? 'text-emerald-700' : 'text-white'
                  }`}
              >
                NSS IIT Delhi
              </h1>
              <p
                className={`text-[10px] font-semibold tracking-wide -mt-1 transition-colors duration-500 ${isScrolled ? 'text-emerald-500' : 'text-emerald-200'
                  }`}
              >
                Digital Education Initiative
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div
            className={`hidden md:flex space-x-6 font-semibold text-sm tracking-wide select-none transition-colors duration-500 ${isScrolled ? 'text-gray-700' : 'text-emerald-200'
              }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative py-2 px-1 hover:text-emerald-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-emerald-600 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 ${isScrolled ? 'text-gray-700' : 'text-emerald-200'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              to="/volunteer-register"
              className="bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-700 hover:to-emerald-500 text-white rounded-md px-4 py-1.5 shadow-lg transition-all duration-300 transform hover:-translate-y-[1px]"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/login"
              className={`border border-emerald-600 hover:bg-emerald-50 hover:text-emerald-500 rounded-md px-4 py-1.5 text-emerald-700 font-semibold transition duration-300
            ${isScrolled ? '' : 'text-emerald-200'
                }`}
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            aria-label="Toggle navigation menu"
          >
            <svg
              className={`w-7 h-7 ${isScrolled ? 'text-gray-700' : 'text-emerald-200'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md border-t border-gray-200">
            <div className="flex flex-col space-y-1 py-3 px-6 font-semibold text-gray-700 text-sm select-none">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="py-2 px-3 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                to="/volunteer-register"
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-md px-4 py-2 shadow-md transition-all duration-300 transform hover:-translate-y-[1px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Volunteer
              </Link>
              <Link
                to="/login"
                className="border border-emerald-600 text-emerald-700 rounded-md px-4 py-2 font-semibold hover:bg-emerald-50 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
