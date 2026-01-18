// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // adjust if backend runs separately
});

// ✅ Attach token automatically to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
