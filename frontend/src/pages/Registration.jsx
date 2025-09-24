import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    // TODO: Add registration API call logic here
    console.log("Registering user", form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register</h2>
        {error && (
          <p className="text-sm text-amber-500 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;