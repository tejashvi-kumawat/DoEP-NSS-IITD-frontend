import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/api"; // Import authApi instead


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
      // Call login API using authApi
      const response = await authApi.login({ kerberosid, password });
      // OR: const response = await api.login({ kerberosid, password });
      
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
      // Handle different error types
      const errorMessage = err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      
      // Optional: Log error for debugging
      console.error("Login error:", err);
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>


          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
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
