// client/src/pages/ProjectGallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Imports your live Render URL
import { useUser } from '../context/UserContext'; // <-- Import context

const ProjectGallery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest'); // State for sorting
    const [category, setCategory] = useState('All'); // State for filtering
    const { token, isLoggedIn, user } = useUser();

    // --- Data Fetching (READ) ---
    useEffect(() => {
        setLoading(true);
        let url = `${API_BASE_URL}?`;
        if (sortBy === 'likes') url += `sort=likes&`;
        if (category !== 'All') url += `category=${category}&`;

        axios.get(url)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [sortBy, category]); // Refetch when sorting or category changes

    // --- Handle Like Functionality ---
    const handleLike = async (projectId) => {
        if (!isLoggedIn) {
            alert("Please log in to interact with projects.");
            return;
        }

        try {
            const res = await axios.patch(`${API_BASE_URL}/${projectId}/like`, {}, {
                headers: { 'x-auth-token': token }
            });

            // Update the projects state with the fresh data from the server
            // The server response now contains the full updated project object
            const updatedProject = res.data.project;

            setProjects(projects.map(p =>
                p._id === projectId ? updatedProject : p // Replace old project with updated one
            ));

        } catch (error) {
            console.error("Error toggling like:", error);
            alert(`Could not process like: ${error.response?.data?.message || 'Server connection error.'}`);
        }
    };

    if (loading) return <div className="text-center p-16 text-2xl font-semibold text-indigo-500">📡 Loading Projects...</div>;
    if (projects.length === 0) return <div className="text-center p-16 text-xl text-gray-500">No projects submitted yet. Be the first!</div>;

    return (
        <div className="container mx-auto p-8 pt-28 bg-gray-50">
            <div className="flex justify-between items-center mb-10 border-b-2 border-indigo-200 pb-3">
                <h2 className="text-4xl font-extrabold text-gray-800">Innovations Gallery</h2>
                <div className="flex flex-wrap items-center gap-4">
                    {/* Category Filter */}
                    <div className="flex items-center space-x-2">
                        <label className="text-gray-600 font-medium">Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-2 border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        >
                            <option value="All">All Categories</option>
                            <option>Agriculture</option>
                            <option>Defense</option>
                            <option>Healthcare</option>
                            <option>Education</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-gray-600 font-medium">Sort By:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        >
                            <option value="newest">Newest First</option>
                            <option value="likes">Most Liked</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => {
                    // 1. Determine if the current logged-in user has liked this project
                    // 'user' comes from the useUser() hook and holds the current user's data
                    const isCurrentUserLiked = Array.isArray(project.likedBy) && project.likedBy.includes(user?.id);

                    return (
                        <div
                            key={project._id}
                            className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-600 transform hover:scale-[1.02] transition duration-300"
                        >

                            {/* PROJECT IMAGE (Reads from Project Model) */}
                            {project.projectImages && project.projectImages[0] && (
                                <img
                                    src={project.projectImages[0]}
                                    alt={project.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}

                            {/* PROJECT CORE DETAILS */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
                            <p className="text-sm font-semibold mb-3 text-green-600">
                                Category: {project.category}
                            </p>
                            <p className="text-gray-700 mt-2 h-16 overflow-hidden text-ellipsis">{project.description}</p>

                            {/* OWNER & CONTACT DETAILS (Reads from Populated User Data) */}
                            <div className="mt-5 pt-3 border-t">

                                {/* Owner Name and Organization */}
                                <p className="text-sm font-semibold text-gray-700 mt-2">Team Lead:</p>
                                <p className="text-lg font-bold text-indigo-700">{project.owner?.username || 'N/A'}</p>
                                <p className="text-xs text-gray-500">{project.owner?.organization || 'Individual Contributor'}</p>

                                {/* Contact Info */}
                                <p className="text-xs text-gray-500 mt-2">
                                    Contact:
                                    <span className="text-indigo-600 font-semibold ml-1">
                                        {project.owner?.contactNumber || 'Not Listed'}
                                    </span>
                                </p>
                            </div>

                            {/* LIKE BUTTON SECTION */}
                            <div className="mt-4 pt-3 border-t flex justify-between items-center">

                                {/* Likes Display */}
                                <div className="text-lg font-bold text-gray-800 flex items-center">
                                    ❤️ {project.likes}
                                </div>

                                {/* Like/Unlike Button Logic */}
                                <button
                                    onClick={() => handleLike(project._id)}
                                    disabled={!isLoggedIn}
                                    className={`px-3 py-1 text-sm rounded-full transition 
                        ${isLoggedIn
                                            ? (isCurrentUserLiked
                                                ? 'bg-indigo-500 text-white hover:bg-indigo-600' // UNLIKE Style
                                                : 'bg-red-500 text-white hover:bg-red-600') // LIKE Style
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed' // Disabled Style
                                        }`
                                    }
                                >
                                    {isLoggedIn ? (isCurrentUserLiked ? 'Unlike' : 'Like') : 'Login to Like'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectGallery;