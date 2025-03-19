import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically add token if available
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log("🔑 Sending token:", token); // ✅ Debugging step
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn("🚨 No token found in localStorage!");
    }
    return config;
}, error => Promise.reject(error));

export default apiClient;
