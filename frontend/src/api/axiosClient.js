import axios from "axios";

// Central place for the backend base URL.
// Change this once here instead of in every component.
const BASE_URL = import.meta.env.VITE_API_URL ;

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach auth token automatically if you store one (adjust key as needed)
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Basic centralized error logging (customize/extend as needed)
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error?.response?.status, error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;