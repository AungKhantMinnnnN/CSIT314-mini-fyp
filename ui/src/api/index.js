
import axios from 'axios';

const API_URL = "http://localhost:3000/api";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const token = JSON.parse(user).token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            const currentPath = window.location.pathname;
            if (currentPath !== '/logout') {
                window.location.href = '/login';
    }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
