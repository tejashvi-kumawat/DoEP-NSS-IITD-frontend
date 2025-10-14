// Configure the API base URL for the frontend.
// - Same origin: leave NEXT_PUBLIC_API_BASE_URL empty (default '').
// - Different origin: set NEXT_PUBLIC_API_BASE_URL to "https://your-backend.example.com".
const API_BASE_URL = (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) || "https://doep-nss-iitd-backend.onrender.com"

// Internal: build full URL
const buildUrl = (path) => `${API_BASE_URL}${path}`

// Internal: generic request wrapper with cookie-based auth support
async function request(path, { method = "GET", data, headers = {}, ...rest } = {}) {
  const opts = {
    method,
    credentials: "include", // IMPORTANT for cookie (jwt) auth
    headers: {
      Accept: "application/json",
      ...(data ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...rest,
  }

  if (data) opts.body = JSON.stringify(data)

  const res = await fetch(buildUrl(path), opts)

  const contentType = res.headers.get("content-type") || ""
  let payload = null
  try {
    payload = contentType.includes("application/json") ? await res.json() : await res.text()
  } catch {
    payload = null
  }

  if (!res.ok) {
    const message = (payload && typeof payload === "object" && payload.message) || res.statusText || "Request failed"
    const error = new Error(message)
    error.status = res.status
    error.data = payload
    throw error
  }

  return payload
}

// Public API

// Auth
export async function login({ kerberosid, password }) {
  return request("/auth/login", {
    method: "POST",
    data: { kerberosid, password },
  })
}

export async function logout() {
  return request("/auth/logout", { method: "POST" })
}

// Students (mounted under /user)
export async function getStudentByEmail(email) {
  return request(`/user/student/${encodeURIComponent(email)}`)
}

export async function getAllStudents() {
  return request("/user/students")
}

export async function addStudent({ name, email, age }) {
  return request("/user/student", {
    method: "POST",
    data: { name, email, age },
  })
}

// NSS Members (mounted under /members)
export async function getMemberByKerberosId(kerberosid) {
  return request(`/members/${encodeURIComponent(kerberosid)}`)
}

export async function addMember({ name, kerberosid, email, hostel, vertical, phone, activity_leading, activity_name }) {
  return request("/members", {
    method: "POST",
    data: {
      name,
      kerberosid,
      email,
      hostel,
      vertical,
      phone,
      activity_leading,
      activity_name,
    },
  })
}

export async function getMemberClasses(kerberosid) {
  return request(`/members/${encodeURIComponent(kerberosid)}/classes`)
}

export async function approveMember(kerberosid) {
  return request(`/members/${encodeURIComponent(kerberosid)}/approve`, {
    method: "POST",
  })
}

// Classes (mounted under /classes)
export async function getClasses() {
  return request("/classes")
}

export async function createClass({
  name,
  volunteer, // kerberosid string expected by backend; it resolves to NssMember internally
  date,
  startTime,
  endTime,
  program,
}) {
  return request("/classes", {
    method: "POST",
    data: { name, volunteer, date, startTime, endTime, program },
  })
}

export async function markAttendance({ classId, studentId }) {
  return request(`/classes/${encodeURIComponent(classId)}/attendance`, {
    method: "POST",
    data: { studentId },
  })
}

// Optional: utility to override base URL at runtime if needed
export function withApiBaseUrl(url) {
  return {
    login: (creds) => request(`${url}/auth/login`, { method: "POST", data: creds }),
  }
}

// Default export grouping for convenience
const api = {
  // auth
  login,
  logout,
  // students
  getStudentByEmail,
  getAllStudents,
  addStudent,
  // members
  getMemberByKerberosId,
  addMember,
  getMemberClasses,
  approveMember,
  // classes
  getClasses,
  createClass,
  markAttendance,
}

export default api
