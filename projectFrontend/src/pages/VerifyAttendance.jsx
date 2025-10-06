// src/pages/VerifyAttendance.jsx (Admin View)
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

const VerifyAttendance = () => {
  const [project, setProject] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filter, setFilter] = useState('pending'); // 'pending', 'approved', 'rejected'

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
    setSelectedRecord(null);
  };

  const filteredAttendance = attendance.filter(record => record.status === filter);

  const calculateHours = (entry, exit) => {
    const entryTime = new Date(`2000-01-01 ${entry}`);
    const exitTime = new Date(`2000-01-01 ${exit}`);
    const diff = (exitTime - entryTime) / (1000 * 60 * 60);
    return diff.toFixed(1);
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
      `}</style>

      <div className="animated-bg min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-6 py-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Verify Attendance</h1>
            <p className="text-gray-600">{project.name}</p>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 py-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAttendance.map((record) => (
              <div
                key={record.id}
                className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{record.volunteerName}</h3>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-yellow-100">
                      <ClockIcon className="w-4 h-4 text-yellow-700" />
                      <span className="text-sm font-bold text-yellow-700">
                        {calculateHours(record.entryTime, record.exitTime)} hrs
                      </span>
                    </div>
                  </div>

                  {/* Photos Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Entry - Students</p>
                      <img 
                        src={record.photos.entry.student} 
                        alt="Entry students"
                        className="w-full rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition"
                        onClick={() => setSelectedRecord(record)}
                      />
                      <p className="text-xs text-gray-500 mt-1">{record.entryTime}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Entry - Board</p>
                      <img 
                        src={record.photos.entry.board} 
                        alt="Entry board"
                        className="w-full rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition"
                        onClick={() => setSelectedRecord(record)}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Exit - Students</p>
                      <img 
                        src={record.photos.exit.student} 
                        alt="Exit students"
                        className="w-full rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition"
                        onClick={() => setSelectedRecord(record)}
                      />
                      <p className="text-xs text-gray-500 mt-1">{record.exitTime}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Exit - Board</p>
                      <img 
                        src={record.photos.exit.board} 
                        alt="Exit board"
                        className="w-full rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition"
                        onClick={() => setSelectedRecord(record)}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  {record.status === 'pending' && (
                    <div className="flex gap-3">
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

                  {record.status !== 'pending' && (
                    <div className={`text-center py-2 rounded-lg font-semibold ${
                      record.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {record.status === 'approved' ? 'Approved' : 'Rejected'}
                      {record.verifiedAt && <span className="text-xs block mt-1">at {record.verifiedAt}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAttendance.length === 0 && (
            <div className="text-center py-20 bg-white/70 rounded-lg">
              <p className="text-gray-500">No {filter} attendance records</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for fullscreen photo view */}
      {selectedRecord && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedRecord(null)}
        >
          <div className="max-w-5xl w-full bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <img src={selectedRecord.photos.entry.student} alt="Entry students" className="w-full rounded-lg" />
              <img src={selectedRecord.photos.entry.board} alt="Entry board" className="w-full rounded-lg" />
              <img src={selectedRecord.photos.exit.student} alt="Exit students" className="w-full rounded-lg" />
              <img src={selectedRecord.photos.exit.board} alt="Exit board" className="w-full rounded-lg" />
            </div>
            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full py-3 rounded-lg bg-gray-200 font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyAttendance;
