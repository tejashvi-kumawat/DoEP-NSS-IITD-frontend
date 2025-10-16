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
  loginMember: (kerberosid, password) => {
    return apiClient.post('/auth/login', { kerberosid, password });
  },

  /**
   * Login as Student
   * @param {string} email - Student email
   * @param {string} password - Student password
   */
  loginStudent: (email, password) => {
    return apiClient.post('/auth/login/student', { email, password });
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
  checkAuth,
  handleAPIError,
};
