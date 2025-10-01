import React, { useEffect, useState } from "react";
import projectData from "../assets/data/projects.json";

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes("localhost")) return host.split(".")[0];
  if (host.includes("nssiitd.in")) return host.split(".")[0];
  return "munirka"; // default project key
};

const ProjectHome = () => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  if (!project) return <div>Loading project...</div>;

  const { theme } = project;

  return (
      <div
          className={`min-h-screen font-sans transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(to bottom right, ${theme.bgFrom}, ${theme.bgVia}, ${theme.bgTo})`,
            color: theme.textColorHex,
          }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold mb-8 text-center">{project.name}</h1>
          <p
              className="max-w-3xl mx-auto text-center mb-10"
              style={{ color: theme.detailColorHex }}
          >
            {project.description}
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.cards &&
                project.cards.map(({ title, description, icon }, idx) => (
                    <div
                        key={idx}
                        className="p-6 bg-gray-900 bg-opacity-50 rounded-xl shadow-lg flex flex-col items-center text-center"
                        style={{
                          boxShadow: `0 4px 15px 0 ${theme.bgFrom}AA`
                        }}
                    >
                      {icon && (
                          <div className="mb-4 text-4xl" style={{ color: theme.textColorHex }}>
                            {icon}
                          </div>
                      )}
                      <h3 className="mb-2 font-semibold text-xl" style={{ color: theme.textColorHex }}>
                        {title}
                      </h3>
                      <p className="text-gray-300">{description}</p>
                    </div>
                ))}
          </div>
        </div>
      </div>
  );
};

export default ProjectHome;
