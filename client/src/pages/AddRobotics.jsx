import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AddRobotics = () => {
    const { token } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        teamMembers: '',
        imageUrl: '',
        contactEmail: '',
        contactNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert comma-separated string to array
        const teamMembersArray = formData.teamMembers.split(',').map(m => m.trim());
        const projectImagesArray = formData.imageUrl ? [formData.imageUrl] : [];

        try {
            await axios.post(`${API_BASE_URL}/robotics`, {
                name: formData.name,
                description: formData.description,
                teamMembers: teamMembersArray,
                projectImages: projectImagesArray,
                contactEmail: formData.contactEmail,
                contactNumber: formData.contactNumber
            }, {
                headers: { 'x-auth-token': token } // Auth token required
            });

            alert('Robotics project submitted successfully!');
            navigate('/robotics');
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-8">🚀 Submit New Robotics Project</h2>

            <form onSubmit={handleSubmit} className="max-w-xl bg-white p-8 rounded-xl shadow-3xl">
                {/* Project Name Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Project Name</span>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
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
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    ></textarea>
                </label>

                {/* Team Members Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Team Members (Comma Separated)</span>
                    <input
                        type="text"
                        name="teamMembers"
                        required
                        value={formData.teamMembers}
                        onChange={handleChange}
                        placeholder="P1, P2, P3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Contact Email Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Contact Email</span>
                    <input
                        type="email"
                        name="contactEmail"
                        required
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Contact Number Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Contact Number</span>
                    <input
                        type="tel"
                        name="contactNumber"
                        required
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Image URL Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 flex items-center gap-2">
                        Project Image URL <span className="text-gray-400 text-sm">(Optional)</span>
                    </span>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/robot.jpg"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                    Submit Project
                </button>
            </form>
        </div>
    );
};

export default AddRobotics;
