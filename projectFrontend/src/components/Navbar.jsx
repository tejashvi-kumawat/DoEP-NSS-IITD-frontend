import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProjectNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/project" },
    { title: "Team", href: "/project/team" },
    { title: "Doubts", href: "/project/doubts" },
    { title: "Resources", href: "/project/resources" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 backdrop-blur-md ${
        isScrolled
          ? "bg-white/80 shadow-md border-b border-gray-200 text-gray-900"
          : "bg-indigo-900/80 text-white"
      }`}
      style={{ height: "56px" }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/project" className="flex items-center space-x-2 select-none">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 flex items-center justify-center text-lg font-bold">
            PF
          </div>
          <span className="font-semibold text-lg">ProjectFrontend</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ title, href }) => (
            <Link
              key={title}
              to={href}
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              {title}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 text-gray-900">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map(({ title, href }) => (
              <Link
                key={title}
                to={href}
                className="block hover:text-indigo-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProjectNavbar;
