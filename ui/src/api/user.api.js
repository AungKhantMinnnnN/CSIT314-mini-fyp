import apiClient from "./client";

export const userAPI = {
    getAll: async () => {
        return await apiClient.get('/user/getAllUserInfo')
    }
}