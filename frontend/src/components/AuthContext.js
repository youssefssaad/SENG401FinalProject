import React, { createContext, useContext, useState } from 'react';
import { REACT_APP_API_BASE_URL, APP_BASE_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const signIn = (userData, token) => {
        const userWithToken = { ...userData, token };
        localStorage.setItem('user', JSON.stringify(userWithToken));
        setUser(userWithToken);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("The token and Id for the stored user is: " + storedUser.token + " " + storedUser.id);
        window.location.href = `${APP_BASE_URL}/expenses`;
    };

    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = `${APP_BASE_URL}/`;
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
