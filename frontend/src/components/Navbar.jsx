// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Resources', href: '/resources' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
      }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/nss-logo.png" alt="NSS IIT Delhi" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">NSS IIT Delhi</span>
            <span className="text-sm text-gray-600">Digital Education Initiative</span>
          </div>
        </Link>

        <div className={`lg:flex items-center space-x-8 ${isMenuOpen
            ? 'absolute top-full left-0 right-0 flex flex-col items-start bg-white shadow-lg py-4 lg:py-0 lg:shadow-none lg:static lg:flex-row'
            : 'hidden lg:flex'
          }`}>
          {navLinks.map(link => (
            <Link
              key={link.title}
              to={link.href}
              className="text-gray-700 hover:text-emerald-600 font-medium px-4 py-2 lg:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/volunteer"
            className="hidden md:inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Become a Volunteer
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-emerald-600 font-medium"
          >
            Login
          </Link>
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
