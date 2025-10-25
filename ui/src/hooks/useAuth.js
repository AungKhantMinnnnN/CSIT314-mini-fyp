import { useState, useEffect } from 'react';
import apiClient from '../api/index';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await apiClient.post('/auth/login', { username, password });
        if (response.data.data.user) {
            setUser(response.data.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    };

    const logout = async () => {
        // It's good practice to inform the backend of logout
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error("Logout failed", error);
        }
        setUser(null);
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return { user, loading, login, logout };
};