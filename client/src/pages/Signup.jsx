// client/src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
            // IMPORTANT: Replace this base URL with your Render API base URL (e.g., https://cloud404-api.onrender.com)
            const BASE_URL = 'https://cloud404-project.onrender.com'; 
            const res = await axios.post(`${BASE_URL}/api/auth/signup`, formData);

            setMessage(`SUCCESS: ${res.data.message}. Redirecting to login...`);
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            setMessage(`ERROR: ${err.response?.data?.message || 'Server connection failed.'}`);
        }
    };

    return (
        <div className="container mx-auto p-8 pt-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Create Your Team Account</h2>
            <form onSubmit={handleSubmit} className="max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                {/* Message Display */}
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-white font-semibold ${message.startsWith('SUCCESS') ? 'bg-green-500' : 'bg-red-500'}`}>
                        {message}
                    </div>
                )}

                {['username', 'email', 'password', 'organization'].map((field) => (
                    <label key={field} className="block mb-4">
                        <span className="text-gray-700 capitalize">{field.replace('password', 'Password (Min 6 Chars)')}</span>
                        <input 
                            type={field === 'password' ? 'password' : 'text'} 
                            name={field} 
                            required={field !== 'organization'}
                            onChange={handleChange} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 p-2 border"
                        />
                    </label>
                ))}

                <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">
                    Register Account
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;