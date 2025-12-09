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
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 max-w-4xl">
            <Link to="/robotics" className="text-indigo-500 hover:underline mb-4 block">← Back to Robotics</Link>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{project.name}</h1>

            {project.projectImages && project.projectImages.length > 0 && (
                <div className="mb-6">
                    <img src={project.projectImages[0]} alt={project.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">Description</h3>
                <p className="text-gray-700 mt-2 leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Team Members</h3>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        {project.teamMembers.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Contact Info</h3>
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold">Lead:</span> {project.owner?.username || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Organization:</span> {project.owner?.organization || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {project.contactEmail || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Phone:</span> {project.contactNumber || 'N/A'}
                    </p>
                </div>
            </div>

            {isOwner && (
                <div className="border-t pt-6 flex justify-end">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition"
                    >
                        Delete Project
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoboticsDetail;
