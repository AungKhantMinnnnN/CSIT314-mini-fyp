import axios from 'axios';

const API_URL = "http://localhost:3000/api";

console.log('🔧 API Base URL:', API_URL); // Debug log

const apiClient = axios.create({
    baseURL : API_URL,
    headers: {
        'Content-Type' : 'application/json',
    },
    timeout : 10000
});

export default apiClient;