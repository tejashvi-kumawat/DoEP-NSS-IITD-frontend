// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import components
import ProjectHome from './pages/ProjectHome';
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <>
      <ProjectNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ProjectHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/volunteer-register" element={<VolunteerRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-doubts"
          element={
            <ProtectedRoute>
              <StudentDoubts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer-doubts"
          element={
            <ProtectedRoute>
              <VolunteerDoubts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum"
          element={
            <ProtectedRoute>
              <Curriculum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum-manage"
          element={
            <ProtectedRoute>
              <CurriculumManage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-attendance"
          element={
            <ProtectedRoute>
              <MarkAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-attendance"
          element={
            <ProtectedRoute>
              <VerifyAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students-data"
          element={
            <ProtectedRoute>
              <StudentsData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approve-volunteers"
          element={
            <ProtectedRoute>
              <ApproveVolunteers />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ProjectFooter />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
