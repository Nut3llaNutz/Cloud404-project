import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null); // success | error | loading

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await axios.post(`${API_BASE_URL}/feedback`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error("Feedback error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">

                {/* Contact Info Side */}
                <div className="bg-indigo-700 text-white p-10 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold mb-6">Get in Touch</h2>
                    <p className="text-indigo-200 mb-8 text-lg">
                        Have questions about the project? Want to collaborate?
                        We'd love to hear from you.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl">📍</span>
                            <p className="text-lg">123 Innovation Drive, Tech City, India</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl">📧</span>
                            <p className="text-lg">contact@swadeshihub.in</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl">📞</span>
                            <p className="text-lg">+91 98765 43210</p>
                        </div>
                    </div>
                </div>

                {/* Feedback Form Side */}
                <div className="p-10 md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                    {status === 'success' && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                            <p className="font-bold">Message Sent!</p>
                            <p>Thank you for your feedback. We will get back to you soon.</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                            <p className="font-bold">Error</p>
                            <p>Something went wrong. Please try again later.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Message / Feedback</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-32"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 transition disabled:bg-gray-400"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
