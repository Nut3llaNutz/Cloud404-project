// client/src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import our custom hook

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { login } = useUser(); // Get the login function from context
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Logging in...');

        try {
            // IMPORTANT: Replace this base URL with your Render API base URL
            const BASE_URL = 'https://cloud404-project.onrender.com'; 
            const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);

            // Success: Use the context function to store token and user data
            login(res.data.token, res.data.user); 

            setMessage(`SUCCESS! Welcome, ${res.data.user.username}.`);
            setTimeout(() => navigate('/projects'), 1000); // Redirect to projects page

        } catch (err) {
            setMessage(`ERROR: ${err.response?.data?.message || 'Invalid Credentials.'}`);
        }
    };

    return (
        <div className="container mx-auto p-8 pt-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Login to Submit Projects</h2>
            <form onSubmit={handleSubmit} className="max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-white font-semibold ${message.startsWith('SUCCESS') ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message}
                    </div>
                )}

                <label className="block mb-4">
                    <span className="text-gray-700">Email</span>
                    <input type="text" name="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 p-2 border"/>
                </label>

                <label className="block mb-6">
                    <span className="text-gray-700">Password</span>
                    <input type="password" name="password" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 p-2 border"/>
                </label>

                <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">
                    Login
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Need an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;