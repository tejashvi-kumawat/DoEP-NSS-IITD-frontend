// src/pages/ProjectDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../api/api';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);

                // Fetch project details
                const projectData = await projectsAPI.getProjectById(projectId);
                setProject(projectData);

                // Fetch project stats
                try {
                    const statsData = await projectsAPI.getProjectStats(projectId);
                    setStats(statsData);
                } catch (err) {
                    console.log('Stats not available:', err);
                }

                // Fetch students
                try {
                    const studentsData = await projectsAPI.getProjectStudents(projectId);
                    setStudents(studentsData);
                } catch (err) {
                    console.log('Students not available:', err);
                }

                // Fetch volunteers
                try {
                    const volunteersData = await projectsAPI.getProjectVolunteers(projectId);
                    setVolunteers(volunteersData);
                } catch (err) {
                    console.log('Volunteers not available:', err);
                }
            } catch (err) {
                setError(err.message || 'Failed to load project data');
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-4">
                        {error}
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const role = user?.role?.toLowerCase() || 'volunteer';

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mb-4 flex items-center gap-2 text-blue-100 hover:text-white transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{project?.name || 'Project Details'}</h1>
                            <p className="text-blue-100 text-lg">{project?.description || 'No description available'}</p>
                        </div>
                        <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                            Active Project
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-6 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Total Students</div>
                                <div className="text-3xl font-bold text-gray-800">
                                    {stats?.totalStudents || students.length || 0}
                                </div>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Volunteers</div>
                                <div className="text-3xl font-bold text-gray-800">
                                    {stats?.totalVolunteers || volunteers.length || 0}
                                </div>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Total Hours</div>
                                <div className="text-3xl font-bold text-gray-800">
                                    {stats?.totalHours || 0}
                                </div>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Avg Attendance</div>
                                <div className="text-3xl font-bold text-gray-800">
                                    {stats?.avgAttendance || 0}%
                                </div>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-4 px-6 font-medium text-sm border-b-2 transition ${activeTab === 'overview'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('students')}
                                className={`py-4 px-6 font-medium text-sm border-b-2 transition ${activeTab === 'students'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Students ({students.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('volunteers')}
                                className={`py-4 px-6 font-medium text-sm border-b-2 transition ${activeTab === 'volunteers'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Volunteers ({volunteers.length})
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-sm text-gray-600 mb-1">Project Name</div>
                                            <div className="font-medium text-gray-800">{project?.name || 'N/A'}</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-sm text-gray-600 mb-1">Location</div>
                                            <div className="font-medium text-gray-800">{project?.location || 'N/A'}</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-sm text-gray-600 mb-1">Start Date</div>
                                            <div className="font-medium text-gray-800">
                                                {project?.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-sm text-gray-600 mb-1">Your Role</div>
                                            <div className="font-medium text-gray-800 capitalize">{role}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {project?.description || 'No description available for this project.'}
                                    </p>
                                </div>

                                {project?.objectives && project.objectives.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Objectives</h3>
                                        <ul className="space-y-2">
                                            {project.objectives.map((objective, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Students Tab */}
                        {activeTab === 'students' && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Students</h3>
                                {students.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <p className="text-gray-500">No students enrolled yet</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {students.map((student) => (
                                                    <tr key={student.id || student._id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="font-medium text-gray-900">{student.name}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {student.class}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {student.age}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.attendance >= 80 ? 'bg-green-100 text-green-800' :
                                                                    student.attendance >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'
                                                                }`}>
                                                                {student.attendance}%
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {student.contact || 'N/A'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Volunteers Tab */}
                        {activeTab === 'volunteers' && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Volunteers</h3>
                                {volunteers.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="text-gray-500">No volunteers assigned yet</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {volunteers.map((volunteer) => (
                                            <div key={volunteer.id || volunteer._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-semibold text-lg">
                                                            {volunteer.name?.charAt(0) || 'V'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800">{volunteer.name}</div>
                                                        <div className="text-sm text-gray-500">{volunteer.email || volunteer.kerberosid}</div>
                                                    </div>
                                                </div>
                                                {volunteer.assignedDays && volunteer.assignedDays.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className="text-xs text-gray-600 mb-2">Teaching Days:</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {volunteer.assignedDays.map((day, index) => (
                                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                                    {day}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="mt-3 text-sm text-gray-600">
                                                    {volunteer.phone && (
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            {volunteer.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {role === 'volunteer' && (
                            <Link
                                to="/mark-attendance"
                                className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                            >
                                <div className="bg-blue-500 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800">Mark Attendance</div>
                                    <div className="text-sm text-gray-600">Record today's attendance</div>
                                </div>
                            </Link>
                        )}

                        <Link
                            to="/resources"
                            className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                        >
                            <div className="bg-green-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800">Resources</div>
                                <div className="text-sm text-gray-600">Teaching materials</div>
                            </div>
                        </Link>

                        <Link
                            to="/curriculum"
                            className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                        >
                            <div className="bg-purple-500 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800">Curriculum</div>
                                <div className="text-sm text-gray-600">View course content</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
