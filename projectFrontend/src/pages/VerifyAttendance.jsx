// src/pages/VerifyAttendance.jsx (UPDATED with Expandable Cards)
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';
import attendanceData from '../assets/data/attendance.json';

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

const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LocationIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const VerifyAttendance = () => {
  const [project, setProject] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setAttendance(attendanceData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  const handleVerify = (id, status) => {
    setAttendance(attendance.map(record => 
      record.id === id ? { ...record, status, verifiedAt: new Date().toLocaleString() } : record
    ));
    setExpandedId(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredAttendance = attendance.filter(record => record.status === filter);

  const calculateHours = (entry, exit) => {
    const entryTime = new Date(`2000-01-01 ${entry}`);
    const exitTime = new Date(`2000-01-01 ${exit}`);
    const diff = (exitTime - entryTime) / (1000 * 60 * 60);
    return diff.toFixed(1);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(R * c);
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

        .expand-icon {
          transition: transform 0.3s ease;
        }

        .expanded .expand-icon {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="animated-bg min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto max-w-6xl px-6 py-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Verify Attendance</h1>
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
                style={filter === status ? { background: project.theme.primary } : {}}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({attendance.filter(r => r.status === status).length})
              </button>
            ))}
          </div>

          {/* Attendance List */}
          <div className="space-y-3">
            {filteredAttendance.map((record) => {
              const isExpanded = expandedId === record.id;
              const entryDistance = record.location ? calculateDistance(
                record.location.entry.latitude,
                record.location.entry.longitude,
                28.5494, 77.1918
              ) : 0;

              return (
                <div
                  key={record.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${isExpanded ? 'expanded' : ''}`}
                >
                  {/* Compact Header - Always Visible */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      {/* Left: Volunteer Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                        >
                          {record.volunteerName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm">{record.volunteerName}</h3>
                          <p className="text-xs text-gray-600">{record.date}</p>
                        </div>
                      </div>

                      {/* Center: Quick Stats */}
                      <div className="hidden md:flex items-center gap-4 px-4">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50">
                          <ClockIcon className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-700">
                            {calculateHours(record.entryTime, record.exitTime)} hrs
                          </span>
                        </div>
                        {record.location && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50">
                            <LocationIcon className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">
                              {entryDistance}m away
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2">
                        {record.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleVerify(record.id, 'approved')}
                              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-all duration-300"
                              title="Approve"
                            >
                              <CheckIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleVerify(record.id, 'rejected')}
                              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all duration-300"
                              title="Reject"
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            record.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {record.status === 'approved' ? 'Approved' : 'Rejected'}
                          </span>
                        )}
                        <button
                          onClick={() => toggleExpand(record.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                        >
                          <ChevronDownIcon className="w-5 h-5 text-gray-600 expand-icon" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 space-y-4 animate-slideDown">
                      {/* Time Details */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Entry Time</p>
                          <p className="text-sm font-bold text-gray-900">{record.entryTime}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Exit Time</p>
                          <p className="text-sm font-bold text-gray-900">{record.exitTime}</p>
                        </div>
                      </div>

                      {/* Location Details */}
                      {record.location && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <LocationIcon className="w-4 h-4 text-blue-700" />
                            <p className="text-xs font-bold text-blue-900">Location Verification</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="font-semibold text-gray-700">Entry:</p>
                              <p className="text-gray-600 font-mono">{record.location.entry.latitude.toFixed(6)}</p>
                              <p className="text-gray-600 font-mono">{record.location.entry.longitude.toFixed(6)}</p>
                              <p className="text-gray-500 mt-1">±{record.location.entry.accuracy}m accuracy</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700">Exit:</p>
                              <p className="text-gray-600 font-mono">{record.location.exit.latitude.toFixed(6)}</p>
                              <p className="text-gray-600 font-mono">{record.location.exit.longitude.toFixed(6)}</p>
                              <p className="text-gray-500 mt-1">±{record.location.exit.accuracy}m accuracy</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Photos */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ImageIcon className="w-4 h-4 text-gray-600" />
                          <p className="text-sm font-bold text-gray-900">Verification Photos</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-1">Entry - Students</p>
                            <img 
                              src={record.photos.entry.student} 
                              alt="Entry students"
                              className="w-full aspect-square rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition object-cover"
                              onClick={() => setLightboxImage(record.photos.entry.student)}
                            />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-1">Entry - Board</p>
                            <img 
                              src={record.photos.entry.board} 
                              alt="Entry board"
                              className="w-full aspect-square rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition object-cover"
                              onClick={() => setLightboxImage(record.photos.entry.board)}
                            />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-1">Exit - Students</p>
                            <img 
                              src={record.photos.exit.student} 
                              alt="Exit students"
                              className="w-full aspect-square rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition object-cover"
                              onClick={() => setLightboxImage(record.photos.exit.student)}
                            />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-600 mb-1">Exit - Board</p>
                            <img 
                              src={record.photos.exit.board} 
                              alt="Exit board"
                              className="w-full aspect-square rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition object-cover"
                              onClick={() => setLightboxImage(record.photos.exit.board)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Verification Actions (if pending) */}
                      {record.status === 'pending' && (
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => handleVerify(record.id, 'approved')}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all duration-300"
                          >
                            <CheckIcon className="w-5 h-5" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleVerify(record.id, 'rejected')}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-all duration-300"
                          >
                            <XIcon className="w-5 h-5" />
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Verified Info */}
                      {record.verifiedAt && (
                        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                          Verified at {record.verifiedAt}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredAttendance.length === 0 && (
            <div className="text-center py-20 bg-white/70 rounded-lg">
              <p className="text-gray-500">No {filter} attendance records</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for fullscreen photo view */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img src={lightboxImage} alt="Full size" className="w-full rounded-lg" />
            <button
              onClick={() => setLightboxImage(null)}
              className="mt-4 w-full py-3 rounded-lg bg-white/20 backdrop-blur-md text-white font-bold hover:bg-white/30 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VerifyAttendance;
