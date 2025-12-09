// client/src/main.jsx (UPDATED)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UserContext'; // Import provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App with the UserProvider */}
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
);