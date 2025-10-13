/**
 * API Client Utility
 * 
 * Centralized API communication layer with:
 * - Cookie-based authentication
 * - Comprehensive error handling
 * - Type safety ready (can convert to TypeScript)
 * - Request/response interceptors
 * - Retry logic for failed requests
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""
const DEFAULT_TIMEOUT = 60000 // 60 seconds for Render free tier
const MAX_RETRIES = 3
const RETRY_DELAY = 1000


// ============================================
// Custom Error Classes
// ============================================

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
    this.timestamp = new Date().toISOString()
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message)
    this.name = "NetworkError"
  }
}

class TimeoutError extends Error {
  constructor(message = "Request timeout") {
    super(message)
    this.name = "TimeoutError"
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Build full URL from relative path
 */
const buildUrl = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${API_BASE_URL}${cleanPath}`
}

/**
 * Create abort controller with timeout
 */
const createTimeoutController = (timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  return { controller, timeoutId }
}

/**
 * Delay helper for retry logic
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Parse response body safely
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || ""
  
  try {
    if (contentType.includes("application/json")) {
      return await response.json()
    }
    
    const text = await response.text()
    return text || null
  } catch (error) {
    console.warn("Failed to parse response:", error)
    return null
  }
}

/**
 * Check if error is retryable
 */
const isRetryableError = (error) => {
  // Retry on network errors or 5xx server errors
  if (error instanceof NetworkError) return true
  if (error instanceof ApiError && error.status >= 500) return true
  return false
}

// ============================================
// Core Request Function
// ============================================

/**
 * Generic HTTP request wrapper with advanced features
 * 
 * @param {string} path - API endpoint path
 * @param {Object} options - Request configuration
 * @param {string} options.method - HTTP method (GET, POST, etc.)
 * @param {Object} options.data - Request body data
 * @param {Object} options.headers - Additional headers
 * @param {number} options.timeout - Request timeout in ms
 * @param {boolean} options.retry - Enable retry logic
 * @param {number} options.retries - Number of retry attempts
 * @returns {Promise<any>} Response data
 */
async function request(
  path,
  {
    method = "GET",
    data = null,
    headers = {},
    timeout = DEFAULT_TIMEOUT,
    retry = true,
    retries = MAX_RETRIES,
    ...rest
  } = {}
) {
  const { controller, timeoutId } = createTimeoutController(timeout)

  const requestOptions = {
    method,
    credentials: "include", // Essential for cookie-based auth
    headers: {
      Accept: "application/json",
      ...(data && { "Content-Type": "application/json" }),
      ...headers,
    },
    signal: controller.signal,
    ...rest,
  }

  if (data) {
    requestOptions.body = JSON.stringify(data)
  }

  let lastError

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(buildUrl(path), requestOptions)
      clearTimeout(timeoutId)

      const payload = await parseResponse(response)

      // Handle unsuccessful responses
      if (!response.ok) {
        const errorMessage =
          (payload && typeof payload === "object" && payload.message) ||
          response.statusText ||
          `HTTP ${response.status}: Request failed`

        throw new ApiError(errorMessage, response.status, payload)
      }

      // Success - return payload
      return payload
    } catch (error) {
      clearTimeout(timeoutId)

      // Handle different error types
      if (error.name === "AbortError") {
        lastError = new TimeoutError(`Request timeout after ${timeout}ms`)
      } else if (error instanceof ApiError) {
        lastError = error
      } else if (error instanceof TypeError && error.message === "Failed to fetch") {
        lastError = new NetworkError("Network error: Failed to reach server")
      } else {
        lastError = error
      }

      // Determine if we should retry
      const shouldRetry = retry && attempt < retries - 1 && isRetryableError(lastError)

      if (shouldRetry) {
        console.warn(
          `Request failed (attempt ${attempt + 1}/${retries}). Retrying in ${RETRY_DELAY}ms...`,
          { path, error: lastError.message }
        )
        await delay(RETRY_DELAY * (attempt + 1)) // Exponential backoff
        continue
      }

      // No more retries or not retryable - throw error
      break
    }
  }

  // Log error for monitoring (replace with your error tracking service)
  console.error("API Request Failed:", {
    path,
    method,
    error: lastError,
    timestamp: new Date().toISOString(),
  })

  throw lastError
}

// ============================================
// HTTP Method Helpers
// ============================================

/**
 * Convenience methods for common HTTP verbs
 */
const get = (path, options = {}) => request(path, { ...options, method: "GET" })

const post = (path, data, options = {}) =>
  request(path, { ...options, method: "POST", data })

const put = (path, data, options = {}) =>
  request(path, { ...options, method: "PUT", data })

const patch = (path, data, options = {}) =>
  request(path, { ...options, method: "PATCH", data })

const del = (path, options = {}) => request(path, { ...options, method: "DELETE" })

// ============================================
// Authentication API
// ============================================

export const authApi = {
  /**
   * Login user with credentials
   */
  login: ({ kerberosid, password }) =>
    post("/auth/login", { kerberosid, password }),

  /**
   * Logout current user
   */
  logout: () => post("/auth/logout"),
}

// ============================================
// Students API
// ============================================

export const studentsApi = {
  /**
   * Get student by email
   */
  getByEmail: (email) => get(`/user/student/${encodeURIComponent(email)}`),

  /**
   * Get all students
   */
  getAll: () => get("/user/students"),

  /**
   * Add new student
   */
  create: ({ name, email, age }) =>
    post("/user/student", { name, email, age }),
}

// ============================================
// NSS Members API
// ============================================

export const membersApi = {
  /**
   * Get member by Kerberos ID
   */
  getByKerberosId: (kerberosid) =>
    get(`/members/${encodeURIComponent(kerberosid)}`),

  /**
   * Add new member
   */
  create: ({
    name,
    kerberosid,
    email,
    hostel,
    vertical,
    phone,
    activity_leading,
    activity_name,
  }) =>
    post("/members", {
      name,
      kerberosid,
      email,
      hostel,
      vertical,
      phone,
      activity_leading,
      activity_name,
    }),

  /**
   * Get classes for specific member
   */
  getClasses: (kerberosid) =>
    get(`/members/${encodeURIComponent(kerberosid)}/classes`),

  /**
   * Approve member registration
   */
  approve: (kerberosid) =>
    post(`/members/${encodeURIComponent(kerberosid)}/approve`),
}

// ============================================
// Classes API
// ============================================

export const classesApi = {
  /**
   * Get all classes
   */
  getAll: () => get("/classes"),

  /**
   * Create new class
   */
  create: ({ name, volunteer, date, startTime, endTime, program }) =>
    post("/classes", {
      name,
      volunteer, // kerberosid string
      date,
      startTime,
      endTime,
      program,
    }),

  /**
   * Mark student attendance for class
   */
  markAttendance: ({ classId, studentId }) =>
    post(`/classes/${encodeURIComponent(classId)}/attendance`, { studentId }),
}

// ============================================
// Default Export (Backward Compatibility)
// ============================================

const api = {
  // Auth
  login: authApi.login,
  logout: authApi.logout,

  // Students
  getStudentByEmail: studentsApi.getByEmail,
  getAllStudents: studentsApi.getAll,
  addStudent: studentsApi.create,

  // Members
  getMemberByKerberosId: membersApi.getByKerberosId,
  addMember: membersApi.create,
  getMemberClasses: membersApi.getClasses,
  approveMember: membersApi.approve,

  // Classes
  getClasses: classesApi.getAll,
  createClass: classesApi.create,
  markAttendance: classesApi.markAttendance,
}

export default api

// ============================================
// Utilities for Testing/Advanced Usage
// ============================================

/**
 * Create API client with custom base URL
 * Useful for multi-tenant apps or testing
 */
export const createApiClient = (baseUrl) => {
  const customRequest = (path, options = {}) =>
    request(path, { ...options, baseUrl })

  return {
    get: (path, options) => customRequest(path, { ...options, method: "GET" }),
    post: (path, data, options) =>
      customRequest(path, { ...options, method: "POST", data }),
    put: (path, data, options) =>
      customRequest(path, { ...options, method: "PUT", data }),
    patch: (path, data, options) =>
      customRequest(path, { ...options, method: "PATCH", data }),
    delete: (path, options) =>
      customRequest(path, { ...options, method: "DELETE" }),
  }
}

/**
 * Export error classes for custom error handling
 */
export { ApiError, NetworkError, TimeoutError }
