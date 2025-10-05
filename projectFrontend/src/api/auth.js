import axios from "./api"; // Use your configured axios instance

export async function login({ kerberosid, password }) {
  try {
    const response = await axios.post("/login", {
      kerberosid,
      password
    });
    return response.data; // Contains user info on success
  } catch (error) {
    // Attach message in case of error
    throw error.response?.data || { message: "Login failed" };
  }
}
