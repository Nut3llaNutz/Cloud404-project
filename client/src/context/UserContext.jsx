// client/src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // State to hold user info (id, username, role) and token
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    // Function to set user data and token on login success
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setToken(token);
        setUser(userData);
        setIsLoggedIn(true);
    };

    // Function to clear user data on logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
    };

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