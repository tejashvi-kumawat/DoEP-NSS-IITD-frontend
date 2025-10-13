import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";

const Login = () => {
  const [kerberosid, setKerberosid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!kerberosid || !password) {
      setError("Please enter both Kerberos ID and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call login API
      const response = await login({ kerberosid, password });
      
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isLoggedIn", "true");

      // Get assigned project (assuming first project if multiple)
      const assignedProject = response.user.assignedProjects?.[0];
      
      if (assignedProject) {
        // Redirect to project-specific subdomain
        const projectSubdomain = `${assignedProject}.nssiitd.in`;
        window.location.href = `https://${projectSubdomain}/dashboard`;
      } else {
        // Fallback to dashboard on main domain
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to continue to NSS Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="kerberosid" className="block text-sm font-medium text-gray-700 mb-2">
              Kerberos ID
            </label>
            <input
              type="text"
              id="kerberosid"
              value={kerberosid}
              onChange={(e) => setKerberosid(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter your Kerberos ID"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Don't have an account? <a href="/get-involved" className="text-emerald-600 hover:underline font-medium">Join NSS</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
