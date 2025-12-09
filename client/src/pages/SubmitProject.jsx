// client/src/pages/SubmitProject.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const SubmitProject = () => {
    // <-- NEW: Get the token from the user context
    const { token, isLoggedIn } = useUser();

    // Redirect if not logged in (basic client-side protection)
    if (!isLoggedIn) {
         // You can use useEffect here or just a simple check, but let's keep it simple:
         return <div className="text-center p-16 text-xl">Please <Link to="/login" className="text-indigo-600">login</Link> to submit a project.</div>;
    }

    const [formData, setFormData] = useState({
        name: '',
        category: 'Agriculture',
        teamMembers: '', // Will be split by comma
        description: '',
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        // Prepare data: Split team members string into an array
        const payload = {
        name: formData.name,
        category: formData.category,
        teamMembers: formData.teamMembers.split(',').map(s => s.trim()),
        description: formData.description,
        // CRITICAL CORRECTION: Send the image URL as an array
        projectImages: formData.imageUrl ? [formData.imageUrl] : [], 
        };

        // --- Data Submission (CREATE) ---
        try {
            await axios.post(API_BASE_URL, payload, {
                headers: {
                    'x-auth-token': token // <-- send the jwt token in the request headers
                }
            });
            setStatus('SUCCESS! Project submitted.');
            // Redirect user to the gallery after 2 seconds
            setTimeout(() => navigate('/projects'), 2000);
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus(`ERROR: ${error.response?.data?.message || 'Check server connection.'}`);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-8">Submit Your Innovation</h2>

            <form onSubmit={handleSubmit} className="max-w-xl bg-white p-8 rounded-xl shadow-3xl">
                {/* Status Message */}
                {status && (
                    <div className={`p-3 mb-4 rounded-lg text-white font-semibold ${status.startsWith('SUCCESS') ? 'bg-green-500' : 'bg-red-500'}`}>
                        {status}
                    </div>
                )}

                {/* Project Name Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Project Name</span>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Category Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Category</span>
                    <select 
                        name="category" 
                        required 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    >
                        <option>Agriculture</option>
                        <option>Defense</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Other</option>
                    </select>
                </label>

                {/* Team Members Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Team Members (Comma Separated, e.g., P1, P2, P3)</span>
                    <input 
                        type="text" 
                        name="teamMembers" 
                        required 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Description Field */}
                <label className="block mb-6">
                    <span className="text-gray-700 font-medium">Description</span>
                    <textarea 
                        name="description" 
                        required 
                        rows="4" 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    ></textarea>
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Project Image URL (Optional)</span>
                    <input 
                        type="url" 
                        name="imageUrl" 
                        placeholder="Link to your project's main image"
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                </label>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                    disabled={status === 'Submitting...'}
                >
                    Submit Innovation
                </button>
            </form>
        </div>
    );
};

export default SubmitProject;