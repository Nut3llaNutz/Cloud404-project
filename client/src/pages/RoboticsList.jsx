import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RoboticsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // NEW state for search
    const [sortBy, setSortBy] = useState('newest');
    const { token, isLoggedIn, user } = useUser();

    useEffect(() => {
        // Use the dedicated Robotics API endpoint
        const sortQuery = sortBy === 'likes' ? '?sort=likes' : '';
        axios.get(`${API_BASE_URL}/robotics${sortQuery}`)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching robotics projects:", error);
                setLoading(false);
            });
    }, [sortBy]);

    const handleLike = async (projectId) => {
        if (!isLoggedIn) {
            alert("Please log in to interact with projects.");
            return;
        }

        try {
            const res = await axios.patch(`${API_BASE_URL}/projects/${projectId}/like`, {}, {
                headers: { 'x-auth-token': token }
            });
            // Update local state without full refetch
            setProjects(projects.map(p => p._id === projectId ? { ...p, likes: res.data.project.likes, likedBy: res.data.project.likedBy } : p));
        } catch (error) {
            console.error("Error toggling like:", error);
            alert(`Could not process like: ${error.response?.data?.message || 'Server connection error.'}`);
        }
    };

    // Filter projects based on search term (CLIENT SIDE FILTERING)
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center p-16 text-2xl font-semibold text-indigo-500">🤖 Loading Robotics Projects...</div>;

    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b-2 border-indigo-200 pb-3 gap-4">
                <h2 className="text-4xl font-extrabold text-gray-800">🤖 Robotics Projects</h2>

                {/* SEARCH BAR */}
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 p-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <Link to="/add-robotics" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-lg whitespace-nowrap">
                    + Add New Robot
                </Link>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-700 font-medium"
                >
                    <option value="newest">📅 Newest</option>
                    <option value="likes">❤️ Most Liked</option>
                </select>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="text-center p-16 text-xl text-gray-500">
                    {searchTerm ? "No projects match your search." : "No robotics projects yet. Be the first to build the future!"}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => (
                        <div key={project._id} className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-600 transform hover:scale-[1.02] transition duration-300">
                            {project.projectImages && project.projectImages[0] && (
                                <img
                                    src={project.projectImages[0]}
                                    alt={project.name}
                                    className="w-full h-56 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
                            <p className="text-sm font-semibold mb-3 text-indigo-600">
                                Team: {project.teamMembers.join(', ')}
                            </p>
                            <p className="text-gray-700 mt-2 h-16 overflow-hidden text-ellipsis">{project.description}</p>

                            <Link to={`/robotics/${project._id}`} className="block mt-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5">
                                View Details →
                            </Link>

                            <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
                                <span className="text-gray-500 text-sm">👍 {project.likes || 0} Likes</span>
                                <button
                                    onClick={() => handleLike(project._id)}
                                    className={`px-3 py-1 rounded-full text-sm font-bold transition duration-200 ${project.likedBy?.includes(user?.id)
                                        ? 'bg-red-50 text-red-500 hover:bg-red-100'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {project.likedBy?.includes(user?.id) ? '❤️ Liked' : '🤍 Like'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoboticsList;
