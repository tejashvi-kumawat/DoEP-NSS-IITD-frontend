import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Add authentication logic here
    console.log("Logging in with", email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h2>
        {error && (
          <p className="text-sm text-amber-500 mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;