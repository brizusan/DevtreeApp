import axios from "axios";

const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiAxios;
