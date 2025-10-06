// src/pages/AddStudent.jsx
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    return host.split('.')[0];
  }
  if (host.includes('nssiitd.in')) {
    return host.split('.')[0];
  }
  return 'munirka';
};

const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AddStudent = () => {
  const [project, setProject] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    class: '5th',
    age: '',
    gender: 'Male',
    contact: '',
    address: '',
    guardian: '',
    attendance: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setProjectKey(key);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age || formData.age < 5 || formData.age > 20) {
      newErrors.age = 'Age must be between 5 and 20';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.contact)) {
      newErrors.contact = 'Invalid contact number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.guardian.trim()) {
      newErrors.guardian = 'Guardian name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const studentData = {
        ...formData,
        project: projectKey,
        id: Date.now()
      };

      console.log('New student data:', studentData);
      // In real app, send to backend API here

      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setFormData({
          rollNumber: '',
          name: '',
          class: '5th',
          age: '',
          gender: 'Male',
          contact: '',
          address: '',
          guardian: '',
          attendance: 0
        });
      }, 3000);
    }
  };

  if (!project) return null;

  return (
    <div className={`min-h-screen pt-14 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-bg {
          background: linear-gradient(135deg, 
            ${project.theme.primary}08 0%,
            ${project.theme.secondary}05 10%,
            ${project.theme.primary}10 20%,
            ${project.theme.secondary}08 30%,
            ${project.theme.primary}06 40%,
            ${project.theme.secondary}12 50%,
            ${project.theme.primary}09 60%,
            ${project.theme.secondary}07 70%,
            ${project.theme.primary}11 80%,
            ${project.theme.secondary}09 90%,
            ${project.theme.primary}08 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-message {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      <div className="animated-bg min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto max-w-3xl px-6 py-8">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
              >
                <UserIcon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-1">Add Student</h1>
                <p className="text-gray-600">{project.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-8">
          {/* Success Message */}
          {showSuccess && (
            <div 
              className="success-message mb-6 p-4 rounded-lg flex items-center gap-3 bg-green-100 border border-green-200 text-green-800"
            >
              <CheckIcon className="w-5 h-5 flex-shrink-0" />
              <p className="font-semibold">Student added successfully!</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-8 shadow-lg">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2" 
                  style={{ borderColor: project.theme.primary }}>
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="e.g., MNK001"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent transition-colors ${
                      errors.rollNumber ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ '--tw-ring-color': project.theme.primary }}
                  />
                  {errors.rollNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ '--tw-ring-color': project.theme.primary }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
                    style={{ '--tw-ring-color': project.theme.primary }}
                  >
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="5"
                    max="20"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent transition-colors ${
                      errors.age ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ '--tw-ring-color': project.theme.primary }}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                        className="w-4 h-4 text-current border-gray-300 focus:ring-2"
                        style={{ color: project.theme.primary, '--tw-ring-color': project.theme.primary }}
                      />
                      <span className="ml-2 text-sm text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                        className="w-4 h-4 text-current border-gray-300 focus:ring-2"
                        style={{ color: project.theme.primary, '--tw-ring-color': project.theme.primary }}
                      />
                      <span className="ml-2 text-sm text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2" 
                  style={{ borderColor: project.theme.primary }}>
                Contact Information
              </h2>

              <div className="space-y-5">
                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent transition-colors ${
                      errors.contact ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ '--tw-ring-color': project.theme.primary }}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    rows={3}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent resize-none transition-colors ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ '--tw-ring-color': project.theme.primary }}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Guardian */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="guardian"
                    value={formData.guardian}
                    onChange={handleChange}
                    placeholder="e.g., Rajesh Kumar (Father)"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-transparent transition-colors ${
                      errors.guardian ? 'border-red-500' : 'border-gray-200'
                    }`}
                    style={{ '--tw-ring-color': project.theme.primary }}
                  />
                  {errors.guardian && (
                    <p className="text-red-500 text-xs mt-1">{errors.guardian}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Project Info (Read-only) */}
            <div className="mb-8">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Project:</span> {project.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Student will be enrolled in the current project
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-4 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-4 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
