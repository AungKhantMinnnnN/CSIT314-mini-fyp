import React, { createContext, useState, useEffect } from 'react';
import authController from '../controllers/auth.controller';

export const authContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
        setLoading(false); // ✅ done initializing
    }, []);

    const login = async (username, password) => {

        const data = await authController.login(username, password);
        setUser(data.data.user);
        console.log(data.data.user)
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return data;
    };

    const logout = async (username) => {
        await authController.logout(username);
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout
    };

    return (
        <authContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </authContext.Provider>
  );

}

