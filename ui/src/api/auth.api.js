import apiClient from "./client";

export const authAPI = {
    login: async (credentials) => {
        return await apiClient.post('/auth/login', credentials);
    },

    logout: async (credentials) => {
        return await apiClient.post('/auth/logout', credentials);
    }
}