import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useUser();
    const navigate = useNavigate();

    // Protect the route
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/'); // Redirect non-admins to home
        }
    }, [user, navigate]);

    const fetchProjects = async () => {
        try {
            // Fetch ALL projects including pending ones
            const res = await axios.get(`${API_BASE_URL}?status=pending`);
            // Note: This only fetches 'pending' by default logic we just set? 
            // Actually, we need to fetch all or specifically pending for the "Review Queue"
            // Let's explicitly fetch 'pending' for the review table.
            // And maybe 'approved' for managing featured items? 
            // For simplicity, let's just fetch ALL if the API supports it, or just PENDING for now.
            // My controller logic: "if (req.query.status) filter.status = req.query.status"
            setProjects(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`${API_BASE_URL}/${id}/status`, { status: newStatus }, {
                headers: { 'x-auth-token': token }
            });
            // Remove from list or update local state
            setProjects(projects.filter(p => p._id !== id));
            alert(`Project ${newStatus} successfully!`);
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status.");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard: Review Queue</h1>

            {projects.length === 0 ? (
                <p className="text-gray-500">No pending projects to review.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Project Name</th>
                                <th className="py-3 px-4 text-left">Submitted By</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects.map(project => (
                                <tr key={project._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 font-semibold">{project.name}</td>
                                    <td className="py-4 px-4">{project.owner?.username}</td>
                                    <td className="py-4 px-4">{project.category}</td>
                                    <td className="py-4 px-4 flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleStatusUpdate(project._id, 'approved')}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(project._id, 'rejected')}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Reject
                                        </button>
                                        <a
                                            href={`/projects`} // Ideally link to a details page, but we don't have one yet.
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline px-2 py-1"
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
