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
        <div className="rainbow-bg min-h-screen pt-24">
            <div className="container mx-auto p-4 md:p-8">
                {/* Welcome Section - Glassmorphism */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-12 mb-10 border border-white/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 mb-4">
                        My Dashboard
                    </h1>
                    <p className="text-xl text-gray-700 font-medium">
                        Welcome back, <span className="font-bold text-indigo-700">{user.username}</span>! 🚀
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-2">
                            <span className="text-2xl">🏢</span>
                            <div>
                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Organization</span>
                                <span className="font-semibold text-gray-800">{user.organization || 'Independent Creator'}</span>
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-2">
                            <span className="text-2xl">📧</span>
                            <div>
                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Email</span>
                                <span className="font-semibold text-gray-800">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions & Stats */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h2 className="text-3xl font-bold text-white drop-shadow-md">
                        My Submissions <span className="bg-white/20 text-white px-3 py-1 rounded-full text-lg align-middle ml-2 backdrop-blur-md">{myProjects.length}</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/add-robotics" className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors"></div>
                            <span className="relative flex items-center gap-2">🤖 New Robot</span>
                        </Link>
                        <Link to="/add-drone" className="group relative px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                            <span className="relative flex items-center gap-2">✈️ New Drone</span>
                        </Link>
                        <Link to="/submit" className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                            <span className="relative flex items-center gap-2">💡 New Project</span>
                        </Link>
                    </div>
                </div>

                {/* Projects Grid */}
                {myProjects.length === 0 ? (
                    <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50">
                        <div className="text-6xl mb-6">🎨</div>
                        <p className="text-gray-600 text-2xl font-bold mb-2">Your canvas is empty!</p>
                        <p className="text-gray-500 mb-8">Start your journey by submitting your first innovation.</p>
                        <Link to="/submit" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform">
                            Start Innovating Now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myProjects.map(project => (
                            <div key={project._id} className="group bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 flex flex-col h-full">

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors line-clamp-1">
                                        {project.name}
                                    </h3>
                                    <span className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide uppercase ${project.category === 'Robotics' ? 'bg-blue-100 text-blue-800' :
                                        project.category === 'Drones' ? 'bg-sky-100 text-sky-800' :
                                            'bg-emerald-100 text-emerald-800'
                                        }`}>
                                        {project.category}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl group-hover:bg-indigo-50/30 transition-colors">
                                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                        📅 {new Date(project.dateSubmitted).toLocaleDateString()}
                                    </span>
                                    <Link
                                        to={project.category === 'Robotics' ? `/robotics/${project._id}` : project.category === 'Drones' ? `/drones/${project._id}` : `/projects/${project._id}`}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        View Details <span>→</span>
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
