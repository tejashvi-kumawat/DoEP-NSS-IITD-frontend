// src/pages/CurriculumManage.jsx (UPDATED with File Upload)
import React, { useEffect, useState, useRef } from 'react';
import projectData from '../assets/data/projects.json';
import curriculumData from '../assets/data/curriculum.json';

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

const EditIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const FileIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const SaveIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CurriculumManage = () => {
  const [project, setProject] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [addingResourceTo, setAddingResourceTo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);
  
  // Form states
  const [newItem, setNewItem] = useState({ week: '', title: '', description: '' });
  const [editItem, setEditItem] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setCurriculum(curriculumData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 50);
  }, []);

  const handleAddItem = () => {
    if (!newItem.week || !newItem.title) {
      alert('Please fill in all required fields');
      return;
    }
    
    const item = {
      id: Date.now(),
      ...newItem,
      resources: []
    };
    
    setCurriculum([...curriculum, item]);
    setNewItem({ week: '', title: '', description: '' });
    setShowAddForm(false);
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditItem({ ...item });
  };

  const handleSaveEdit = () => {
    setCurriculum(curriculum.map(item => 
      item.id === editingId ? editItem : item
    ));
    setEditingId(null);
    setEditItem(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setCurriculum(curriculum.filter(item => item.id !== id));
    }
  };

  // File upload handlers
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAddResource = (itemId) => {
    if (!uploadedFile) {
      alert('Please upload a file first');
      return;
    }

    // Get file type from extension
    const fileExt = uploadedFile.name.split('.').pop().toLowerCase();
    let fileType = 'text';
    if (['pdf'].includes(fileExt)) fileType = 'pdf';
    else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(fileExt)) fileType = 'image';
    else if (['mp4', 'avi', 'mov'].includes(fileExt)) fileType = 'video';

    // In real app, you would upload to server here
    // For now, creating a local URL
    const fileUrl = URL.createObjectURL(uploadedFile);

    const newResource = {
      name: uploadedFile.name,
      type: fileType,
      url: fileUrl,
      size: uploadedFile.size
    };

    setCurriculum(curriculum.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          resources: [...(item.resources || []), newResource]
        };
      }
      return item;
    }));

    setUploadedFile(null);
    setAddingResourceTo(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
          <div className="container mx-auto max-w-5xl px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Manage Curriculum</h1>
                <p className="text-gray-600">{project.name}</p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
              >
                <PlusIcon className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-6 py-8">
          {/* Add Form */}
          {showAddForm && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-8 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Add Curriculum Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Week (e.g., Week 1)"
                  value={newItem.week}
                  onChange={(e) => setNewItem({...newItem, week: e.target.value})}
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': project.theme.primary }}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': project.theme.primary }}
                />
              </div>
              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent resize-none mb-4"
                style={{ '--tw-ring-color': project.theme.primary }}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleAddItem}
                  className="px-6 py-3 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                >
                  Save Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Curriculum List */}
          <div className="space-y-4">
            {curriculum.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-300 shadow-md"
              >
                <div className="p-6">
                  {editingId === item.id ? (
                    // Edit Mode
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={editItem.week}
                          onChange={(e) => setEditItem({...editItem, week: e.target.value})}
                          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': project.theme.primary }}
                        />
                        <input
                          type="text"
                          value={editItem.title}
                          onChange={(e) => setEditItem({...editItem, title: e.target.value})}
                          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                          style={{ '--tw-ring-color': project.theme.primary }}
                        />
                      </div>
                      <textarea
                        value={editItem.description}
                        onChange={(e) => setEditItem({...editItem, description: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 resize-none mb-4"
                        style={{ '--tw-ring-color': project.theme.primary }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                          style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                        >
                          <SaveIcon className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <span 
                              className="inline-block px-2.5 py-0.5 rounded text-xs font-bold text-white mb-1"
                              style={{ backgroundColor: project.theme.primary }}
                            >
                              {item.week}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300"
                          >
                            <EditIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-300"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-4">{item.description}</p>

                      {/* Resources */}
                      {item.resources && item.resources.length > 0 && (
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-500 text-xs font-semibold mb-3">RESOURCES ({item.resources.length})</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.resources.map((resource, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 rounded bg-gray-50 border border-gray-200">
                                <FileIcon className="w-4 h-4 text-gray-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-900 text-sm truncate">{resource.name}</p>
                                  <p className="text-gray-500 text-xs">{resource.type.toUpperCase()} • {formatFileSize(resource.size)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add Resource Section with Drag & Drop */}
                      {addingResourceTo === item.id ? (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h4 className="text-sm font-bold text-gray-900 mb-3">Upload Resource</h4>
                          
                          {/* Drag & Drop Zone */}
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                              isDragging 
                                ? 'border-current bg-opacity-10' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={isDragging ? { borderColor: project.theme.primary, backgroundColor: `${project.theme.primary}10` } : {}}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              onChange={handleFileSelect}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi"
                            />
                            
                            {uploadedFile ? (
                              <div className="space-y-2">
                                <FileIcon className="w-12 h-12 mx-auto" style={{ color: project.theme.primary }} />
                                <p className="text-sm font-semibold text-gray-900">{uploadedFile.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />
                                <p className="text-sm font-semibold text-gray-700">
                                  Drop file here or click to browse
                                </p>
                                <p className="text-xs text-gray-500">
                                  PDF, Images, Videos, Documents
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => handleAddResource(item.id)}
                              disabled={!uploadedFile}
                              className="px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})` }}
                            >
                              Save Resource
                            </button>
                            <button
                              onClick={() => {
                                setAddingResourceTo(null);
                                setUploadedFile(null);
                              }}
                              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setAddingResourceTo(item.id)}
                          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                        >
                          <PlusIcon className="w-4 h-4" />
                          Add Resource
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumManage;
