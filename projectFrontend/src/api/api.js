import axios from 'axios';

// Create an axios instance for API calls to backend
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // adjust according to backend URL
  headers: { 'Content-Type': 'application/json' },
});

// Login API call - sending kerberosid and password
export const login = async (kerberosid, password) => {
  try {
    const response = await apiClient.post('/login', { kerberosid, password });
    return response.data; // Contains user info on success
  } catch (error) {
    throw error.response?.data || error;
  }
};
