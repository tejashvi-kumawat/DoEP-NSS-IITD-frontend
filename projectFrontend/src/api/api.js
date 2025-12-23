import axios from 'axios';

// =============================================================================
// CONFIGURATION
// =============================================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://doep-nss-iitd-backend.onrender.com';

// =============================================================================
// AXIOS INSTANCE
// =============================================================================

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Send cookies with requests (JWT in httpOnly cookie)
  timeout: 30000, // 30 seconds
});

// =============================================================================
// REQUEST INTERCEPTOR
// =============================================================================

apiClient.interceptors.request.use(
  (config) => {
    // You can add custom headers here if needed
    // For example, if you're storing JWT in localStorage instead of cookies:
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =============================================================================
// RESPONSE INTERCEPTOR
// =============================================================================

apiClient.interceptors.response.use(
  (response) => {
    // Any status code within 2xx range triggers this function
    return response.data;
  },
  (error) => {
    // Any status codes outside 2xx range trigger this function
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or clear auth state
      console.error('Unauthorized access - please login');
      // You can dispatch a logout action here or redirect
      // window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('Access forbidden:', message);
    } else if (error.response?.status === 404) {
      console.error('Resource not found:', message);
    } else if (error.response?.status >= 500) {
      console.error('Server error:', message);
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// =============================================================================
// AUTH API
// =============================================================================

export const authAPI = {
  /**
   * Login as NSS Member
   * @param {string} kerberosid - Kerberos ID
   * @param {string} password - User password
   */
  loginMember: (kerberosid, password, projectKey) => {
    return apiClient.post('/auth/login', { kerberosid, password, projectKey });
  },

  /**
   * Login as Student
   * @param {string} email - Student email
   * @param {string} password - Student password
   */
  loginStudent: (email, password, projectKey) => {
    return apiClient.post('/auth/login/student', { email, password, projectKey });
  },

  /**
   * Logout current user
   */
  logout: () => {
    return apiClient.post('/auth/logout');
  },
};

// =============================================================================
// NSS MEMBERS API
// =============================================================================

export const membersAPI = {
  /**
   * Get NSS Member by Kerberos ID
   * @param {string} kerberosid - Kerberos ID of the member
   */
  getMemberByKerberosId: (kerberosid) => {
    return apiClient.get(`/members/${kerberosid}`);
  },

  /**
   * Add a new NSS Member (Admin only)
   * @param {Object} memberData - Member details
   * @param {string} memberData.name - Full name
   * @param {string} memberData.kerberosid - Kerberos ID
   * @param {string} memberData.email - Email address
   * @param {string} memberData.hostel - Hostel name
   * @param {string} memberData.vertical - Vertical assignment
   * @param {string} memberData.phone - Phone number
   * @param {boolean} memberData.activity_leading - Whether leading activity
   * @param {string} memberData.activity_name - Activity name (if leading)
   */
  addMember: (memberData) => {
    return apiClient.post('/members', memberData);
  },

  /**
   * Get classes assigned to a volunteer
   * @param {string} kerberosid - Kerberos ID of the volunteer
   */
  getMemberClasses: (kerberosid) => {
    return apiClient.get(`/members/${kerberosid}/classes`);
  },

  /**
   * Approve a member (Admin only)
   * @param {string} kerberosid - Kerberos ID of the member to approve
   */
  approveMember: (kerberosid) => {
    return apiClient.post(`/members/${kerberosid}/approve`);
  },

  /**
   * Set or update password for NSS member
   * @param {string} kerberosid - Kerberos ID
   * @param {string} password - New password (min 6 characters)
   */
  setMemberPassword: (kerberosid, password) => {
    return apiClient.post(`/members/${kerberosid}/set-password`, { password });
  },
};

// =============================================================================
// STUDENTS API
// =============================================================================

export const studentsAPI = {
  /**
   * Get student by email
   * @param {string} email - Student email
   */
  getStudentByEmail: (email) => {
    return apiClient.get(`/user/student/${email}`);
  },

  /**
   * Get all students (Admin only)
   */
  getAllStudents: () => {
    return apiClient.get('/user/students');
  },

  /**
   * Add a new student (Admin only)
   * @param {Object} studentData - Student details
   * @param {string} studentData.name - Full name
   * @param {string} studentData.email - Email address
   * @param {number} studentData.age - Age (optional)
   */
  addStudent: (studentData) => {
    return apiClient.post('/user/student', studentData);
  },

  /**
   * Set or update password for student
   * @param {string} email - Student email
   * @param {string} password - New password (min 6 characters)
   */
  setStudentPassword: (email, password) => {
    return apiClient.post(`/user/student/${email}/set-password`, { password });
  },
};

// =============================================================================
// CLASSES API
// =============================================================================

export const classesAPI = {
  /**
   * Get all classes (Admin only)
   */
  getAllClasses: () => {
    return apiClient.get('/classes');
  },

  /**
   * Create a new class (Admin only)
   * @param {Object} classData - Class details
   * @param {string} classData.name - Class name
   * @param {string} classData.volunteer - Volunteer's kerberos ID
   * @param {string} classData.date - Class date (ISO format)
   * @param {string} classData.startTime - Start time
   * @param {string} classData.endTime - End time
   * @param {string} classData.program - Program name
   */
  createClass: (classData) => {
    return apiClient.post('/classes', classData);
  },

  /**
   * Mark attendance for a class (Admin only)
   * @param {string} classId - Class ID
   * @param {string} studentId - Student ID to mark present
   */
  markAttendance: (classId, studentId) => {
    return apiClient.post(`/classes/${classId}/attendance`, { studentId });
  },
};

// =============================================================================
// PROJECTS API
// =============================================================================

export const projectsAPI = {
  /**
   * Get all projects
   */
  getAllProjects: () => {
    return apiClient.get('/projects');
  },

  /**
   * Get project by ID
   * @param {string} projectId - Project ID
   */
  getProjectById: (projectId) => {
    return apiClient.get(`/projects/${projectId}`);
  },

  /**
   * Get projects assigned to a member
   * @param {string} kerberosid - Kerberos ID of the member
   */
  getMemberProjects: (kerberosid) => {
    return apiClient.get(`/members/${kerberosid}/projects`);
  },

  /**
   * Get project statistics
   * @param {string} projectId - Project ID
   */
  getProjectStats: (projectId) => {
    return apiClient.get(`/projects/${projectId}/stats`);
  },

  /**
   * Get students in a project
   * @param {string} projectId - Project ID
   */
  getProjectStudents: (projectId) => {
    return apiClient.get(`/projects/${projectId}/students`);
  },

  /**
   * Get volunteers in a project
   * @param {string} projectId - Project ID
   */
  getProjectVolunteers: (projectId) => {
    return apiClient.get(`/projects/${projectId}/volunteers`);
  },
};

// =============================================================================
// PROJECT CONFIG API (for subdomain-based theming)
// =============================================================================

export const projectConfigAPI = {
  /**
   * Get project configuration by key (from subdomain)
   * @param {string} key - Project key (e.g., 'vidya', 'munirka')
   */
  getProjectConfig: (key) => {
    return apiClient.get(`/project-config/${key}`);
  },

  /**
   * Get all project configurations (Admin only)
   * @param {Object} params - Query parameters
   * @param {boolean} params.isActive - Filter by active status
   * @param {boolean} params.isPublished - Filter by published status
   */
  getAllProjectConfigs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/project-config${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Create new project configuration (Admin only)
   * @param {Object} configData - Project configuration data
   */
  createProjectConfig: (configData) => {
    return apiClient.post('/project-config', configData);
  },

  /**
   * Update project configuration (Admin only)
   * @param {string} key - Project key
   * @param {Object} configData - Updated configuration data
   */
  updateProjectConfig: (key, configData) => {
    return apiClient.put(`/project-config/${key}`, configData);
  },

  /**
   * Delete project configuration (Admin only)
   * @param {string} key - Project key
   */
  deleteProjectConfig: (key) => {
    return apiClient.delete(`/project-config/${key}`);
  },

  /**
   * Toggle project status (Admin only)
   * @param {string} key - Project key
   * @param {Object} statusData - Status update data
   * @param {boolean} statusData.isActive - Active status
   * @param {boolean} statusData.isPublished - Published status
   */
  toggleProjectStatus: (key, statusData) => {
    return apiClient.patch(`/project-config/${key}/toggle-status`, statusData);
  },
};

// =============================================================================
// DOUBTS API
// =============================================================================

export const doubtsAPI = {
  /**
   * Get all doubts (filtered by role)
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status (pending, answered, resolved)
   * @param {string} params.project - Filter by project name
   * @param {string} params.category - Filter by category
   */
  getAllDoubts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/doubts${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Get doubt by ID
   * @param {string} doubtId - Doubt ID
   */
  getDoubtById: (doubtId) => {
    return apiClient.get(`/doubts/${doubtId}`);
  },

  /**
   * Get doubts by project
   * @param {string} projectName - Project name
   * @param {Object} params - Query parameters
   */
  getDoubtsByProject: (projectName, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/doubts/project/${projectName}${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Create new doubt (Students)
   * @param {Object} doubtData - Doubt details
   * @param {string} doubtData.question - The question/doubt
   * @param {string} doubtData.project - Project name
   * @param {string} doubtData.subject - Optional subject
   * @param {string} doubtData.category - Category (academic, technical, general, other)
   * @param {string} doubtData.priority - Priority (low, medium, high)
   */
  createDoubt: (doubtData) => {
    return apiClient.post('/doubts', doubtData);
  },

  /**
   * Answer a doubt (Volunteers and above)
   * @param {string} doubtId - Doubt ID
   * @param {string} answer - The answer text
   */
  answerDoubt: (doubtId, answer) => {
    return apiClient.put(`/doubts/${doubtId}/answer`, { answer });
  },

  /**
   * Update doubt status
   * @param {string} doubtId - Doubt ID
   * @param {string} status - New status (pending, answered, resolved)
   */
  updateDoubtStatus: (doubtId, status) => {
    return apiClient.put(`/doubts/${doubtId}/status`, { status });
  },

  /**
   * Delete doubt (Admin or owner)
   * @param {string} doubtId - Doubt ID
   */
  deleteDoubt: (doubtId) => {
    return apiClient.delete(`/doubts/${doubtId}`);
  },
};

// =============================================================================
// TEACHING / SCHEDULING API (DoEP task 1)
// =============================================================================

export const teachingAPI = {
  // Volunteer availability
  setAvailability: ({ projectKey, dateKey, teachableGrades = [], notes = '' }) => {
    return apiClient.post('/teaching/availability', {
      projectKey,
      dateKey,
      teachableGrades,
      notes,
    });
  },

  getMyAvailability: (projectKey, fromDateKey) => {
    const qs = new URLSearchParams({ projectKey, fromDateKey }).toString();
    return apiClient.get(`/teaching/availability/my?${qs}`);
  },

  deleteAvailability: (availabilityId) => {
    return apiClient.delete(`/teaching/availability/${availabilityId}`);
  },

  // Leader views
  getStudents: (projectKey, { dateKey, unassignedOnly } = {}) => {
    const params = { projectKey };
    if (dateKey) params.dateKey = dateKey;
    if (typeof unassignedOnly === 'boolean') params.unassignedOnly = String(unassignedOnly);
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(`/teaching/students?${qs}`);
  },

  getSchedule: (projectKey, dateKey) => {
    const qs = new URLSearchParams({ projectKey, dateKey }).toString();
    return apiClient.get(`/teaching/schedule?${qs}`);
  },

  getAvailability: (projectKey, dateKey) => {
    const qs = new URLSearchParams({ projectKey, dateKey }).toString();
    return apiClient.get(`/teaching/availability?${qs}`);
  },

  createSchedule: ({ projectKey, dateKey, startTime, endTime }) => {
    return apiClient.post('/teaching/schedule', { projectKey, dateKey, startTime, endTime });
  },

  createSession: ({ projectKey, dateKey, volunteerId, startTime, endTime }) => {
    return apiClient.post('/teaching/sessions', { projectKey, dateKey, volunteerId, startTime, endTime });
  },

  updateSession: (sessionId, patch) => {
    return apiClient.patch(`/teaching/sessions/${sessionId}`, patch);
  },

  // Volunteer sessions
  getMySessions: ({ projectKey, dateKey } = {}) => {
    const params = {};
    if (projectKey) params.projectKey = projectKey;
    if (dateKey) params.dateKey = dateKey;
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(qs ? `/teaching/sessions/my?${qs}` : '/teaching/sessions/my');
  },

  checkIn: (sessionId) => {
    return apiClient.post(`/teaching/sessions/${sessionId}/check-in`);
  },

  checkOut: (sessionId) => {
    return apiClient.post(`/teaching/sessions/${sessionId}/check-out`);
  },

  // Reports
  submitSessionReport: (sessionId, { summary, perStudentNotes } = {}) => {
    return apiClient.post(`/teaching/sessions/${sessionId}/report`, { summary, perStudentNotes });
  },

  getStudentReports: (studentId, { projectKey, limit } = {}) => {
    const params = {};
    if (projectKey) params.projectKey = projectKey;
    if (limit) params.limit = String(limit);
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(qs ? `/teaching/reports/student/${studentId}?${qs}` : `/teaching/reports/student/${studentId}`);
  },

  // Performance
  getVolunteerPerformance: ({ projectKey, limit } = {}) => {
    const params = {};
    if (projectKey) params.projectKey = projectKey;
    if (limit) params.limit = String(limit);
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(qs ? `/teaching/performance/volunteer/me?${qs}` : '/teaching/performance/volunteer/me');
  },

  getStudentPerformance: ({ projectKey, limit } = {}) => {
    const params = {};
    if (projectKey) params.projectKey = projectKey;
    if (limit) params.limit = String(limit);
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(qs ? `/teaching/performance/student/me?${qs}` : '/teaching/performance/student/me');
  },
};

// =============================================================================
// CONTENT (CURRICULUM + RESOURCES)
// =============================================================================

export const contentAPI = {
  listStudents: ({ projectKey } = {}) => {
    const qs = new URLSearchParams({ projectKey: projectKey || '' }).toString();
    return apiClient.get(`/content/students?${qs}`);
  },

  listItemsForViewer: ({ contentType, projectKey }) => {
    const params = { contentType };
    if (projectKey) params.projectKey = projectKey;
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(`/content/items?${qs}`);
  },

  listMyItems: ({ contentType, projectKey }) => {
    const qs = new URLSearchParams({ contentType, projectKey }).toString();
    return apiClient.get(`/content/items/mine?${qs}`);
  },

  uploadItem: async ({
    contentType,
    projectKey,
    scopeType,
    grade,
    studentId,
    academicYear,
    title,
    description,
    kind,
    url,
    file,
  }) => {
    const form = new FormData();
    form.append('contentType', contentType);
    form.append('projectKey', projectKey);
    form.append('scopeType', scopeType);
    if (grade !== null && grade !== undefined && grade !== '') form.append('grade', String(grade));
    if (studentId) form.append('studentId', studentId);
    if (academicYear) form.append('academicYear', academicYear);
    form.append('title', title);
    if (description) form.append('description', description);
    form.append('kind', kind);
    if (kind === 'link') form.append('url', url || '');
    if (kind === 'file' && file) form.append('file', file);

    return apiClient.post('/content/items', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if user is authenticated by making a test request
 * Can be used on app initialization
 */
export const checkAuth = async () => {
  try {
    // You can create a specific /auth/check endpoint on backend, or use an existing protected route
    // For now, this is a placeholder - implement based on your needs
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Handle API errors uniformly across the application
 * @param {Error} error - Error object from API call
 * @param {Function} callback - Optional callback to handle error
 */
export const handleAPIError = (error, callback) => {
  if (callback && typeof callback === 'function') {
    callback(error);
  } else {
    // Default error handling
    console.error('API Error:', error.message);
    // You can show a toast notification here
  }
};

// =============================================================================
// EXPORT DEFAULT
// =============================================================================

export default {
  auth: authAPI,
  members: membersAPI,
  students: studentsAPI,
  classes: classesAPI,
  projects: projectsAPI,
  projectConfig: projectConfigAPI,
  doubts: doubtsAPI,
  teaching: teachingAPI,
  content: contentAPI,
  checkAuth,
  handleAPIError,
};
