import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProjectNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Team", href: "/team" },
    { title: "Doubts", href: "/doubts" },
    { title: "Resources", href: "/resources" },
    { title: "Gallery", href: "/gallery" },
  ];

  return (
      <nav
          className={`fixed w-full z-30 transition-all duration-300 ${
              isScrolled
                  ? "bg-gradient-to-r from-[#1f2937] via-[#374151] to-[#111827] shadow-lg"
                  : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="font-bold text-emerald-400 text-2xl select-none">PF</div>
            <span className="text-gray-100 font-semibold text-xl">ProjectFrontend</span>
          </Link>

          {/* Desktop Nav Links and Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ title, href }) => (
                <Link
                    key={title}
                    to={href}
                    className="text-gray-300 hover:text-emerald-400 font-medium transition-colors"
                >
                  {title}
                </Link>
            ))}

            {/* Login Button */}
            <button
                onClick={() => navigate("/login")}
                className="ml-4 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 hover:from-lime-500 hover:via-green-500 hover:to-emerald-600 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md transition-colors"
            >
              Login
            </button>

            {/* Become a Volunteer Button */}
            <button
                onClick={() => navigate("/volunteer-register")}
                className="ml-4 bg-gradient-to-r from-emerald-500 via-green-600 to-lime-500 hover:from-emerald-600 hover:via-green-700 hover:to-lime-600 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md transition-colors"
            >
              Become a Volunteer
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none text-gray-100"
              aria-label="Toggle menu"
          >
            {isMenuOpen ? (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-gradient-to-r from-[#1f2937] via-[#374151] to-[#111827] shadow-lg px-6 py-4 space-y-4">
              {navLinks.map(({ title, href }) => (
                  <Link
                      key={title}
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-300 hover:text-emerald-400 font-medium transition-colors"
                  >
                    {title}
                  </Link>
              ))}

              <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 hover:from-lime-500 hover:via-green-500 hover:to-emerald-600 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md transition-colors"
              >
                Login
              </button>

              <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/volunteer-register");
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-lime-500 hover:from-emerald-600 hover:via-green-700 hover:to-lime-600 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md transition-colors"
              >
                Become a Volunteer
              </button>
            </div>
        )}
      </nav>
  );
};

export default ProjectNavbar;
