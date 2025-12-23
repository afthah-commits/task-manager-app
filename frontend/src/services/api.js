import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
// Ensure no trailing slash then append /api/
baseURL = baseURL.replace(/\/$/, '') + '/api/';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Simple 401 handling - logout or just reject
        // Implementing refresh token is complex for MVP, stick to basic for now
        if (error.response?.status === 401) {
            // handle unauthorized (maybe expire)
        }
        return Promise.reject(error);
    }
);

export default api;
