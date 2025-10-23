// src/pages/RoleTester.jsx
// This is a DEVELOPMENT-ONLY component for testing role-based access
// Remove or protect this route in production!

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RoleTester = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('student');

    const roles = [
        { value: 'student', label: 'Student', color: 'bg-blue-500' },
        { value: 'volunteer', label: 'Volunteer', color: 'bg-green-500' },
        { value: 'exe', label: 'Exe', color: 'bg-yellow-500' },
        { value: 'secy', label: 'Secy', color: 'bg-purple-500' },
        { value: 'admin', label: 'Admin', color: 'bg-red-500' },
    ];

    const testRoutes = [
        // Public routes
        { path: '/', label: 'Home', access: 'Public' },
        { path: '/login', label: 'Login', access: 'Public' },

        // Authenticated routes
        { path: '/resources', label: 'Resources', access: 'All Authenticated' },
        { path: '/gallery', label: 'Gallery', access: 'All Authenticated' },
        { path: '/team', label: 'Team', access: 'All Authenticated' },

        // Student routes
        { path: '/doubts', label: 'Student Doubts', access: 'Student+' },
        { path: '/curriculum', label: 'Curriculum', access: 'Student+' },

        // Volunteer routes
        { path: '/volunteer-doubts', label: 'Volunteer Doubts', access: 'Volunteer+' },
        { path: '/mark-attendance', label: 'Mark Attendance', access: 'Volunteer+' },

        // Exe routes
        { path: '/dashboard', label: 'Dashboard', access: 'Exe+' },
        { path: '/student-data', label: 'Student Data', access: 'Exe+' },
        { path: '/verify-attendance', label: 'Verify Attendance', access: 'Exe+' },

        // Secy routes
        { path: '/curriculum-manage', label: 'Curriculum Manage', access: 'Secy+' },
        { path: '/add-student', label: 'Add Student', access: 'Secy+' },
        { path: '/approve-volunteers', label: 'Approve Volunteers', access: 'Secy+' },
    ];

    const setTestRole = (role) => {
        const testUser = {
            id: `test-${role}-${Date.now()}`,
            name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            email: `${role}@test.com`,
            role: role,
            userType: role === 'student' ? 'student' : 'member',
        };

        localStorage.setItem('user', JSON.stringify(testUser));
        window.location.reload();
    };

    const clearAuth = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Warning Banner */}
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    <p className="font-bold">⚠️ DEVELOPMENT ONLY</p>
                    <p className="text-sm">This page is for testing role-based access. Remove in production!</p>
                </div>

                {/* Current User Info */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Current User Status</h2>
                    {isAuthenticated && user ? (
                        <div className="space-y-2">
                            <p><span className="font-semibold">Authenticated:</span> ✅ Yes</p>
                            <p><span className="font-semibold">Name:</span> {user.name}</p>
                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                            <p><span className="font-semibold">Role:</span>
                                <span className={`ml-2 px-3 py-1 rounded text-white ${roles.find(r => r.value === user.role)?.color || 'bg-gray-500'
                                    }`}>
                                    {user.role?.toUpperCase()}
                                </span>
                            </p>
                            <p><span className="font-semibold">User Type:</span> {user.userType}</p>
                            <button
                                onClick={clearAuth}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Clear Authentication
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600">❌ Not authenticated</p>
                    )}
                </div>

                {/* Role Selector */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Set Test Role</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {roles.map((role) => (
                            <button
                                key={role.value}
                                onClick={() => setTestRole(role.value)}
                                className={`${role.color} hover:opacity-80 text-white font-semibold py-3 px-4 rounded transition-opacity`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Route Testing */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Test Routes</h2>
                    <p className="text-gray-600 mb-4">Click any route to navigate and test access</p>

                    <div className="space-y-2">
                        {testRoutes.map((route) => (
                            <div
                                key={route.path}
                                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(route.path)}
                            >
                                <div className="flex-1">
                                    <span className="font-semibold">{route.label}</span>
                                    <span className="text-gray-500 ml-2">({route.path})</span>
                                </div>
                                <span className="text-sm bg-gray-200 px-3 py-1 rounded">
                                    {route.access}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(route.path);
                                    }}
                                    className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Visit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                    <h2 className="text-2xl font-bold mb-4">Role Hierarchy Reference</h2>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Student:</span> Can access basic resources</p>
                        <p><span className="font-semibold">Volunteer:</span> Student + can manage attendance</p>
                        <p><span className="font-semibold">Exe:</span> Volunteer + can view dashboard and student data</p>
                        <p><span className="font-semibold">Secy:</span> Exe + can manage curriculum and approve volunteers</p>
                        <p><span className="font-semibold">Admin:</span> Full access to all routes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleTester;
