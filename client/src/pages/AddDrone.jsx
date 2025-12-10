import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AddDrone = () => {
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

        const teamMembersArray = formData.teamMembers.split(',').map(m => m.trim());
        const projectImagesArray = formData.imageUrl ? [formData.imageUrl] : [];

        try {
            await axios.post(`${API_BASE_URL}/drones`, {
                name: formData.name,
                description: formData.description,
                teamMembers: teamMembersArray,
                projectImages: projectImagesArray,
                contactEmail: formData.contactEmail,
                contactNumber: formData.contactNumber
            }, {
                headers: { 'x-auth-token': token }
            });

            alert('Drone project launched successfully!');
            navigate('/drones');
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-4xl font-extrabold text-sky-700 mb-8">🚁 Launch New Drone project</h2>

            {/* Note: SubmitProject uses shadow-3xl (referenced in previous context which likely maps to a custom class or is a typo for 2xl, but sticking to 2xl+ or custom if defined. I will use shadow-2xl for safety or match the exact class string if known, let's use shadow-xl to be consistent with prev files or shadow-2xl. Wait, SubmitProject had shadow-3xl, I will stick to shadow-xl or 2xl. Actually I'll use shadow-2xl as it's standard tailwind). SubmitProject used `shadow-3xl`. I will use `shadow-2xl` to ensure it works if 3xl isn't defined, or `shadow-xl`. Let's use `shadow-2xl`. */}
            {/* Actually, I will copy SubmitProject's `shadow-3xl` if it was there, assuming user has it defined. If not, I'll fallback later. SubmitProject had `shadow-3xl`. */}
            <form onSubmit={handleSubmit} className="max-w-xl bg-white p-8 rounded-xl shadow-2xl">
                {/* Drone Name Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Drone Name</span>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Description Field */}
                <label className="block mb-6">
                    <span className="text-gray-700 font-medium">Mission Description</span>
                    <textarea
                        name="description"
                        required
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 p-2 border"
                    ></textarea>
                </label>

                {/* Crew Members Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Team Members (Comma Separated)</span>
                    <input
                        type="text"
                        name="teamMembers"
                        required
                        value={formData.teamMembers}
                        onChange={handleChange}
                        placeholder="P1, P2, P3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 p-2 border"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 p-2 border"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                {/* Image URL Field */}
                <label className="block mb-4">
                    <span className="text-gray-700 flex items-center gap-2">
                        Image URL <span className="text-gray-400 text-sm">(Optional)</span>
                    </span>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/drone.jpg"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 p-2 border"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition"
                >
                    Launch Drone
                </button>
            </form>
        </div>
    );
};

export default AddDrone;
