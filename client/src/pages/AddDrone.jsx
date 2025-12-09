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
        <div className="container mx-auto p-8 max-w-2xl bg-white shadow-xl rounded-xl mt-10 border-t-4 border-sky-500">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4">🚁 Launch New Drone project</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Drone Name</label>
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
                    <label className="block text-gray-700 font-bold mb-2">Mission Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-32"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Crew Members (comma separated)</label>
                    <input
                        type="text"
                        name="teamMembers"
                        value={formData.teamMembers}
                        onChange={handleChange}
                        placeholder="P1, P2, P3"
                        className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Contact Email</label>
                    <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Contact Number</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Image URL (Optional)</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/drone.jpg"
                        className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-sky-600 text-white font-bold py-3 rounded hover:bg-sky-700 transition"
                >
                    Launch Drone
                </button>
            </form>
        </div>
    );
};

export default AddDrone;
