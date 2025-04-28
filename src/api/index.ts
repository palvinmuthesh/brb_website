// src/api/index.ts
import axios from "axios";

const API_BASE_URL = process.env.VITE_API_BASE_URL || "https://brb-backend.onrender.com/api"; // adjust as needed

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if you need to attach token or log responses
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
