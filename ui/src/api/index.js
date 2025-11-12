import axios from "axios";

// ✅ Automatically switch base URL based on environment
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"           // local backend
    : "https://csit314api.onrender.com/api"; // deployed backend

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // slightly longer timeout
});

// ✅ Request Interceptor - Attach token if available
apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const token = JSON.parse(user)?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        console.warn("⚠️ Failed to parse stored user token");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - Handle Unauthorized or Network errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("⏳ Request timeout. The server took too long to respond.");
    }

    if (error.response) {
      if (error.response.status === 401) {
        console.warn("🔒 Unauthorized: token invalid or expired");
        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } else if (error.response.status >= 500) {
        console.error("💥 Server error:", error.response.data?.message || error.message);
      }
    } else if (error.request) {
      console.error("🌐 No response from server — check your network or CORS settings.");
    } else {
      console.error("⚠️ Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
