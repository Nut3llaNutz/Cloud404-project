import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const HomePage = () => {
    const [stats, setStats] = useState({ total: 0, robotics: 0, drones: 0, innovators: 0 });
    const [featuredProjects, setFeaturedProjects] = useState([]); // [NEW] State for featured projects

    useEffect(() => {
        // Fetch Featured Projects
        axios.get(`${API_BASE_URL}/projects?featured=true`)
            .then(res => setFeaturedProjects(res.data))
            .catch(err => console.error("Error fetching featured:", err));

        axios.get(`${API_BASE_URL}/stats`)
            .then(res => setStats(res.data))
            .catch(err => console.error("Error fetching stats:", err));
    }, []);

    return (
        <div className="bg-white">
            {/* HERO SECTION - Full Screen Fit */}
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="mb-6 inline-block animate-bounce">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                            🚀 The Future is Here
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        Swadeshi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Innovation</span> Hub
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        A national platform showcasing the brilliance of Indian engineering in <span className="text-white font-bold">Robotics</span>, <span className="text-white font-bold">Drones</span>, and beyond.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/submit" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition transform hover:-translate-y-1">
                            Submit Your Project
                        </Link>
                        <Link to="/projects" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg transition">
                            Explore Gallery
                        </Link>
                    </div>

                    {/* LIVE STATS */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-8">
                        <div>
                            <div className="text-4xl font-bold text-orange-400">{stats.robotics}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Robots</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-sky-400">{stats.drones}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Drones</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-400">{stats.total}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Total Projects</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-400">{stats.innovators}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Innovators</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTORS SECTION */}
            <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Innovation Sectors</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover projects categorized by their impact on India's growth and self-reliance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Robotics Card */}
                        <Link to="/robotics" className="group relative overflow-hidden rounded-2xl shadow-xl h-80 bg-black">
                            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Robotics" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-700 opacity-60 group-hover:opacity-40" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <h3 className="text-3xl font-bold text-white mb-2">Robotics</h3>
                                <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">Automating the future with intelligent machines.</p>
                            </div>
                        </Link>

                        {/* Drones Card */}
                        <Link to="/drones" className="group relative overflow-hidden rounded-2xl shadow-xl h-80 bg-black">
                            <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Drones" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-700 opacity-60 group-hover:opacity-40" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <h3 className="text-3xl font-bold text-white mb-2">Drones</h3>
                                <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">Taking innovation to new heights.</p>
                            </div>
                        </Link>

                        {/* General Projects Card */}
                        <Link to="/projects" className="group relative overflow-hidden rounded-2xl shadow-xl h-80 bg-black">
                            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Tech" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-700 opacity-60 group-hover:opacity-40" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <h3 className="text-3xl font-bold text-white mb-2">All Projects</h3>
                                <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-4 group-hover:translate-y-0">From Agriculture to Healthcare.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


            {/* [NEW] FEATURED HIGHLIGHTS SECTION */}
            {
                featuredProjects.length > 0 && (
                    <div className="py-16 bg-white border-t border-gray-100">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12">
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Editor's Choice</span>
                                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Featured Highlights</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                {featuredProjects.slice(0, 2).map((project, index) => (
                                    <div key={project._id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                                        <div className="w-full md:w-1/2">
                                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                                <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition duration-500"></div>
                                                <img
                                                    src={project.projectImages[0] || 'https://via.placeholder.com/800x600'}
                                                    alt={project.name}
                                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 text-left">
                                            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-500 uppercase bg-indigo-50 rounded-full">
                                                {project.category}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.name}</h3>
                                            <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                                            <Link to={`/projects`} className="text-indigo-600 font-bold hover:text-indigo-800 transition flex items-center gap-2">
                                                View Details <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default HomePage;