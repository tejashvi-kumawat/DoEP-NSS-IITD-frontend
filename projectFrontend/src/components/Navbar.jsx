import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProjectNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get navigation links based on user role
  const getNavLinks = () => {
    const publicLinks = [
      { title: "Home", href: "/" },
      { title: "Team", href: "/team" },
      { title: "Gallery", href: "/gallery" },
    ];

    // If no user, show only public links
    if (!user) return publicLinks;

    const userRole = String(user.role || '').toLowerCase();

    // Keep only tabs created for the workflow in this chat.
    const links = [...publicLinks];

    // Resources are visible to all authenticated users
    links.push({ title: "Resources", href: "/resources" });

    if (userRole === 'student') {
      links.push({ title: "Curriculum", href: "/curriculum" });
      links.push({ title: "My Profile", href: "/student/profile" });
    }

    // Teaching is volunteer-only
    if (userRole === 'volunteer') {
      links.push({ title: "Curriculum Manage", href: "/curriculum-manage" });
      links.push({ title: "Availability", href: "/availability" });
      links.push({ title: "My Classes", href: "/mark-attendance" });
      links.push({ title: "My Performance", href: "/volunteer/performance" });
    }

    // Exe+ only manages scheduling
    if (userRole === 'exe' || userRole === 'secy' || userRole === 'admin') {
      links.push({ title: "Curriculum Manage", href: "/curriculum-manage" });
      links.push({ title: "Schedule", href: "/leader/schedule" });
      links.push({ title: "Add Students", href: "/add-student" });
    }

    return links;
  };

  const navLinks = getNavLinks();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              }}
            >
              <span className="text-white font-bold text-lg">PF</span>
            </div>
            <span
              className="text-xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
              }}
            >
              ProjectFrontend
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ title, href }) => (
              <Link
                key={href}
                to={href}
                className="text-gray-700 font-medium transition-colors duration-200"
                style={{
                  // on hover tailwind can't use CSS vars; keep default and rely on underline via group hover
                }}
              >
                {title}
              </Link>
            ))}

            {user ? (
              <div className="relative group">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-all"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  }}
                >
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map(({ title, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-purple-600 py-2 font-medium"
              >
                {title}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-red-50 text-red-600 py-2 rounded-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-gray-700 hover:text-purple-600 py-2 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-to-br from-purple-600 to-blue-600 text-white text-center py-2 rounded-lg font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProjectNavbar;
