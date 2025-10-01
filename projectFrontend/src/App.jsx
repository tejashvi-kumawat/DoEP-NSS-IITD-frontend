// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectHome from './pages/ProjectHome'
import ProjectNavbar from './components/Navbar';
import GalleryPage from './pages/GalleryPage';
import ResourcesPage from "./pages/ResourcesPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";

const App = () => {
  return (
    <Router>
      <ProjectNavbar/>
      <div>
        <Routes>
          <Route path="/" element={<ProjectHome />} />
            <Route path="/gallery" element={<GalleryPage />} /> {/* add GalleryPage route */}\
            <Route path="/team" element={<TeamPage />} /> {/* add GalleryPage route */}
            <Route path="/resources" element={<ResourcesPage />} /> {/* add GalleryPage route */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
