import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const ProjectGallery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sortBy, setSortBy] = useState('newest'); // [NEW] Sort state
    const { token, isLoggedIn, user } = useUser();

    // Fetch projects
    useEffect(() => {
        const sortQuery = sortBy === 'likes' ? '?sort=likes' : '';
        axios.get(`${API_BASE_URL}/projects${sortQuery}`)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [sortBy]); // Refetch when sort changes

    const handleLike = async (projectId) => {
        if (!isLoggedIn) {
            alert("Please log in to interact with projects.");
            return;
        }

        try {
            const res = await axios.patch(`${API_BASE_URL}/projects/${projectId}/like`, {}, {
                headers: { 'x-auth-token': token }
            });
            const updatedProject = res.data.project;

            // Fix for "Anonymous" bug: server might send back owner as ID string instead of object
            // We manually preserve the existing owner details from the current state
            setProjects(prevProjects => prevProjects.map(p => {
                if (p._id === projectId) {
                    return {
                        ...updatedProject,
                        owner: typeof updatedProject.owner === 'string' ? p.owner : updatedProject.owner
                    };
                }
                return p;
            }));

        } catch (error) {
            console.error("Error toggling like:", error);
            alert(`Could not process like: ${error.response?.data?.message || 'Server connection error.'}`);
        }
    };

    // Filter Logic
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'Agriculture', 'Defense', 'Healthcare', 'Education', 'Robotics', 'Drones', 'Other'];

    if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-indigo-600">Loading Innovations...</div>;

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Project <span className="text-indigo-600">Gallery</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Explore the cutting-edge innovations submitted by India's brightest minds.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search projects by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex overflow-x-auto pb-4 md:pb-2 w-full md:w-auto gap-2 thin-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition duration-200 ${categoryFilter === cat
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 font-medium"
                >
                    <option value="newest">📅 Newest</option>
                    <option value="likes">❤️ Most Liked</option>
                </select>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xl text-gray-500">No projects found matching your criteria.</p>
                    <button onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }} className="mt-4 text-indigo-600 font-semibold hover:underline">
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => {
                        const isCurrentUserLiked = project.likedBy?.includes(user?.id);

                        return (
                            <div key={project._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    {project.projectImages && project.projectImages[0] ? (
                                        <img
                                            src={project.projectImages[0]}
                                            alt={project.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">🚀</div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm uppercase tracking-wide">
                                        {project.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>

                                    <div className="border-t pt-4 mt-auto">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center space-x-2">
                                                <div className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {project.owner?.username || 'Anonymous'}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(project.dateSubmitted).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() => handleLike(project._id)}
                                                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition text-sm font-medium ${isCurrentUserLiked
                                                    ? 'bg-red-50 text-red-500'
                                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <span>{isCurrentUserLiked ? '❤️' : '🤍'}</span>
                                                <span>{project.likes}</span>
                                            </button>

                                            {/* Generic projects don't have a dedicated details page in the original plan, 
                                                but we can keep it simple. */}
                                        </div>

                                        <Link to={`/projects/${project._id}`} className="block mt-4 text-center text-indigo-500 font-semibold bg-indigo-50 py-2 rounded-lg transition hover:bg-indigo-100">
                                            View Innovation Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </div >
    );
};

export default ProjectGallery;