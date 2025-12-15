import axios from "axios";

// Base URL is taken from environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // for cookies if needed
});

export default axiosInstance;
