import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const HomePage = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        // Fetch Featured Projects
        axios.get(`${API_BASE_URL}?featured=true`)
            .then(res => setFeaturedProjects(res.data))
            .catch(err => console.error("Error fetching featured:", err));
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="bg-indigo-700 text-white text-center py-24 px-6 relative overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-6 animate-fade-in-down">
                        Student Innovation
                        <span className="block text-indigo-200 text-3xl mt-4">Swadeshi for Atmanirbhar Bharat</span>
                    </h1>
                    <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
                        Empowering the next generation of creators in Robotics and Drones.
                        Showcasing indigenous solutions for a self-reliant India.
                    </p>
                    <div className="space-x-4">
                        <Link to="/projects" className="bg-white text-indigo-700 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition shadow-lg">
                            Explore Gallery
                        </Link>
                        <Link to="/submit" className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-indigo-700 transition">
                            Submit Idea
                        </Link>
                    </div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
            </header>

            {/* Featured Section */}
            {featuredProjects.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Innovations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {featuredProjects.map(project => (
                                <div key={project._id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                                    {project.projectImages && project.projectImages[0] ? (
                                        <img src={project.projectImages[0]} alt={project.name} className="w-full h-48 object-cover" />
                                    ) : (
                                        <div className="w-full h-48 bg-indigo-100 flex items-center justify-center text-indigo-400">No Image</div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold">{project.category}</span>
                                            <span className="text-gray-500 text-sm">❤️ {project.likes}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-900">{project.name}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                                        <p className="text-sm font-semibold text-indigo-600">By: {project.owner?.username || 'Unknown'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Mission / About Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
                    <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
                        "Swadeshi for Atmanirbhar Bharat" is more than just a slogan; it's a movement.
                        Our platform provides university students a stage to display their cutting-edge projects
                        in Robotics and Drones. By fostering local innovation, we aim to contribute to a
                        technologically advanced and self-reliant nation.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-indigo-200 py-10 mt-10">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Swadeshi Innovation. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;