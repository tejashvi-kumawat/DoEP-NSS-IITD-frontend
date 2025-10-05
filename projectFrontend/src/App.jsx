// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectHome from './pages/ProjectHome'
import ProjectNavbar from './components/Navbar';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import StudentDoubts from './pages/StudentDoubts';
import VolunteerDoubts from './pages/VolunteerDoubts';


const App = () => {
  return (
    <Router>
      <ProjectNavbar/>
      <div>
        <Routes>
          <Route path="/" element={<ProjectHome />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/doubts" element={<StudentDoubts />} />
          <Route path="/clear-doubts" element={<VolunteerDoubts />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
