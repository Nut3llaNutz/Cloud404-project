import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved'
    const { token, user } = useUser();
    const navigate = useNavigate();

    // Protect the route
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/'); // Redirect non-admins to home
        }
    }, [user, navigate]);

    // Fetch projects based on active tab
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                // Fetch based on current tab status
                const res = await axios.get(`${API_BASE_URL}?status=${activeTab}`);
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setLoading(false);
            }
        };

        if (user?.role === 'admin') {
            fetchProjects();
        }
    }, [activeTab, user]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`${API_BASE_URL}/${id}/status`, { status: newStatus }, {
                headers: { 'x-auth-token': token }
            });
            // Refresh list (easiest way handles moving between tabs implicitly)
            setProjects(projects.filter(p => p._id !== id));
            alert(`Project ${newStatus} successfully!`);
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status.");
        }
    };

    const handleFeatureToggle = async (id) => {
        try {
            const res = await axios.put(`${API_BASE_URL}/${id}/feature`, {}, {
                headers: { 'x-auth-token': token }
            });

            // Update local state to reflect change immediately
            setProjects(projects.map(p =>
                p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p
            ));
        } catch (err) {
            console.error("Error toggling feature:", err);
            alert("Failed to toggle feature status.");
        }
    };

    if (loading && projects.length === 0) return <div className="p-10 text-center text-indigo-600 font-bold">Loading Dashboard...</div>;

    return (
        <div className="container mx-auto p-8 pt-24 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-800">
                Admin Dashboard
            </h1>

            {/* Tabs */}
            <div className="flex space-x-6 mb-8 border-b border-gray-300">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`pb-3 text-lg font-medium transition-colors duration-200 ${activeTab === 'pending'
                            ? 'border-b-4 border-indigo-600 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Review Queue (Pending)
                </button>
                <button
                    onClick={() => setActiveTab('approved')}
                    className={`pb-3 text-lg font-medium transition-colors duration-200 ${activeTab === 'approved'
                            ? 'border-b-4 border-indigo-600 text-indigo-700'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Managed Projects (Approved)
                </button>
            </div>

            {/* Content Table */}
            {projects.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
                    {activeTab === 'pending' ? '🎉 No pending reviews! You are all caught up.' : 'No approved projects found.'}
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl shadow-lg border border-gray-100 bg-white">
                    <table className="min-w-full leading-normal">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Owner</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects.map(project => (
                                <tr key={project._id} className="hover:bg-indigo-50/30 transition duration-150">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900">{project.name}</div>
                                        <div className="text-xs text-gray-500">{new Date(project.dateSubmitted).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{project.owner?.username}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-3">
                                        {activeTab === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(project._id, 'approved')}
                                                    className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition shadow-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(project._id, 'rejected')}
                                                    className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600 transition shadow-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleFeatureToggle(project._id)}
                                                    className={`px-4 py-2 text-xs font-bold rounded transition shadow-sm w-32 ${project.isFeatured
                                                            ? 'bg-yellow-400 text-yellow-900 border border-yellow-500 hover:bg-yellow-500'
                                                            : 'bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300'
                                                        }`}
                                                >
                                                    {project.isFeatured ? '★ Featured' : '☆ Feature'}
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(project._id, 'rejected')}
                                                    className="text-red-600 hover:text-red-800 text-xs font-semibold underline"
                                                >
                                                    Revoke
                                                </button>
                                            </>
                                        )}
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
