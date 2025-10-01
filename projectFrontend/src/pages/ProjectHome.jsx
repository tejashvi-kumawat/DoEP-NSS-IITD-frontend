import React, { useEffect, useState } from "react";
import projectData from "../assets/data/projects.json";

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes("localhost")) return host.split(".")[0];
  if (host.includes("nssiitd.in")) return host.split(".")[0];
  return "munirka";
};

const ProjectHome = () => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setTimeout(() => setIsLoaded(true), 150);
  }, []);

  if (!project) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="animate-pulse text-lg text-green-400">Loading project...</div>
        </div>
    );
  }

  return (
      <div className={`min-h-screen relative bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#111827] text-gray-100 font-sans transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Background Gradient Layers */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-green-400/50 via-green-500/30 to-transparent blur-3xl animate-slow-pulse"></div>
          <div className="absolute bottom-24 right-24 w-72 h-72 rounded-3xl bg-gradient-to-l from-green-600/40 via-green-700/30 to-transparent blur-2xl animate-slow-pulse animation-delay-[2s]"></div>
          <div className="absolute top-10 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-green-300/40 to-green-500/20 blur-2xl animate-slow-pulse animation-delay-[4s]"></div>
          <div className="absolute top-48 left-96 w-96 h-96 rounded-full bg-gradient-to-r from-green-700/60 to-green-900/40 blur-3xl animate-slow-pulse animation-delay-[3s]"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-xl bg-gradient-to-tr from-green-600 to-green-400 opacity-30 blur-2xl animate-slow-pulse animation-delay-[1s]"></div>
        </div>

        {/* Main content container */}
        <div className="relative max-w-6xl mx-auto px-10 py-28 flex flex-col items-center text-center space-y-14">
          {/* Badge with gradient background */}
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 shadow-lg backdrop-blur-md border border-green-700">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-green-300 to-green-400 animate-pulse shadow-lg" />
            <span className="font-bold tracking-wide uppercase text-green-100 select-none">NSS IIT Delhi</span>
          </div>

          {/* Headline with multicolor gradient and glow */}
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-tight drop-shadow-lg bg-gradient-to-r from-green-400 via-lime-300 to-green-200 bg-clip-text text-transparent animate-text-glow">
            {project.name}
          </h1>

          {/* Description with layered gradient text highlight */}
          <p className="max-w-3xl text-lg md:text-xl font-light text-gradient-green drop-shadow-sm">
            {project.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-4xl">
            <StatCard label="Students" value={project.stats.students} gradientFrom="from-green-400" gradientTo="to-lime-300" />
            <StatCard label="Volunteers" value={project.stats.volunteers} gradientFrom="from-emerald-400" gradientTo="to-green-300" />
            <StatCard label="Hours" value={project.stats.hours + "k"} gradientFrom="from-lime-500" gradientTo="to-green-200" />
          </div>

          {/* CTA Buttons with vivid gradients and layered shadows */}
          <div className="flex flex-col sm:flex-row gap-8 mt-12">
            <button className="bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 text-gray-900 font-bold rounded-full px-16 py-5 shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-1">
              Explore Project
            </button>
            <button className="border-2 border-green-300 text-green-300 font-semibold rounded-full px-16 py-5 hover:bg-green-800/50 transition-colors duration-300">
              Get Involved
            </button>
          </div>

          {/* Testimonial */}
          {project.testimonials?.length > 0 && (
              <blockquote className="max-w-3xl italic text-green-200 text-xl font-light mt-24 drop-shadow-md">
                “{project.testimonials[0].quote}”
                <footer className="mt-6 text-green-400 font-semibold text-lg">
                  — {project.testimonials[0].author}, {project.testimonials[0].role}
                </footer>
              </blockquote>
          )}
        </div>

        {/* Custom background gradient overlays */}
        <style jsx>{`
        .animate-slow-pulse {
          animation: slow-pulse 9s ease-in-out infinite;
        }
        @keyframes slow-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite alternate;
        }
        @keyframes text-glow {
          0% {
            text-shadow: 0 0 8px #b7f0ad, 0 0 20px #9be792;
          }
          100% {
            text-shadow: 0 0 20px #97e374, 0 0 30px #61d394;
          }
        }
        .text-gradient-green {
          background: linear-gradient(90deg, #a3e635, #4ade80, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      </div>
  );
};

const StatCard = ({ label, value, gradientFrom, gradientTo }) => (
    <div
        className={`relative rounded-3xl p-8 border border-green-700 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 cursor-default bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
    >
      <div className="text-6xl font-extrabold text-gray-900 mb-3 drop-shadow-md">{value.toLocaleString()}</div>
      <div className="uppercase text-gray-200 font-semibold tracking-wide">{label}</div>
    </div>
);

export default ProjectHome;
