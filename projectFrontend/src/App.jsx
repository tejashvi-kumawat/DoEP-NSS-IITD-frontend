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
import Dashboard from './pages/Dashboard';
import Curriculum from './pages/Curriculum';
import CurriculumManage from './pages/CurriculumManage';
import MarkAttendance from './pages/MarkAttendance';
import VerifyAttendance from './pages/VerifyAttendance';




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
          <Route path="/volunteer-doubts" element={<VolunteerDoubts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/curriculum-manage" element={<CurriculumManage />} />
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/verify-attendance" element={<VerifyAttendance />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
