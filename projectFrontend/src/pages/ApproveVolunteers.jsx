// src/pages/ApproveVolunteers.jsx
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';
import volunteersData from '../assets/data/pending-volunteers.json';

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

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ApproveVolunteers = () => {
  const [project, setProject] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setProjectKey(key);
    
    // Filter volunteers for this project
    const projectVolunteers = volunteersData.filter(v => v.interestedProject === key);
    setVolunteers(projectVolunteers);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  const handleApprove = (id) => {
    if (window.confirm('Approve this volunteer? Login credentials will be sent to their email.')) {
      setVolunteers(volunteers.map(v => 
        v.id === id ? { ...v, status: 'approved', approvedAt: new Date().toISOString() } : v
      ));
      // In real app, send email with credentials
      console.log('Volunteer approved:', id);
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Reject this volunteer application?')) {
      setVolunteers(volunteers.map(v => 
        v.id === id ? { ...v, status: 'rejected', rejectedAt: new Date().toISOString() } : v
      ));
      console.log('Volunteer rejected:', id);
    }
  };

  const filteredVolunteers = volunteers.filter(v => v.status === filter);

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
      `}</style>

      <div className="animated-bg min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto max-w-6xl px-6 py-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Volunteer Approvals</h1>
            <p className="text-gray-600">{project.name}</p>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 py-8">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === status
                    ? 'text-white shadow-md'
                    : 'bg-white/70 text-gray-600 hover:bg-white/90'
                }`}
                style={filter === status ? { backgroundColor: project.theme.primary } : {}}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({volunteers.filter(v => v.status === status).length})
              </button>
            ))}
          </div>

          {/* Volunteers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVolunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                      >
                        {volunteer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{volunteer.name}</h3>
                        <p className="text-sm text-gray-600">{volunteer.entryNo}</p>
                      </div>
                    </div>
                    {volunteer.status === 'pending' && (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                        Pending
                      </span>
                    )}
                    {volunteer.status === 'approved' && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                        Approved
                      </span>
                    )}
                    {volunteer.status === 'rejected' && (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        Rejected
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MailIcon className="w-4 h-4 text-gray-500" />
                      {volunteer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <PhoneIcon className="w-4 h-4 text-gray-500" />
                      {volunteer.mobile}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Branch</p>
                        <p className="text-sm font-semibold text-gray-900">{volunteer.branch}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Year</p>
                        <p className="text-sm font-semibold text-gray-900">{volunteer.year}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Hostel</p>
                        <p className="text-sm font-semibold text-gray-900">{volunteer.hostel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Submitted</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(volunteer.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {volunteer.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(volunteer.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all duration-300"
                      >
                        <CheckIcon className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(volunteer.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-all duration-300"
                      >
                        <XIcon className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredVolunteers.length === 0 && (
            <div className="text-center py-20 bg-white/70 rounded-lg">
              <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-semibold">No {filter} volunteer applications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveVolunteers;
