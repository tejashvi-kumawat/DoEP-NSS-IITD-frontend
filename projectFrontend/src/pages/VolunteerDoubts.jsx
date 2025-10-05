// src/pages/VolunteerDoubts.jsx (FIXED)
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

const MessageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SendIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const VolunteerDoubts = () => {
  const [project, setProject] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [answer, setAnswer] = useState('');

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

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    console.log('Answer submitted:', answer);
    setSelectedDoubt(null);
    setAnswer('');
  };

  const pendingDoubts = doubts.filter(d => d.status === 'pending');
  const answeredDoubts = doubts.filter(d => d.status === 'answered');

  if (!project) return null;

  return (
    <div className={`min-h-screen pt-14 bg-black transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white">Volunteer Portal</h1>
              <p className="text-sm text-gray-400">Help students by answering their doubts</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                <span className="text-yellow-400 text-sm font-bold">{pendingDoubts.length} Pending</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                <span className="text-green-400 text-sm font-bold">{answeredDoubts.length} Answered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Doubts List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">Pending Doubts</h2>
            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
              {pendingDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  onClick={() => setSelectedDoubt(doubt)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    selectedDoubt?.id === doubt.id
                      ? 'bg-white/10 border-white/30 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-2 py-1 rounded-md text-xs font-bold"
                      style={{ 
                        backgroundColor: `${project.theme.primary}30`,
                        color: project.theme.primary 
                      }}
                    >
                      {doubt.subject}
                    </span>
                    <span className="text-xs text-gray-500">{doubt.time}</span>
                  </div>
                  <p className="text-sm text-white font-semibold line-clamp-2">
                    {doubt.question}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">
                      {doubt.studentName.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-400">{doubt.studentName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Panel */}
          <div className="lg:col-span-2">
            {selectedDoubt ? (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1.5 rounded-lg text-sm font-bold"
                      style={{ 
                        backgroundColor: `${project.theme.primary}30`,
                        color: project.theme.primary 
                      }}
                    >
                      {selectedDoubt.subject}
                    </span>
                    <span className="text-sm text-gray-400">{selectedDoubt.time}</span>
                  </div>
                  
                  {/* Student Question */}
                  <div className="bg-white/10 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold">
                        {selectedDoubt.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{selectedDoubt.studentName}</p>
                        <p className="text-xs text-gray-400">Student</p>
                      </div>
                    </div>
                    <p className="text-white leading-relaxed">{selectedDoubt.question}</p>
                  </div>

                  {/* Answer Form */}
                  <form onSubmit={handleSubmitAnswer}>
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-white mb-2">Your Answer</label>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write a detailed answer to help the student..."
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                        style={{ '--tw-ring-color': project.theme.primary }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-black font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                    >
                      <SendIcon className="w-5 h-5" />
                      Submit Answer
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <MessageIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-semibold">Select a doubt to answer</p>
                  <p className="text-gray-600 text-sm mt-2">Choose from the pending doubts on the left</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDoubts;
