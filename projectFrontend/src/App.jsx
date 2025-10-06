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
import StudentLogin from './pages/StudentLogin';
import StudentsData from './pages/StudentData';
import AddStudent from './pages/AddStudents';
import ApproveVolunteers from './pages/ApproveVolunteers';
import VolunteerRegister from './pages/VolunteerRegister';
import Login from './pages/Login';
import Register from './pages/Registration';
import ProjectFooter from './components/Footer';


const App = () => {
  return (
    <Router>
      <ProjectNavbar />
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
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-data" element={<StudentsData />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/approve-volunteers" element={<ApproveVolunteers />} />
          <Route path="/volunteer-register" element={<VolunteerRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
      <ProjectFooter/>
    </Router>
  );
};

export default App;
