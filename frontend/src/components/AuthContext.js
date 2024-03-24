import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const signIn = (userData, token) => {
        const userWithToken = { ...userData, token };
        console.log("What is the userData then? " + userData.id);
        localStorage.setItem('user', JSON.stringify(userWithToken));
        setUser(userWithToken);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log("The token and Id for the stored user is: " + storedUser.token + " " + storedUser.id);
        window.location.href = "http://localhost:3000/expenses";
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
