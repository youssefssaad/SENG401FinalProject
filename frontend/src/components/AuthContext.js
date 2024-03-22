import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const signIn = (userData, token) => {
        const userWithToken = { ...userData, token };
        localStorage.setItem('user', JSON.stringify(userWithToken));
        setUser(userWithToken);
        window.location.href = "http://localhost:3000/main";
    };

    const signOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
