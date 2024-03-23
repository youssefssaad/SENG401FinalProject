import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // User is not authenticated, redirect to login page
        return <Navigate to="/" />;
    }

    // User is authenticated, render the children components
    return children;
};

export default ProtectedRoute;
