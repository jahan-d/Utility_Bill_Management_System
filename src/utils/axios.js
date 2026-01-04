import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://b12a10v3.vercel.app",
});

export default axiosInstance;
