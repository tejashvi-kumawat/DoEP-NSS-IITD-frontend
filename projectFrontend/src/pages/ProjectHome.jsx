import React, { useEffect, useState } from "react";
import pillow from '../assets/pillow.jpg'
import bg from '../assets/1.jpg'

// ----- Project configuration array -----
const projectConfigs = [
  {
    id: "munirka",
    description: "Munirka: Education outreach in South Delhi.",
    banner: bg,
    theme: { bg: "bg-orange-100", text: "text-orange-700" },
  },
  {
    id: "vasantkunj",
    description: "Vasant Kunj: Literacy and empowerment drive.",
    banner: bg,
    theme: { bg: "bg-blue-100", text: "text-blue-700" },
  },
  // --- Add more projects as required ---
];

// ----- Main component -----
const ProjectHome = () => {
  // Extract subdomain (project id) from URL
  const subdomain = window.location.hostname.split(".")[0];
  // Find config for current project
  const config = projectConfigs.find((p) => p.id === subdomain);

  // State for backend data (optional)
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch backend project data based on subdomain/project id
  useEffect(() => {
    fetch(`/api/projects/data?id=${subdomain}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => setProjectData(data))
      .catch((err) => setError("Could not load project data"));
  }, [subdomain]);

  // Handle unknown project ids gracefully
  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-red-700 mb-4">
          Project Not Found
        </h2>
        <p className="text-lg text-gray-600">
          Please check the URL or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className={`${config.theme.bg} min-h-screen`}>
      <header className="container mx-auto py-8">
        {/* Project Title from subdomain */}
        <h1
          className={`text-4xl font-bold mb-4 ${config.theme.text} capitalize`}
        >
          {subdomain}
        </h1>
        {/* Banner image */}
        <img
          src={config.banner}
          alt={`${config.id} banner`}
          className="w-full rounded-lg mb-6 shadow"
        />
        {/* Project description */}
        <p className={`text-xl mb-6 ${config.theme.text}`}>
          {config.description}
        </p>
        {/* Render backend API data */}
        <section>
          {error && <div className="text-red-600">{error}</div>}
          {projectData && (
            <div>
              {/* Display your API data as needed */}
              <pre className="bg-white p-4 rounded text-gray-700">
                {JSON.stringify(projectData, null, 2)}
              </pre>
            </div>
          )}
          {!projectData && !error && (
            <div className="text-gray-500">Loading project details...</div>
          )}
        </section>
      </header>
    </div>
  );
};

export default ProjectHome;