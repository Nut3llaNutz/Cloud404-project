import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, token } = useUser();
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        // Fetch all projects and filter by owner client-side for simplicity, 
        // or ideally create a dedicated backend endpoint /api/projects/user/:id
        // For this demo, we'll fetch all robotics and general projects and filter.

        const fetchData = async () => {
            try {
                const [roboticsRes, projectsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/robotics`),
                    axios.get(`${API_BASE_URL}/projects`) // Fixed URL
                ]);

                const allRobotics = roboticsRes.data;
                const allProjects = projectsRes.data;

                // Filter for current user
                // Depending on populate, owner might be object or ID string
                const userRobotics = allRobotics.filter(p => (p.owner?._id || p.owner) === user.id);
                const userProjects = allProjects.filter(p => (p.owner?._id || p.owner) === user.id);

                setMyProjects([...userRobotics, ...userProjects]);
                setLoading(false);
            } catch (error) {
                console.error("Error loading dashboard data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (!user) return <div className="p-20 text-center text-xl">Please log in to view dashboard.</div>;
    if (loading) return <div className="p-20 text-center text-xl">Loading your portfolio...</div>;

    return (
        <div className="purplish-bg min-h-screen pt-24">
            <div className="container mx-auto p-4 md:p-8">
                {/* Welcome Section - Professional Dark Glass */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-10 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="relative z-10">
                        <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mb-2">Workspace</p>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user.username}</span>.
                        </h1>

                        <div className="flex flex-wrap gap-6">
                            <div className="bg-slate-900/50 px-6 py-4 rounded-xl border border-white/5 flex flex-col min-w-[200px]">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Organization</span>
                                <span className="font-semibold text-lg text-white">{user.organization || 'Independent Creator'}</span>
                            </div>
                            <div className="bg-slate-900/50 px-6 py-4 rounded-xl border border-white/5 flex flex-col min-w-[200px]">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Email</span>
                                <span className="font-semibold text-lg text-white">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions & Stats */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">My Submissions</h2>
                        <p className="text-gray-400">Manage and track your innovations.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/add-robotics" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all text-sm uppercase tracking-wide">
                            + Add Robot
                        </Link>
                        <Link to="/add-drone" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all text-sm uppercase tracking-wide">
                            + Add Drone
                        </Link>
                        <Link to="/submit" className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-lg transition-all text-sm uppercase tracking-wide backdrop-blur-sm">
                            New Project
                        </Link>
                    </div>
                </div>

                {/* Projects Grid - Professional Cards */}
                {myProjects.length === 0 ? (
                    <div className="text-center py-24 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 border-dashed">
                        <div className="text-gray-500 text-6xl mb-4 font-light">+</div>
                        <h3 className="text-white text-xl font-bold mb-2">No projects yet</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">Your portfolio is empty. Submit your first innovation to get started.</p>
                        <Link to="/submit" className="inline-block px-8 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                            Submit Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myProjects.map(project => (
                            <div key={project._id} className="group bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-900/20">

                                <div className="flex justify-between items-start mb-4">
                                    <div className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider border ${project.category === 'Robotics' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                                            project.category === 'Drones' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                                                'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                                        }`}>
                                        {project.category}
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">
                                        {new Date(project.dateSubmitted).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors truncate">
                                    {project.name}
                                </h3>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow font-light">
                                    {project.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-end">
                                    <Link
                                        to={project.category === 'Robotics' ? `/robotics/${project._id}` : project.category === 'Drones' ? `/drones/${project._id}` : `/projects/${project._id}`}
                                        className="text-white text-sm font-semibold hover:text-indigo-400 transition-colors flex items-center gap-2 group/link"
                                    >
                                        View Details
                                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default Dashboard;
