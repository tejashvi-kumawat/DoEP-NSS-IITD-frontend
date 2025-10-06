// src/pages/MarkAttendance.jsx (Volunteer View)
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
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

const CameraIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const MarkAttendance = () => {
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState('entry'); // 'entry' or 'exit'
  const [currentCapture, setCurrentCapture] = useState('student'); // 'student' or 'board'
  const [entryPhotos, setEntryPhotos] = useState({ student: null, board: null, time: null });
  const [exitPhotos, setExitPhotos] = useState({ student: null, board: null, time: null });
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const savePhoto = () => {
    const timestamp = new Date().toLocaleTimeString();
    
    if (step === 'entry') {
      setEntryPhotos({
        ...entryPhotos,
        [currentCapture]: capturedImage,
        time: timestamp
      });
    } else {
      setExitPhotos({
        ...exitPhotos,
        [currentCapture]: capturedImage,
        time: timestamp
      });
    }

    setCapturedImage(null);
    
    // Move to next step
    if (currentCapture === 'student') {
      setCurrentCapture('board');
    } else {
      if (step === 'entry') {
        alert('Entry attendance marked! Please mark exit when leaving.');
        setStep('exit');
        setCurrentCapture('student');
      } else {
        alert('Exit attendance marked! Pending verification.');
        // Submit to backend here
      }
    }
  };

  const getCurrentPhotos = () => step === 'entry' ? entryPhotos : exitPhotos;

  if (!project) return null;

  const isEntryComplete = entryPhotos.student && entryPhotos.board;
  const isExitComplete = exitPhotos.student && exitPhotos.board;

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
          <div className="container mx-auto max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Mark Attendance</h1>
            <p className="text-gray-600">{project.name}</p>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-8">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
              step === 'entry' ? 'text-white' : isEntryComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`} style={step === 'entry' ? { background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` } : {}}>
              {isEntryComplete && <CheckIcon className="w-5 h-5" />}
              Entry
            </div>
            <div className="h-0.5 w-12 bg-gray-300" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
              step === 'exit' ? 'text-white' : isExitComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`} style={step === 'exit' ? { background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` } : {}}>
              {isExitComplete && <CheckIcon className="w-5 h-5" />}
              Exit
            </div>
          </div>

          {/* Camera Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {step === 'entry' ? 'Entry' : 'Exit'} - {currentCapture === 'student' ? 'With Students' : 'With Board'}
                </h2>
                <p className="text-sm text-gray-600">
                  {currentCapture === 'student' 
                    ? 'Take a selfie with students in the background'
                    : 'Take a photo of the classroom board showing date/topic'}
                </p>
              </div>

              {/* Camera/Preview */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                {capturedImage ? (
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{ facingMode: currentCapture === 'student' ? 'user' : 'environment' }}
                  />
                )}
                
                {/* Overlay Guide */}
                {!capturedImage && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-8 border-4 border-white/30 rounded-lg" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-black/50 px-4 py-2 rounded-lg">
                      <p className="text-sm font-semibold">
                        {currentCapture === 'student' ? 'Position yourself with students visible' : 'Frame the board clearly'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {capturedImage ? (
                  <>
                    <button
                      onClick={retakePhoto}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all duration-300"
                    >
                      <RefreshIcon className="w-5 h-5" />
                      Retake
                    </button>
                    <button
                      onClick={savePhoto}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                    >
                      <CheckIcon className="w-5 h-5" />
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    onClick={capturePhoto}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                  >
                    <CameraIcon className="w-6 h-6" />
                    Capture Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Captured Photos Summary */}
          {(getCurrentPhotos().student || getCurrentPhotos().board) && (
            <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Captured Photos</h3>
              <div className="grid grid-cols-2 gap-4">
                {getCurrentPhotos().student && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">With Students</p>
                    <img src={getCurrentPhotos().student} alt="With students" className="w-full rounded-lg border border-gray-200" />
                  </div>
                )}
                {getCurrentPhotos().board && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Board Photo</p>
                    <img src={getCurrentPhotos().board} alt="Board" className="w-full rounded-lg border border-gray-200" />
                  </div>
                )}
              </div>
              {getCurrentPhotos().time && (
                <p className="text-xs text-gray-500 mt-3">Marked at: {getCurrentPhotos().time}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
