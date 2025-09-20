import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

const api = axios.create({
  baseURL,
});

// attach token for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ unified with AdminDashboard
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
