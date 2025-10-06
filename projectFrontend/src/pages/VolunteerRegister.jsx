// src/pages/VolunteerRegister.jsx (UPDATED with default Munirka theme)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../assets/data/projects.json';

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    const subdomain = host.split('.')[0];
    return subdomain !== 'localhost' ? subdomain : null;
  }
  if (host.includes('nssiitd.in')) {
    return host.split('.')[0];
  }
  return null;
};

const VolunteerRegister = () => {
  const [detectedProject, setDetectedProject] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(projectsData.munirka.theme); // Default Munirka theme
  const [form, setForm] = useState({
    name: '',
    hostel: '',
    entryNo: '',
    email: '',
    interestedProject: '',
    mobile: '',
    branch: '',
    year: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const projectKey = getProjectKeyFromSubdomain();
    
    if (projectKey && projectsData[projectKey]) {
      setDetectedProject(projectKey);
      setCurrentTheme(projectsData[projectKey].theme);
      setForm(prev => ({ ...prev, interestedProject: projectKey }));
      
      // Apply theme
      document.documentElement.style.setProperty('--theme-primary', projectsData[projectKey].theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectsData[projectKey].theme.secondary);
    } else {
      // Use Munirka theme as default
      document.documentElement.style.setProperty('--theme-primary', projectsData.munirka.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectsData.munirka.theme.secondary);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEntryNo = (entryNo) => {
    const pattern = /^\d{4}[A-Za-z]{2,3}\d{5}$/;
    return pattern.test(entryNo);
  };

  const validateIITDEmail = (email) => {
    return email.endsWith('@iitd.ac.in') || email.endsWith('@student.iitd.ac.in');
  };

  const validateMobile = (mobile) => {
    const pattern = /^[6-9]\d{9}$/;
    return pattern.test(mobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!form.name || !form.hostel || !form.entryNo || !form.email || !form.interestedProject || !form.mobile || !form.branch || !form.year) {
      setError('All fields are required.');
      return;
    }

    if (!validateEntryNo(form.entryNo)) {
      setError('Entry number must be in format: DDDD(CC/CCC)NNNNN (e.g., 2023CE10237)');
      return;
    }

    if (!validateIITDEmail(form.email)) {
      setError('Please use your IITD email address (@iitd.ac.in or @student.iitd.ac.in)');
      return;
    }

    if (!validateMobile(form.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Save to pending approvals (in real app, API call)
    const volunteerData = {
      ...form,
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    console.log('Volunteer registration:', volunteerData);
    
    setSuccess('Registration submitted successfully! You will receive login credentials via email once approved by the project coordinator.');
    
    // Reset form
    setTimeout(() => {
      setForm({
        name: '',
        hostel: '',
        entryNo: '',
        email: '',
        interestedProject: detectedProject || '',
        mobile: '',
        branch: '',
        year: ''
      });
      setSuccess('');
    }, 5000);
  };

  const projects = Object.entries(projectsData).map(([key, data]) => ({
    value: key,
    label: data.name
  }));

  return (
    <div className="min-h-screen pt-14 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animated-bg {
          background: linear-gradient(135deg, 
            ${currentTheme.primary}15 0%,
            ${currentTheme.secondary}10 50%,
            ${currentTheme.primary}15 100%
          );
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }
      `}</style>

      <div className="w-full max-w-2xl">
        <div className="animated-bg backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div 
            className="px-8 py-6 text-white"
            style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` }}
          >
            <h2 className="text-3xl font-black mb-2">Volunteer Registration</h2>
            <p className="text-white/90">
              {detectedProject 
                ? `Join ${projectsData[detectedProject].name}` 
                : 'Join NSS IIT Delhi'}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition"
                  style={{ '--tw-ring-color': currentTheme.primary }}
                />
              </div>

              {/* Entry Number & Branch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Entry Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="entryNo"
                    value={form.entryNo}
                    onChange={handleChange}
                    placeholder="2023CE10237"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Branch <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    placeholder="Computer Science"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  />
                </div>
              </div>

              {/* Year & Hostel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Year <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  >
                    <option value="" className="bg-gray-900">Select year</option>
                    <option value="1" className="bg-gray-900">1st Year</option>
                    <option value="2" className="bg-gray-900">2nd Year</option>
                    <option value="3" className="bg-gray-900">3rd Year</option>
                    <option value="4" className="bg-gray-900">4th Year</option>
                    <option value="5" className="bg-gray-900">5th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Hostel <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="hostel"
                    value={form.hostel}
                    onChange={handleChange}
                    placeholder="Hostel name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  />
                </div>
              </div>

              {/* Email & Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    IITD Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@iitd.ac.in"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  />
                </div>
              </div>

              {/* Project Selection */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Interested Project <span className="text-red-400">*</span>
                </label>
                {detectedProject ? (
                  <div className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white">
                    {projectsData[detectedProject].name}
                    <span className="ml-2 text-white/50 text-sm">(Auto-detected)</span>
                  </div>
                ) : (
                  <select
                    name="interestedProject"
                    value={form.interestedProject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{ '--tw-ring-color': currentTheme.primary }}
                  >
                    <option value="" className="bg-gray-900">Select a project</option>
                    {projects.map(project => (
                      <option key={project.value} value={project.value} className="bg-gray-900">
                        {project.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-lg text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` }}
              >
                Submit Registration
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-white/60 text-sm">
              <p>
                Already registered as a volunteer?{' '}
                <Link to="/login" className="font-semibold hover:text-white transition" style={{ color: currentTheme.primary }}>
                  Login Here
                </Link>
              </p>
              <p className="mt-2 text-xs">
                Login credentials will be sent to your email after approval
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegister;
