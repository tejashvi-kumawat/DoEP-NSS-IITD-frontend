// NSSIITD.jsx
import React, { useEffect, useMemo, useState } from "react";

// Keep your compiled Tailwind and custom CSS as project imports (do not inline <style> tags in components)
import "../../styles/styles.css";

const Home = () => {
  // Minimal state/behavior without altering the UI
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [mobileOpen, setMobileOpen] = useState(false);

  // Smooth-scroll handler for same-page anchors while preserving anchor hrefs
  const handleAnchorClick = (e, id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Trap focus/scroll for an off-canvas menu if later needed, currently just toggles state without UI changes
  const toggleMobile = () => setMobileOpen((v) => !v);

  // Ensure footer year is current on mount and ticks at year change
  useEffect(() => {
    const tick = setInterval(() => {
      const y = new Date().getFullYear();
      setYear((prev) => (prev !== y ? y : prev));
    }, 60 * 1000);
    return () => clearInterval(tick);
  }, []);

  // Memoize brand block
  const Brand = useMemo(
    () => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart w-6 h-6 text-white"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">NSS IITD</h1>
          <p className="text-xs text-tertiary">Not Me But You</p>
        </div>
      </div>
    ),
    []
  );

  return (
    <div id="root">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b border-default">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {Brand}

              {/* Desktop nav (unchanged classNames) */}
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#home"
                  onClick={(e) => handleAnchorClick(e, "home")}
                  className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span>Home</span>
                </a>

                <a
                  href="#about"
                  onClick={(e) => handleAnchorClick(e, "about")}
                  className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <circle cx={9} cy={7} r={4} />
                  </svg>
                  <span>About</span>
                </a>

                <a
                  href="#events"
                  onClick={(e) => handleAnchorClick(e, "events")}
                  className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width={18} height={18} x={3} y={4} rx={2} />
                    <path d="M3 10h18" />
                  </svg>
                  <span>Events</span>
                </a>

                <a
                  href="#achievements"
                  onClick={(e) => handleAnchorClick(e, "achievements")}
                  className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-award w-4 h-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                    <circle cx={12} cy={8} r={6} />
                  </svg>
                  <span>Achievements</span>
                </a>
              </nav>

              {/* Desktop CTA (unchanged classes) */}
              <div className="hidden md:block">
                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                  Join Us
                </button>
              </div>

              {/* Mobile menu button (stateful, UI unchanged) */}
              <button
                className="md:hidden p-2 rounded-md text-secondary hover:text-primary hover:bg-background-alt transition-colors"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={toggleMobile}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu w-6 h-6"
                  aria-hidden="true"
                >
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                  <path d="M4 6h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main>
          {/* Home Section (kept classes/content to preserve UI) */}
          <section id="home" className="min-h-screen bg-gradient-hero relative overflow-hidden pt-16">
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 25%, rgb(5, 150, 105) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgb(5, 150, 105) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
                <div className="space-y-8 animate-slide-in-left">
                  <div className="inline-flex items-center space-x-2 bg-surface px-4 py-2 rounded-full border border-default shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-sparkles w-4 h-4 text-primary"
                      aria-hidden="true"
                    >
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                      <path d="M20 3v4" />
                      <path d="M22 5h-4" />
                      <path d="M4 17v2" />
                      <path d="M5 18H3" />
                    </svg>
                    <span className="text-sm font-medium text-secondary">Serving Since 1969</span>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-tight">
                      NSS<span className="block text-primary-dark">IITD</span>
                    </h1>
                    <p className="text-2xl lg:text-3xl font-semibold text-secondary">Not Me But You</p>
                  </div>

                  <p className="text-lg text-tertiary leading-relaxed max-w-xl">
                    National Service Scheme at IIT Delhi - Empowering students to serve society through meaningful community engagement, social awareness, and sustainable development initiatives.
                  </p>

                  <div className="grid grid-cols-3 gap-6 py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">500+</div>
                      <div className="text-sm text-tertiary">Active Volunteers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-sm text-tertiary">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">10K+</div>
                      <div className="text-sm text-tertiary">Lives Impacted</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 group">
                      <span>Get Involved</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right w-5 h-5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                    <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Right hero illustration block (classes kept) */}
                <div className="relative animate-slide-in-right">
                  <div className="relative">
                    <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto relative">
                      <div className="absolute inset-0 bg-gradient-primary rounded-full animate-pulse-glow" />
                      <div className="absolute inset-4 bg-surface rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-heart w-24 h-24 text-primary animate-float"
                          aria-hidden="true"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Floating badges (classes kept) */}
                    <div
                      className="absolute -top-8 -left-8 w-16 h-16 bg-success rounded-full flex items-center justify-center animate-float shadow-lg"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users w-8 h-8 text-white"
                        aria-hidden="true"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <circle cx={9} cy={7} r={4} />
                      </svg>
                    </div>

                    <div
                      className="absolute -bottom-8 -right-8 w-20 h-20 bg-warning rounded-full flex items-center justify-center animate-float shadow-lg"
                      style={{ animationDelay: "1s" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sparkles w-10 h-10 text-white"
                        aria-hidden="true"
                      >
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                        <path d="M20 3v4" />
                        <path d="M22 5h-4" />
                        <path d="M4 17v2" />
                        <path d="M5 18H3" />
                      </svg>
                    </div>

                    <div
                      className="absolute top-1/2 -right-12 w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center animate-float shadow-lg"
                      style={{ animationDelay: "1.5s" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart w-6 h-6 text-white"
                        aria-hidden="true"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute -z-10 top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
                  <div className="absolute -z-10 bottom-1/4 right-1/4 w-40 h-40 bg-success/10 rounded-full blur-xl" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </section>

          {/* About Section (kept classes/content; replicate remaining blocks from original as needed) */}
          <section id="about" className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-target w-4 h-4 text-primary"
                    aria-hidden="true"
                  >
                    <circle cx={12} cy={12} r={10} />
                    <circle cx={12} cy={12} r={6} />
                    <circle cx={12} cy={12} r={2} />
                  </svg>
                  <span className="text-sm font-medium text-primary">About NSS IITD</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
                  Empowering Change Through Service
                </h2>
                <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
                  The National Service Scheme at IIT Delhi has been fostering social responsibility and community engagement among students for over five decades.
                </p>
              </div>
              {/* Continue reproducing your original About grid/cards here with the same className values */}
            </div>
          </section>

          {/* Events Section placeholder (replicate your original cards; classes unchanged) */}
          <section id="events" className="py-20 bg-background-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar w-4 h-4 text-primary"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width={18} height={18} x={3} y={4} rx={2} />
                    <path d="M3 10h18" />
                  </svg>
                  <span className="text-sm font-medium text-primary">Events &amp; Activities</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Join Our Initiatives</h2>
                <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
                  Be part of meaningful activities that create positive impact in our community. Every event is an opportunity to serve and grow together.
                </p>
              </div>

              {/* Reproduce your full event cards grid here using the same className strings from the original */}
            </div>
          </section>
        </main>

        {/* Footer (classes preserved; dynamic year used) */}
        <footer className="bg-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart w-7 h-7 text-primary"
                        aria-hidden="true"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">NSS IITD</h3>
                      <p className="text-sm opacity-80">Not Me But You</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Empowering students to serve society through meaningful community engagement and sustainable development initiatives since 1969.
                  </p>
                  {/* Social icons block preserved if needed */}
                </div>

                {/* Replicate remaining footer columns and items using the same classes */}
              </div>
            </div>

            <div className="border-t border-white/20 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-white/60 text-sm">© {year} NSS IIT Delhi. All rights reserved.</div>
                <div className="flex items-center space-x-6 text-sm text-white/60">
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Code of Conduct
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-success to-warning" />
        </footer>
      </div>
    </div>
  );
};

export default Home;
