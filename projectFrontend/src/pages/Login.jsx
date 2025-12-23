// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [kerberosid, setKerberosid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginMember, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const role = String(user.role || '').toLowerCase();
    if (role === 'admin' || role === 'secy' || role === 'exe') {
      navigate('/leader/schedule', { replace: true });
    } else {
      navigate('/availability', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kerberosid || !password) {
      setError("Please enter both Kerberos ID and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const loggedIn = await loginMember(kerberosid, password);
      const role = String(loggedIn?.role || '').toLowerCase();
      if (role === 'admin' || role === 'secy' || role === 'exe') {
        navigate('/leader/schedule');
      } else {
        navigate('/availability');
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            NSS Portal Login
          </h1>
          <p className="text-gray-600">Sign in to continue to NSS Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="kerberosid"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kerberos ID
            </label>
            <input
              type="text"
              id="kerberosid"
              value={kerberosid}
              onChange={(e) => setKerberosid(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your Kerberos ID"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Join NSS
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Are you a student?{' '}
            <Link to="/student-login" className="text-blue-600 hover:text-blue-700 font-medium">
              Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
