import React, { createContext, useState, useEffect } from 'react';
import authController from '../controllers/auth.controller';

export const authContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (username, password) => {

        const data = await authController.login(username, password);
        setUser(data.username);
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

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

