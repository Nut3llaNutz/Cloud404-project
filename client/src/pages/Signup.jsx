// client/src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', organization: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Registering...');

        try {
            // Use the centralized API_BASE_URL (points to localhost:5000/api locally)
            const res = await axios.post(`${API_BASE_URL}/auth/signup`, formData);

            setMessage(`SUCCESS: ${res.data.message}. Redirecting to login...`);
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            setMessage(`ERROR: ${err.response?.data?.message || 'Server connection failed.'}`);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Join the Innovation</h2>
                    <p className="text-gray-500 mt-2">Create your account to start building</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Message Display */}
                    {message && (
                        <div className={`p-4 rounded-lg text-sm font-medium ${message.startsWith('SUCCESS') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    {['username', 'email', 'password', 'organization'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                {field === 'organization' ? 'Organization / College' : field === 'contactNumber' ? 'Contact Number' : field}
                            </label>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                name={field}
                                required={field !== 'organization'}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                                placeholder={field === 'username' ? 'johndoe' : field === 'email' ? 'john@example.com' : ''}
                            />
                        </div>
                    ))}

                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition duration-200 shadow-lg mt-4">
                        Register Account
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;