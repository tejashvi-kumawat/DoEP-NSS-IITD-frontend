// src/pages/StudentsData.jsx (UPDATED with project filtering)
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';
import studentsData from '../assets/data/students.json';

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

const SearchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DownloadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const StudentsData = () => {
  const [project, setProject] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setProjectKey(key);
    
    // Filter students by current project
    const projectStudents = studentsData.filter(student => student.project === key);
    setStudents(projectStudents);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    
    const matchesAttendance = 
      attendanceFilter === 'all' ||
      (attendanceFilter === 'good' && student.attendance >= 75) ||
      (attendanceFilter === 'average' && student.attendance >= 50 && student.attendance < 75) ||
      (attendanceFilter === 'poor' && student.attendance < 50);

    return matchesSearch && matchesClass && matchesAttendance;
  });

  const downloadCSV = () => {
    const headers = ['Roll Number', 'Name', 'Class', 'Age', 'Attendance', 'Contact', 'Project'];
    const rows = filteredStudents.map(s => [
      s.rollNumber, s.name, s.class, s.age, `${s.attendance}%`, s.contact, project.name
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${project.name}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!project) return null;

  const classes = ['all', ...new Set(students.map(s => s.class))];

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Students Database</h1>
                <p className="text-gray-600">{project.name} - {filteredStudents.length} of {students.length} students</p>
              </div>
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
              >
                <DownloadIcon className="w-5 h-5" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 py-8">
          {/* Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-6 mb-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': project.theme.primary }}
                />
              </div>

              {/* Class Filter */}
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': project.theme.primary }}
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>
                    {cls === 'all' ? 'All Classes' : `Class ${cls}`}
                  </option>
                ))}
              </select>

              {/* Attendance Filter */}
              <select
                value={attendanceFilter}
                onChange={(e) => setAttendanceFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': project.theme.primary }}
              >
                <option value="all">All Attendance</option>
                <option value="good">Good (&gt;75%)</option>
                <option value="average">Average (50-75%)</option>
                <option value="poor">Poor (&lt;50%)</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200" style={{ backgroundColor: `${project.theme.primary}10` }}>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Roll No.</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Class</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Age</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Attendance</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr 
                      key={student.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.rollNumber}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                          >
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{student.class}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{student.age}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-300"
                              style={{ 
                                width: `${student.attendance}%`,
                                background: `linear-gradient(90deg, ${project.theme.primary}, ${project.theme.secondary})`
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-12">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{student.contact}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          style={{ color: project.theme.primary }}
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-semibold">No students found</p>
                <p className="text-gray-400 text-sm mt-1">
                  {students.length === 0 
                    ? `No students registered for ${project.name} yet`
                    : 'Try adjusting your filters'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedStudent(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="px-6 py-8 text-white"
              style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-black text-3xl">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black">{selectedStudent.name}</h3>
                  <p className="text-white/80">{selectedStudent.rollNumber}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Class</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedStudent.class}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Age</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedStudent.age} years</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Gender</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedStudent.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Attendance</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedStudent.attendance}%</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Project</p>
                <p className="text-sm font-semibold text-gray-900">{project.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Contact</p>
                <p className="text-sm font-semibold text-gray-900">{selectedStudent.contact}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm text-gray-700">{selectedStudent.address}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Guardian</p>
                <p className="text-sm font-semibold text-gray-900">{selectedStudent.guardian}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})`,
                  color: 'white'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsData;
