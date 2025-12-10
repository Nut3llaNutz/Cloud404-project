import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const HomePage = () => {
    const [stats, setStats] = useState({ total: 0, robotics: 0, drones: 0, innovators: 0 });
    const [featuredProjects, setFeaturedProjects] = useState([]); // [NEW] State for featured projects
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isLoggedIn } = useUser();
    const navigate = useNavigate();

    const handleSubmitProject = () => {
        if (!isLoggedIn) {
            alert("To submit a project, please join our community of innovators! Login or Sign up to proceed.");
            navigate('/login');
        } else {
            navigate('/submit');
        }
    };

    // Auto-play Carousel
    useEffect(() => {
        if (featuredProjects.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featuredProjects.length, currentIndex]); // [CHANGED] Added currentIndex to reset timer on interaction

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
    };

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
                    <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Swadeshi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Innovation</span> Hub
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        A national platform showcasing the brilliance of Indian engineering in <span className="text-white font-bold">Robotics</span>, <span className="text-white font-bold">Drones</span>, and beyond.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button onClick={handleSubmitProject} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-indigo-500/50 transition transform hover:-translate-y-1">
                            Submit Your Project
                        </button>
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


            {/* [NEW] FEATURED HIGHLIGHTS CAROUSEL */}
            {
                featuredProjects.length > 0 && (
                    <div className="py-16 bg-white border-t border-gray-100">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12">
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Editor's Choice</span>
                                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Featured Highlights</h2>
                            </div>

                            <div className="relative max-w-5xl mx-auto group"> {/* added group for hover effect on controls */}
                                {/* Main Carousel Container */}
                                <div className="overflow-hidden rounded-2xl shadow-2xl bg-white relative min-h-[500px] md:h-[450px]">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out h-full"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {featuredProjects.map((project) => (
                                            <div key={project._id} className="w-full flex-shrink-0 flex flex-col md:flex-row h-full">
                                                {/* Image Side */}
                                                <div className="w-full md:w-1/2 relative h-64 md:h-full">
                                                    <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply"></div>
                                                    <img
                                                        src={project.projectImages[0] || 'https://via.placeholder.com/800x600'}
                                                        alt={project.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-4 left-4 inline-block px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-black/50 backdrop-blur-md rounded-full">
                                                        {project.category}
                                                    </div>
                                                </div>

                                                {/* Content Side */}
                                                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left bg-white">
                                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h3>
                                                    <p className="text-gray-600 mb-8 text-lg leading-relaxed line-clamp-4">
                                                        {project.description}
                                                    </p>
                                                    <div className="mt-auto">
                                                        <Link
                                                            to={project.category === 'Robotics' ? `/robotics/${project._id}` : project.category === 'Drones' ? `/drones/${project._id}` : `/projects/${project._id}`}
                                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                                                        >
                                                            View Full Details <span className="ml-2" aria-hidden="true">&rarr;</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Arrows - Enhanced Styles */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white text-gray-800 hover:text-indigo-600 p-3 rounded-full backdrop-blur-md border border-white/50 shadow-lg transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 z-10"
                                    aria-label="Previous slide"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white text-gray-800 hover:text-indigo-600 p-3 rounded-full backdrop-blur-md border border-white/50 shadow-lg transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 z-10"
                                    aria-label="Next slide"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                                </button>

                                {/* Dots Indicator */}
                                <div className="flex justify-center mt-6 space-x-2">
                                    {featuredProjects.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-indigo-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default HomePage;