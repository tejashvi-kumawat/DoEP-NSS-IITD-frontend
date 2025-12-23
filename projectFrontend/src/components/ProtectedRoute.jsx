// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Role hierarchy:
 * admin > secy > exe > volunteer > student
 */
const roleHierarchy = {
    student: 1,
    volunteer: 2,
    exe: 3,
    secy: 4,
    admin: 5
};

/**
 * ProtectedRoute Component
 * Protects routes based on authentication and role-based access control
 * 
 * @param {Object} props
 * @param {React.Component} props.children - The component to render if access is granted
 * @param {Array<string>} props.allowedRoles - Array of roles that can access this route
 * @param {string} props.minRole - Minimum role required (includes all higher roles)
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 * @param {string} props.redirectTo - Path to redirect if access denied (default: '/login')
 */
const ProtectedRoute = ({
    children,
    allowedRoles = [],
    minRole = null,
    requireAuth = true,
    redirectTo = '/login'
}) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Check if authentication is required
    if (requireAuth && !isAuthenticated) {
        const normalizedAllowed = allowedRoles.map((r) => String(r).toLowerCase()).filter(Boolean);
        const isStudentOnly =
            (normalizedAllowed.length === 1 && normalizedAllowed[0] === 'student') ||
            (minRole && String(minRole).toLowerCase() === 'student');

        const effectiveRedirectTo = isStudentOnly ? '/student-login' : redirectTo;
        return <Navigate to={effectiveRedirectTo} state={{ from: location }} replace />;
    }

    // If no role restrictions, allow access for authenticated users
    if (!allowedRoles.length && !minRole) {
        return children;
    }

    // Get user's role
    const userRole = user?.role?.toLowerCase();

    // Check if user has required role using minRole (hierarchical)
    if (minRole) {
        const userRoleLevel = roleHierarchy[userRole] || 0;
        const minRoleLevel = roleHierarchy[minRole.toLowerCase()] || 0;

        if (userRoleLevel >= minRoleLevel) {
            return children;
        }
    }

    // Check if user's role is in allowedRoles (explicit list)
    if (allowedRoles.length > 0) {
        const hasAllowedRole = allowedRoles.some(
            role => role.toLowerCase() === userRole
        );

        if (hasAllowedRole) {
            return children;
        }
    }

    // If user is authenticated but doesn't have required role, redirect to unauthorized page
    return (
        <Navigate
            to="/unauthorized"
            state={{ from: location, requiredRole: minRole || allowedRoles.join(', ') }}
            replace
        />
    );
};

export default ProtectedRoute;
