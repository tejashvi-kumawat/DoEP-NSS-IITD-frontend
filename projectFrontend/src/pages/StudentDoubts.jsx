// src/pages/StudentDoubts.jsx (FIXED)
import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projects.json';
import doubtsData from '../assets/data/doubts.json';

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

const PlusIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SendIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StudentDoubts = () => {
  const [project, setProject] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ subject: '', question: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setDoubts(doubtsData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New doubt:', newDoubt);
    setShowForm(false);
    setNewDoubt({ subject: '', question: '' });
  };

  const filteredDoubts = filter === 'all' 
    ? doubts 
    : doubts.filter(d => d.status === filter);

  if (!project) return null;

  return (
    <div className={`min-h-screen pt-14 bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-4xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900">My Doubts</h1>
              <p className="text-sm text-gray-600">Ask questions, get help from volunteers</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
            >
              <PlusIcon className="w-5 h-5" />
              Ask Doubt
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'answered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                filter === status
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              style={filter === status ? { background: project.theme.primary } : {}}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Ask Doubt Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-2 border-gray-100 animate-slideDown">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ask Your Doubt</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Subject (e.g., Math, Science, English)"
                  value={newDoubt.subject}
                  onChange={(e) => setNewDoubt({ ...newDoubt, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': project.theme.primary }}
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Describe your doubt in detail..."
                  value={newDoubt.question}
                  onChange={(e) => setNewDoubt({ ...newDoubt, question: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                  style={{ '--tw-ring-color': project.theme.primary }}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                >
                  <SendIcon className="w-5 h-5" />
                  Submit Doubt
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Doubts List */}
        <div className="space-y-4">
          {filteredDoubts.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ 
                          backgroundColor: `${project.theme.primary}15`,
                          color: project.theme.primary 
                        }}
                      >
                        {doubt.subject}
                      </span>
                      <span className="text-xs text-gray-500">{doubt.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {doubt.question}
                    </h3>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                      doubt.status === 'answered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {doubt.status === 'answered' && <CheckIcon className="w-3 h-3" />}
                    {doubt.status === 'answered' ? 'Answered' : 'Pending'}
                  </div>
                </div>

                {doubt.answer && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border-l-4"
                       style={{ borderColor: project.theme.primary }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold"
                           style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}>
                        {doubt.answeredBy.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{doubt.answeredBy}</p>
                        <p className="text-xs text-gray-500">Volunteer</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{doubt.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
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
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentDoubts;
