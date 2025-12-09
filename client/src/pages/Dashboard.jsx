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
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border-l-8 border-indigo-600">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">My Dashboard</h1>
                <p className="text-xl text-gray-600">Welcome back, <span className="font-bold text-indigo-600">{user.username}</span>!</p>
                <div className="mt-4 flex flex-wrap gap-4">
                    <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
                        <span className="font-bold text-gray-700">Organization:</span> {user.organization || 'Independent'}
                    </div>
                    <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
                        <span className="font-bold text-gray-700">Email:</span> {user.email}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Submissions ({myProjects.length})</h2>
                <div className="space-x-4">
                    <Link to="/add-robotics" className="text-indigo-600 hover:text-indigo-800 font-semibold">+ New Robot</Link>
                    <Link to="/add-drone" className="text-sky-600 hover:text-sky-800 font-semibold">+ New Drone</Link>
                    <Link to="/submit" className="text-green-600 hover:text-green-800 font-semibold">+ New Project</Link>
                </div>
            </div>

            {myProjects.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-lg mb-4">You haven't submitted any projects yet.</p>
                    <Link to="/submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Start Innovating
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProjects.map(project => (
                        <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 truncate">{project.name}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${project.category === 'Robotics' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                    {project.category}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="text-xs text-gray-400">
                                    {new Date(project.dateSubmitted).toLocaleDateString()}
                                </span>
                                <Link to={project.category === 'Robotics' ? `/robotics/${project._id}` : `/projects`} className="text-indigo-500 hover:underline text-sm font-medium">
                                    View Output
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
