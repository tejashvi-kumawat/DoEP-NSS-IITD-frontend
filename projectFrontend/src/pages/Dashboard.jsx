// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { membersAPI, classesAPI, projectsAPI } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [memberData, setMemberData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch member details
        if (user?.kerberosid) {
          const memberResponse = await membersAPI.getMemberByKerberosId(user.kerberosid);
          setMemberData(memberResponse.data || memberResponse);

          // Fetch assigned projects
          try {
            const projectsResponse = await projectsAPI.getMemberProjects(user.kerberosid);
            setProjects(projectsResponse.data || projectsResponse);
          } catch (err) {
            console.log('No projects assigned or error fetching projects:', err);
            setProjects([]);
          }

          // Fetch assigned classes (for volunteers)
          try {
            const classesResponse = await membersAPI.getMemberClasses(user.kerberosid);
            setClasses(classesResponse.data || classesResponse);
          } catch (err) {
            console.log('No classes assigned or error fetching classes:', err);
            setClasses([]);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const roleConfig = {
    admin: {
      text: 'Administrator',
      color: 'purple',
      description: 'Full system access'
    },
    secy: {
      text: 'Secretary',
      color: 'blue',
      description: 'Managing multiple projects and operations'
    },
    exe: {
      text: 'Executive',
      color: 'indigo',
      description: 'Overseeing project execution'
    },
    volunteer: {
      text: 'Volunteer',
      color: 'green',
      description: 'Teaching and community engagement'
    },
    student: {
      text: 'Student',
      color: 'teal',
      description: 'Learning and growing'
    }
  };

  const role = memberData?.role?.toLowerCase() || 'volunteer';
  const roleInfo = roleConfig[role] || roleConfig.volunteer;

  const getBgColorClass = (color) => {
    const colors = {
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      teal: 'bg-teal-50 border-teal-200 text-teal-700'
    };
    return colors[color] || colors.green;
  };

  const getProjectColorClass = (index) => {
    const colors = ['blue', 'green', 'purple', 'indigo', 'pink', 'yellow'];
    const color = colors[index % colors.length];
    return {
      card: `bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200`,
      badge: `bg-${color}-500 text-white`,
      text: `text-${color}-700`,
      hover: `hover:shadow-${color}-200`
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {memberData?.name || user?.name}! 👋
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getBgColorClass(roleInfo.color)}`}>
                  {roleInfo.text}
                </span>
                <span className="text-blue-100 text-sm">{roleInfo.description}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Hostel</div>
                <div className="text-2xl font-bold text-gray-800">
                  {memberData?.hostel || 'N/A'}
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Vertical</div>
                <div className="text-2xl font-bold text-gray-800">
                  {memberData?.vertical || 'N/A'}
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Projects</div>
                <div className="text-2xl font-bold text-gray-800">
                  {projects.length}
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Classes</div>
                <div className="text-2xl font-bold text-gray-800">
                  {classes.length}
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">My Projects</h2>
            {(role === 'secy' || role === 'exe' || role === 'admin') && (
              <span className="text-sm text-gray-600">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'} assigned
              </span>
            )}
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-2">No projects assigned yet</p>
              <p className="text-gray-500 text-sm">Projects will appear here once assigned by administrators</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Link
                  key={project._id || project.id || index}
                  to={`/project/${project.id || project._id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition mb-2">
                          {project.name || 'Unnamed Project'}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {project.description || 'No description available'}
                        </p>
                      </div>
                      <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-gray-700">
                          <span className="font-semibold">{project.stats?.students || 0}</span> Students
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-700">
                          <span className="font-semibold">{project.stats?.volunteers || 0}</span> Volunteers
                        </span>
                      </div>

                      {project.assignedDays && project.assignedDays.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-700">
                            <span className="font-semibold">{project.assignedDays.join(', ')}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Your Role</span>
                        <span className="font-semibold text-gray-800 capitalize">{project.userRole || role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-3 flex items-center justify-between group-hover:bg-blue-50 transition">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                      View Project Details
                    </span>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Classes Section (for Volunteers) */}
        {role === 'volunteer' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Classes</h2>

            {classes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-2">No classes scheduled</p>
                <p className="text-gray-500 text-sm">Your teaching schedule will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                  <div
                    key={classItem._id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {classItem.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {classItem.program}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Date
                        </span>
                        <span className="font-medium text-gray-800">
                          {new Date(classItem.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Time
                        </span>
                        <span className="font-medium text-gray-800">
                          {classItem.startTime} - {classItem.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {role === 'volunteer' && (
              <>
                <Link
                  to="/mark-attendance"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
                >
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Mark Attendance</h3>
                  <p className="text-sm text-gray-600">Record student attendance</p>
                </Link>

                <Link
                  to="/volunteer-doubts"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
                >
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Student Doubts</h3>
                  <p className="text-sm text-gray-600">Answer student questions</p>
                </Link>
              </>
            )}

            {(role === 'exe' || role === 'secy' || role === 'admin') && (
              <>
                <Link
                  to="/student-data"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
                >
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Student Data</h3>
                  <p className="text-sm text-gray-600">View student records</p>
                </Link>

                <Link
                  to="/verify-attendance"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
                >
                  <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Verify Attendance</h3>
                  <p className="text-sm text-gray-600">Review attendance records</p>
                </Link>
              </>
            )}

            {(role === 'secy' || role === 'admin') && (
              <>
                <Link
                  to="/approve-volunteers"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
                >
                  <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Approve Volunteers</h3>
                  <p className="text-sm text-gray-600">Review new registrations</p>
                </Link>

                <Link
                  to="/curriculum-manage"
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
                >
                  <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Manage Curriculum</h3>
                  <p className="text-sm text-gray-600">Update course content</p>
                </Link>
              </>
            )}

            <Link
              to="/resources"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group"
            >
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Resources</h3>
              <p className="text-sm text-gray-600">Teaching materials & docs</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
