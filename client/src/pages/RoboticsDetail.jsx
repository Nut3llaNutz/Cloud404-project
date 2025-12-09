import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RoboticsDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user, token } = useUser();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/robotics/${id}`)
            .then(response => {
                setProject(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching project details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/robotics/${id}`, {
                headers: { 'x-auth-token': token }
            });
            alert("Project deleted successfully!");
            navigate('/robotics');
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project.");
        }
    };

    if (loading) return <div className="text-center p-16 text-2xl font-semibold text-indigo-500">Loading...</div>;
    if (!project) return <div className="text-center p-16 text-xl text-red-500">Project not found!</div>;

    const isOwner = user && project.owner && user.id === project.owner._id;

    return (
        <div className="container mx-auto p-8 rainbow-bg min-h-screen pt-24">
            <div className="bg-white shadow-2xl rounded-2xl max-w-4xl mx-auto p-8 relative">
                <Link to="/robotics" className="inline-flex items-center text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-full mb-6 font-semibold transition-all hover:shadow-sm">
                    ← Back to Robotics
                </Link>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">{project.name}</h1>

                {project.projectImages && project.projectImages.length > 0 && (
                    <div className="mb-8 overflow-hidden rounded-xl shadow-md">
                        <img src={project.projectImages[0]} alt={project.name} className="w-full h-[32rem] object-cover hover:scale-105 transition duration-500" />
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Team Members</h3>
                        <ul className="space-y-2">
                            {project.teamMembers.map((member, index) => (
                                <li key={index} className="flex items-center text-gray-700 bg-white px-3 py-2 rounded shadow-sm">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                    {member}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Contact Info</h3>
                        <div className="space-y-3 text-gray-700">
                            <p className="flex items-center">
                                <span className="font-semibold w-24">Lead:</span> {project.owner?.username || 'N/A'}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold w-24">Org:</span> {project.owner?.organization || 'N/A'}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold w-24">Email:</span> {project.contactEmail || 'N/A'}
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold w-24">Phone:</span> {project.contactNumber || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {isOwner && (
                    <div className="border-t pt-6 flex justify-end">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition font-semibold"
                        >
                            Delete Project
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoboticsDetail;
