import React from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../project-logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-12">
            <div className="container mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="inline-block hover:scale-105 transition duration-300">
                            <img src={projectLogo} alt="SwadeshiHub Logo" className="h-28 w-auto bg-white rounded-full p-2 shadow-lg" />
                        </Link>
                        <p className="mt-6 text-gray-400 max-w-sm text-base leading-relaxed">
                            Empowering India's innovators to build the future. A central registry for Robotics, Drones, and cutting-edge technology projects.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-indigo-400 tracking-wide">Platform</h3>
                        <ul className="space-y-4">
                            <li><Link to="/projects" className="text-gray-400 hover:text-white transition duration-200">Full Gallery</Link></li>
                            <li><Link to="/robotics" className="text-gray-400 hover:text-white transition duration-200">Robotics Wing</Link></li>
                            <li><Link to="/drones" className="text-gray-400 hover:text-white transition duration-200">Drone Hangar</Link></li>
                            <li><Link to="/submit" className="text-gray-400 hover:text-white transition duration-200">Submit Idea</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-green-400 tracking-wide">Support</h3>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-200">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">Contact</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white transition duration-200">Login / Register</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Swadeshi Innovation Hub. Built for Atmanirbhar Bharat.
                    </p>
                    <div className="flex space-x-6 mt-6 md:mt-0">
                        <a href="https://www.lpu.in" className="hover:text-white transition duration-200 flex items-center gap-2">
                            <span>🥜</span> Made By LPU Students
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
