const BASE_URL = 'https://your-backend-https://github.com/tejashvi-kumawat/DoEP-NSS-IITD-Backend.com/api'; // Replace with actual backend URL


async function request(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}


export const login = (data) => request('/authRoute/add', 'POST', data);
export const getLogin = () => request('/authRoute', 'GET');

export const addClass = (data) => request('/classRoutes/add', 'POST', data);
export const getClasses = () => request('/classRoutes', 'GET');

export const nssMember = (data) => request('/nssMemberRoutes/add', 'POST', data);
export const getNssMember = () => request('/nssMemberRoutes', 'GET');

export const addStudent = (data) => request('/studentRoutes/login', 'POST', data);
export const getStudent = () => request('/studentRoutes/profile', 'GET');


