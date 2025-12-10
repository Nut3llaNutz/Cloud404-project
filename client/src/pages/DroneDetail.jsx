import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const DroneDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user, token } = useUser();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/drones/${id}`)
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
        if (!window.confirm("Are you sure you want to delete this drone project?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/drones/${id}`, {
                headers: { 'x-auth-token': token }
            });
            alert("Drone project deleted successfully!");
            navigate('/drones');
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project.");
        }
    };

    if (loading) return <div className="text-center p-16 text-2xl font-semibold text-sky-500">Loading Flight Data...</div>;
    if (!project) return <div className="text-center p-16 text-xl text-red-500">Project not found!</div>;

    const isOwner = user && project.owner && user.id === project.owner._id;

    return (
        <div className="rainbow-bg min-h-screen pt-24 pb-12 flex items-center justify-center">
            <div className="container mx-auto p-4 md:p-8 max-w-5xl">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-6 md:p-10 relative overflow-hidden border-t-4 border-sky-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    <Link to="/drones" className="inline-flex items-center text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-4 py-2 rounded-full mb-6 font-semibold transition-all hover:shadow-sm">
                        ← Back to Drones
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">{project.name}</h1>

                    {project.projectImages && project.projectImages.length > 0 && (
                        <div className="mb-8 overflow-hidden rounded-xl shadow-md">
                            <img src={project.projectImages[0]} alt={project.name} className="w-full h-64 md:h-[32rem] object-cover hover:scale-105 transition duration-500" />
                        </div>
                    )}

                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Mission Description</h3>
                        <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-sky-50 p-6 rounded-xl border border-sky-100">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Team Members</h3>
                            <ul className="space-y-2">
                                {project.teamMembers.map((member, index) => (
                                    <li key={index} className="flex items-center text-gray-700 bg-white px-3 py-2 rounded shadow-sm">
                                        <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                                        {member}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Contact Control</h3>
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
                                Decommission Drone
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DroneDetail;
