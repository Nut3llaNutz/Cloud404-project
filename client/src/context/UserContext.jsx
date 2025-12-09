// client/src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // State to hold user info (id, username, role) and token
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    // Function to set user data and token on login success
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        setIsLoggedIn(true);
    };

    // Function to clear user data on logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
    };

    // Helper to decode JWT payload safely
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    // Check token expiration on load and set up auto-logout
    useEffect(() => {
        if (!token) return;

        const decoded = parseJwt(token);
        if (!decoded || !decoded.exp) {
            // If token is invalid/corrupted, logout immediately
            logout();
            return;
        }

        // exp is in seconds, convert to ms
        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
            // Already expired
            logout();
        } else {
            // Set timer for remaining time
            const timeLeft = expirationTime - currentTime;
            const timer = setTimeout(() => {
                logout();
                alert("Session expired. Please log in again.");
            }, timeLeft);

            return () => clearTimeout(timer);
        }
    }, [token]);

    // Value provided to components consuming the context
    const contextValue = {
        user,
        token,
        isLoggedIn,
        login,
        logout
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to easily use the context in any component
export const useUser = () => useContext(UserContext);