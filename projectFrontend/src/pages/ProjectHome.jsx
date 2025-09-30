import React, { useEffect, useState } from 'react';
import ProjectNavbar from '../components/Navbar';
import projectData from '../assets/projects.json';

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    return host.split('.')[0]; // e.g., munirka.localhost
  }
  if (host.includes('nssiitd.in')) {
    return host.split('.')[0];
  }
  return 'munirka';
};

const ProjectHome = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    setProject(projectData[key]);
    document.body.style.background = projectData[key]?.theme?.background || '#fff';
  }, []);

  if (!project)
    return (
      <div className="flex h-screen bg-gray-200 items-center justify-center">
        <div className="animate-pulse text-2xl font-bold text-gray-400">Loading...</div>
      </div>
    );

  return (
    <>
      <ProjectNavbar theme={project.theme} projectName={project.name} />
      <div className="h-14 w-full" />
      <main className="px-6 pt-6 max-w-5xl mx-auto">
        <section id="overview" className="mb-10 text-center">
          <h1 className="font-extrabold text-4xl mb-4" style={{ color: project.theme.primary }}>
            {project.name}
          </h1>
          <p className="text-lg text-gray-700 mb-4">{project.description}</p>
        </section>
        <section
          id="stats"
          className="bg-white rounded-2xl shadow-lg py-8 px-8 mb-10 flex flex-col items-center"
          style={{
            borderColor: project.theme.primary,
            borderWidth: 2,
            borderStyle: 'solid',
            boxShadow: `0 2px 12px 0 ${project.theme.primary}22`,
          }}
        >
          <h2 className="font-bold text-2xl mb-6" style={{ color: project.theme.secondary }}>
            Project Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-center">
              <span className="font-extrabold text-3xl" style={{ color: project.theme.primary }}>{project.stats.students}</span>
              <span className="uppercase text-sm text-gray-500 mt-2">Students</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-extrabold text-3xl" style={{ color: project.theme.primary }}>{project.stats.volunteers}</span>
              <span className="uppercase text-sm text-gray-500 mt-2">Volunteers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-extrabold text-3xl" style={{ color: project.theme.primary }}>{project.stats.hours}</span>
              <span className="uppercase text-sm text-gray-500 mt-2">Teaching Hrs</span>
            </div>
          </div>
        </section>
        <section id="testimonials">
          <h2 className="font-bold text-2xl mb-6 text-center" style={{ color: project.theme.secondary }}>
            Testimonials
          </h2>
          <div className="grid gap-6">
            {project.testimonials.map((t, idx) => (
              <blockquote
                key={idx}
                className="bg-white rounded-xl shadow p-6 border-l-4"
                style={{ borderColor: project.theme.primary }}
              >
                <p className="italic text-lg font-medium text-gray-600">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-2 text-sm text-right text-emerald-700 font-bold">
                  {t.author} <span className="text-gray-400 font-normal">({t.role})</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectHome;
