import React, { useState } from "react";
import { Link } from "react-router-dom";

const VolunteerRegister = () => {
  const [form, setForm] = useState({
    name: "",
    hostel: "",
    entryNo: "",
    email: "",
    interestedProject: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEntryNo = (entryNo) => {
    // Pattern: DDDD(CC/CCC)NNNNN where D=digit, C=char, N=number
    const pattern = /^\d{4}[A-Za-z]{2,3}\d{5}$/;
    return pattern.test(entryNo);
  };

  const validateIITDEmail = (email) => {
    return email.endsWith("@iitd.ac.in") || email.endsWith("@student.iitd.ac.in");
  };

  const validateMobile = (mobile) => {
    const pattern = /^[6-9]\d{9}$/;
    return pattern.test(mobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Check if all fields are filled
    if (!form.name || !form.hostel || !form.entryNo || !form.email || !form.interestedProject || !form.mobile) {
      setError("All fields are required.");
      return;
    }

    // Validate entry number format
    if (!validateEntryNo(form.entryNo)) {
      setError("Entry number must be in format: DDDD(CC/CCC)NNNNN (e.g., 2023CE10237)");
      return;
    }

    // Validate IITD email
    if (!validateIITDEmail(form.email)) {
      setError("Please use your IITD email address (@iitd.ac.in or @student.iitd.ac.in)");
      return;
    }

    // Validate mobile number
    if (!validateMobile(form.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    // TODO: Add volunteer registration API call logic here
    console.log("Registering volunteer", form);
    setSuccess("Volunteer registration submitted successfully! You will receive login credentials via email once approved.");
  };

  const projects = [
    { value: "", label: "Select a project" },
    { value: "munirka", label: "Munirka" },
    { value: "vidya", label: "Vidya" },
    { value: "hvdt", label: "HVDT" },
    { value: "jyoti", label: "Jyoti" },
    { value: "samadhan", label: "Samadhan" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Volunteer Registration</h2>
        
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>
        )}
        
        {success && (
          <p className="text-sm text-green-600 mb-4 text-center bg-green-50 p-3 rounded-lg">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="hostel" className="block text-gray-700 font-semibold mb-1">
              Hostel *
            </label>
            <input
              type="text"
              id="hostel"
              name="hostel"
              value={form.hostel}
              onChange={handleChange}
              placeholder="Enter your hostel name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="entryNo" className="block text-gray-700 font-semibold mb-1">
              Entry Number *
            </label>
            <input
              type="text"
              id="entryNo"
              name="entryNo"
              value={form.entryNo}
              onChange={handleChange}
              placeholder="e.g., 2023CE10237"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Format: DDDD(CC/CCC)NNNNN</p>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              IITD Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your.email@iitd.ac.in"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="interestedProject" className="block text-gray-700 font-semibold mb-1">
              Interested Project *
            </label>
            <select
              id="interestedProject"
              name="interestedProject"
              value={form.interestedProject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              required
            >
              {projects.map((project) => (
                <option key={project.value} value={project.value}>
                  {project.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-emerald-800 bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              maxLength="10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 mt-6"
          >
            Submit Application
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Already registered as a volunteer?{" "}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Login Here
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Note: Login credentials will be sent to your email after approval
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegister;
