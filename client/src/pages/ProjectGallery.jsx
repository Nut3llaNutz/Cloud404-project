// client/src/pages/ProjectGallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Imports your live Render URL
import { useUser } from '../context/UserContext'; // <-- Import context

const ProjectGallery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, isLoggedIn } = useUser(); // <-- Get token

    // --- Data Fetching (READ) ---
    useEffect(() => {
        axios.get(API_BASE_URL)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data from live API:", error);
                // Critical: If API fails, show an error message
                setLoading(false); 
            });
    }, []);

    // --- Handle Like Functionality ---
    const handleLike = async (projectId) => {
        if (!isLoggedIn) {
            alert("Please log in to like a project.");
            return;
        }

        try {
            // Send PATCH request with token to the new route
            const res = await axios.patch(`${API_BASE_URL}/${projectId}/like`, {}, {
                headers: { 'x-auth-token': token }
            });

            // Update the state locally to reflect the new like count immediately
            setProjects(projects.map(p => 
                p._id === projectId ? { ...p, likes: res.data.likes } : p
            ));

        } catch (error) {
            console.error("Error liking project:", error);
            alert("Could not process like. Server error or invalid token.");
        }
    };

    if (loading) return <div className="text-center p-16 text-2xl font-semibold text-indigo-500">📡 Loading Projects...</div>;
    if (projects.length === 0) return <div className="text-center p-16 text-xl text-gray-500">No projects submitted yet. Be the first!</div>;

    return (
        <div className="container mx-auto p-8 bg-gray-50">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-2 border-indigo-200 pb-3">Innovations Gallery</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <div key={project._id} className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-600 transform hover:scale-[1.02] transition duration-300">
                        {/* ... existing card content ... */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
                        <p className="text-sm font-semibold mb-3 text-green-600">
                            Category: {project.category}
                        </p>
                        <p className="text-gray-700 mt-2 h-20 overflow-hidden">{project.description}</p>

                        <div className="mt-5 pt-3 border-t flex justify-between items-center">
                            {/* NEW LIKES SECTION */}
                            <div className="text-lg font-bold text-gray-800 flex items-center">
                                ❤️ {project.likes}
                            </div>
                            <button
                                onClick={() => handleLike(project._id)}
                                disabled={!isLoggedIn} // Disable button if not logged in
                                className={`px-3 py-1 text-sm rounded-full transition ${isLoggedIn ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                {isLoggedIn ? 'Like' : 'Login to Like'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectGallery;