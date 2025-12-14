import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Send cookies for auth
axios.defaults.withCredentials = true;

export default axios;
