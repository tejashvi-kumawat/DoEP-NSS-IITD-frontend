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
import ProjectDetail from './pages/ProjectDetail';
import Curriculum from './pages/Curriculum';
import CurriculumManage from './pages/CurriculumManage';
import MySessions from './pages/MySessions';
import VolunteerAvailability from './pages/VolunteerAvailability';
import LeaderSchedule from './pages/LeaderSchedule';
import VerifyAttendance from './pages/VerifyAttendance';
import StudentLogin from './pages/StudentLogin';
import VolunteerPerformance from './pages/VolunteerPerformance';
import StudentPerformance from './pages/StudentPerformance';
import StudentsData from './pages/StudentData';
import AddStudent from './pages/AddStudents';
import ApproveVolunteers from './pages/ApproveVolunteers';
import VolunteerRegister from './pages/VolunteerRegister';
import Login from './pages/Login';
import Register from './pages/Registration';
import ProjectFooter from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import RoleTester from './pages/RoleTester'; // REMOVE IN PRODUCTION
import ProjectHomePage from './pages/ProjectHomePage';
import { ProjectConfigProvider } from './context/ProjectConfigContext';

const App = () => {
  return (
    <Router>
      <ProjectConfigProvider>
        <ProjectNavbar />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ProjectHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/volunteer-register" element={<VolunteerRegister />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />

            {/* DEVELOPMENT ONLY - REMOVE IN PRODUCTION */}
            <Route path="/test-roles" element={<RoleTester />} />

            {/* Routes accessible by all authenticated users */}
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />


            {/* Student Routes - Accessible by students and above */}
            <Route
              path="/doubts"
              element={
                <ProtectedRoute minRole="student">
                  <StudentDoubts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curriculum"
              element={
                <ProtectedRoute minRole="student">
                  <Curriculum />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Routes - Accessible by volunteers and above */}
            <Route
              path="/answer-doubts"
              element={
                <ProtectedRoute minRole="volunteer">
                  <VolunteerDoubts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mark-attendance"
              element={
                <ProtectedRoute allowedRoles={["volunteer"]}>
                  <MySessions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/availability"
              element={
                <ProtectedRoute allowedRoles={["volunteer"]}>
                  <VolunteerAvailability />
                </ProtectedRoute>
              }
            />

            <Route
              path="/volunteer/performance"
              element={
                <ProtectedRoute allowedRoles={["volunteer"]}>
                  <VolunteerPerformance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/performance"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentPerformance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leader/schedule"
              element={
                <ProtectedRoute minRole="exe">
                  <LeaderSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute minRole="volunteer">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <ProtectedRoute minRole="volunteer">
                  <ProjectDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curriculum-manage"
              element={
                <ProtectedRoute minRole="volunteer">
                  <CurriculumManage />
                </ProtectedRoute>
              }
            />

            {/* Exe Routes - Accessible by exe and above */}
            <Route
              path="/student-data"
              element={
                <ProtectedRoute minRole="exe">
                  <StudentsData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify-attendance"
              element={
                <ProtectedRoute minRole="exe">
                  <VerifyAttendance />
                </ProtectedRoute>
              }
            />

            {/* Secy Routes - Accessible by secy and above */}
            <Route
              path="/add-student"
              element={
                <ProtectedRoute minRole="exe">
                  <AddStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/approve-volunteers"
              element={
                <ProtectedRoute minRole="secy">
                  <ApproveVolunteers />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - Accessible by admin only */}
            {/* Add admin-specific routes here when needed */}
            {/* Example:
          <Route 
            path="/admin-panel" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          */}

          </Routes>
        </div>
        <ProjectFooter />
      </ProjectConfigProvider>
    </Router>
  );
};

export default App;

