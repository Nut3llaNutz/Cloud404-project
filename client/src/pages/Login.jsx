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
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage your projects</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {message && (
                        <div className={`p-4 rounded-lg text-sm font-medium ${message.startsWith('SUCCESS') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="text"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition duration-200 shadow-lg">
                        Sign In
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">Create account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;